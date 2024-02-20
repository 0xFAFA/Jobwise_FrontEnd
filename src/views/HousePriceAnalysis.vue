<template>
    <div class="bone" >

        <el-radio-group v-model="current_type" class="house_price_type" >
            <el-radio label="top4city" size="large">排名前四城市</el-radio>
            <el-radio label="othercity" size="large">其他城市</el-radio>
        </el-radio-group>

        <div class="echarts-box"  id="echarts-main">
        </div>

        <div class="tips_icon">i</div>
        <div class="tips">
            {{ tips_content   }}
        </div>
        

    </div>
</template>

<script setup>
    import * as echarts from 'echarts';
    import { onMounted,onUnmounted,ref, watch,onBeforeUnmount } from 'vue';
    import { MyDataStore } from '@/stores';


    const myDataStore = MyDataStore();
    const current_type=ref('top4city')
    const tips_content=ref('')

    
    let myChart=null
    
    onMounted(
        async ()=>{

            //创建echarts
            let chartDom = document.getElementById('echarts-main')
            myChart = echarts.init(chartDom)

            myChart.showLoading();

            // 获取数据
            await myDataStore.getHousePriceAnalysis()

            myChart.hideLoading();


            const predict_range_len= myDataStore.HousePriceAnalysisData['predict_range_len']
            const time_label= myDataStore.HousePriceAnalysisData['time_label']
            const pre_st_label=time_label[time_label.length-predict_range_len]
            const pre_ed_label=time_label[time_label.length-1]

            const real_st_label=time_label[0]
            const real_ed_label=time_label[time_label.length-predict_range_len-1]

            tips_content.value=`平均房价是以周为时间单位，真实数据区间为${real_st_label}至${real_ed_label}且预测区间是使用Transformer模型进行时序数据预测，预测时间区间为${pre_st_label}至${pre_ed_label}`
            
            const house_price_pre_data= myDataStore.HousePriceAnalysisData['house_price_pre_data']
            
            const data_len=house_price_pre_data['北京'].length

            const temp_sort_data=[]
            for(let key in house_price_pre_data){
                const temp_item_data=[]
                temp_item_data.push(key)
                temp_item_data.push(
                    (house_price_pre_data[key].reduce((acc, curr) => acc + curr, 0))/data_len
                    )

                temp_sort_data.push(temp_item_data)
            }

            temp_sort_data.sort((a,b)=>{
                return b[1]-a[1]
            })
            console.log(temp_sort_data)

            
            const line_raw_data={
                'top4city':{},
                'othercity':{}
            }
            for(let key=0 ;key<temp_sort_data.length;key++){
                const city_name_temp=temp_sort_data[key][0]
                if(key<4){
                    line_raw_data['top4city'][city_name_temp]=house_price_pre_data[city_name_temp]
                }else{
                    line_raw_data['othercity'][city_name_temp]=house_price_pre_data[city_name_temp]
                }
                
            }

            const line_show_data=[]
            for(let key in line_raw_data[current_type.value]){
                
                const series_item={
                            name: key,
                            type: 'line',
                            z:1,
                            areaStyle: {
                                
                            },
                            lineStyle: {
                                width: 1
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            
                            data: line_raw_data[current_type.value][key],

                            markArea: {
                                silent: true,
                                itemStyle: {
                                    opacity: 0.1,
                                    color:'#bbbbbb',
                                },
                                data: [
                                    [
                                        {
                                            xAxis: pre_st_label,
                                            name: '预测区间',
                                            label: {
                                                position: 'top',
                                                fontSize: 15,
                                                fontWeight: 'bold',
                                                
                                            }
                                        },
                                        {
                                            xAxis: pre_ed_label,
                                            
                                        }
                                    ]
                                ]
                            },
                        }
                line_show_data.push(series_item)

            }





            const option = {
                    title: {
                        text: '城市近两年每周平均房价',
                        left: 'center'
                    },
                    grid: {
                        top: 100,
                    },
                    toolbox: {
                        feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                        },
                        top:20,
                        right:80
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                        type: 'cross',
                        animation: false,
                        label: {
                            backgroundColor: '#505765'
                        }
                        }
                    },
                    legend: {
                        top: 50,
                        left: 'center',
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            start: 30,
                            end: 100
                        },
                        {
                            type: 'inside',
                        }
                    ],
                    xAxis: [
                        {
                        type: 'category',
                        boundaryGap: false,
                        axisLine: { onZero: false },
                        data: time_label
                        }
                    ],
                    yAxis: [
                        {
                        name: 'price(元/m²)',
                        type: 'value',
                        min:'dataMin',
                        max:'dataMax',
                        
                        },
                        
                    ],
                    series: line_show_data,
                    markArea:{
                        z:10,
                    }

                    
                    };
            
            myChart.setOption(option)



            watch(
                current_type,(newVal)=>{
                    


                    myChart.dispose(); //防止出现工具箱点击refresh刷新时，图表刷新了(初始化为最开始图表)，但current_type未切换，即要先取消原本的echarts挂载，让当前图表不受之前图表影响
                    myChart = echarts.init(chartDom)


                    const line_show_data=[]
                    const select_temp={}
                    let temp_count=1
                    for(let key in line_raw_data[current_type.value]){
                        if( temp_count<=5){
                            select_temp[key]=true
                        }
                        else{
                            select_temp[key]=false
                        }
                        temp_count+=1
                        
                        const series_item={
                                    name: key,
                                    type: 'line',
                                    z:1,
                                    
                                    lineStyle: {
                                        width: 1
                                    },
                                    emphasis: {
                                        focus: 'series'
                                    },
                                    
                                    data: line_raw_data[current_type.value][key],

                                    markArea: {
                                        silent: true,
                                        itemStyle: {
                                            opacity: 0.1,
                                            color:'#bbbbbb',
                                        },
                                        data: [
                                            [
                                                {
                                                xAxis: pre_st_label,
                                                name: '预测区间',
                                                label: {
                                                    position: 'top',
                                                    fontSize: 15,
                                                    fontWeight: 'bold',
                                                    
                                                }
                                                },
                                                {
                                                xAxis: pre_ed_label
                                                }
                                            ]
                                        ]
                                    },
                                }

                        if (current_type.value=='top4city'){
                            series_item['areaStyle']={}
                        }
                        line_show_data.push(series_item)

                    }





                    const option = {
                            title: {
                                text: '城市近两年每周平均房价',
                                left: 'center'
                            },
                            toolbox:{
                                feature: {
                                dataZoom: {
                                    yAxisIndex: 'none'
                                },
                                restore: {},
                                saveAsImage: {}
                                },
                                top:20,
                                right:80
                            },

                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                type: 'cross',
                                animation: false,
                                label: {
                                    backgroundColor: '#505765'
                                }
                                }
                            },
                            dataZoom: [
                                {
                                    type: 'slider',
                                    show: true,
                                    start: 30,
                                    end: 100
                                },
                                {
                                    type: 'inside',
                                }
                            ],
                            xAxis: [
                                {
                                type: 'category',
                                boundaryGap: false,
                                axisLine: { onZero: false },
                                data: time_label
                                }
                            ],
                            yAxis: [
                                {
                                name: 'price(元/m²)',
                                type: 'value',
                                min:'dataMin',
                                max:'dataMax',
                                
                                },
                                
                            ],
                            series: line_show_data,
                            

                            
                            };
                        if(current_type.value=='top4city'){
                            option['markArea']={
                                z:10,
                            }

                            option['legend']={
                                top: 50,
                                left: 'center',
                            }
                            option['grid']= {
                                top: 100,
                            }
                        }
                        else{
                            option['grid']= {
                                top: 100,
                                left:180,
                            }

                            
                            

                            option['legend']={
                                type: 'scroll',
                                orient: 'vertical',
                                left: 20,
                                top: 50,
                                selected:select_temp,
                                itemGap: 20,
                            }
                        }
                            


                    myChart.setOption(option)
                }
            )


        }
    )


    // 解除挂载时销毁
    onBeforeUnmount(()=>{

    myChart.dispose()
    })



</script>

<style lang="scss" scoped>
    .bone{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: row;
        position: relative;
        padding-top: 10px;
        
        
    }
    .echarts-box {
        width: 900px;
        height: 550px;
        
        position: relative;
        padding-top: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        
    }

    .house_price_type{
        position: absolute;
        left: 5%;
        top: 1%;

        z-index: 2;
    }

    .tips_box{
        width: 100%;
        height: 80px;
        position: relative;
        
    }

    $tips-pos-left: 84%;
    $tips-pos-top: 4%;
    $tips-height: 200px;
    $tips-width: 200px;
    .tips_icon{
        position: absolute;
        top:$tips-pos-top;
        left: $tips-pos-left;
        width: 20px;
        height: 20px;
        
        border-radius: 10px;
        background-color: #5470c6;
        box-shadow:  0px 0px 5px 0px rgba(255, 255, 255, 0.75);

        color: #ffffff;
        font-size: 15px;
        font-weight: 700;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        z-index: 3;
        
    }
    .tips{
        position: absolute;
        top: $tips-pos-top+0.5%;
        left: $tips-pos-left+0.5%;
        width: $tips-width;
        height: 0px;
        padding: 0px 20px 0px 20px;
        
        border-radius: 20px;
        background-color: #5470c6;
        box-shadow:  0px 0px 5px 0px rgba(255, 255, 255, 0.75);

        color: #ffffff;
        font-size: 13px;
        letter-spacing: 1.5px;
        line-height: 20px;
        text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.5);

        display: flex;
        justify-content: start;
        align-items: start;

        transition: all .3s;
        overflow: hidden;
        box-sizing: border-box;

        opacity:0.8;
        z-index:2;
    }
    

    .tips_icon:hover ~ .tips{
        width: $tips-width;
        height: $tips-height;
        padding: 20px 20px 0px 20px;
        opacity: 1;

    }
    
    .tips:hover{
        width: $tips-width;
        height: $tips-height;
        padding: 20px 20px 0px 20px;
        opacity: 1;

    }
</style>
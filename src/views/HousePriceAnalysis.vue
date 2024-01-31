<template>
    <div class="bone" >
        <div class="echarts-box"  id="echarts-main">
        </div>

    </div>
</template>

<script setup>
    import * as echarts from 'echarts';
    import { onMounted,onUnmounted,ref, watch,onBeforeUnmount } from 'vue';
    import { MyDataStore } from '@/stores';


    const myDataStore = MyDataStore();
    const current_type=ref('top4city')
    const current_type_label=ref('排名前四城市')
    
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
                                        xAxis: pre_st_label
                                        },
                                        {
                                        xAxis: pre_ed_label
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
                        top: 120,
                    },
                    toolbox: {
                        feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                        }
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


        }
    )



</script>

<style lang="scss" scoped>
    .bone{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: start;
        position: relative;
        padding-top: 10px;

        
    }
    .echarts-box {
        width: 900px;
        height: 550px;
        
        position: relative;
        
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
</style>
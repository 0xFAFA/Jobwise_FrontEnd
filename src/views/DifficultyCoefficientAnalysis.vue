<template>
    <div class="bone">
        <div class="echarts-box"  id="echarts-main">
            
        </div>

        
        <div class="tips_icon">i</div>
        <div class="tips">
            {{ tips_content  }}
     
        </div>
        
    </div>
    
</template>

<script setup>
    import * as echarts from 'echarts';
    import { onMounted,ref, watch ,onBeforeUnmount} from 'vue';
    import { MyDataStore } from '@/stores';

    const myDataStore = MyDataStore();

    const tips_content=ref('招聘岗位难度系数是由该岗位的：薪资、所需工作经验、所需学历、公司规模、工作性质等属性进行Tosis综合评价得到的。 ')
    let myChart = null
    onMounted(async ()=>{
        //创建echarts
        let chartDom = document.getElementById('echarts-main')
        myChart= echarts.init(chartDom)

        // echarts.registerTransform( ecSimpleTransform.aggregate );
        myChart.showLoading();

        await myDataStore.getDifficultyCoefficientAnalysis() // 获取数据

        myChart.hideLoading();

        const boxplot_data=[]
        const city_name_list=[]
        const scatter_data=[]

        const difficulty_total=myDataStore.DifficultyCoefficientAnalysisData.difficulty
        const mean_difficulty=myDataStore.DifficultyCoefficientAnalysisData.mean_difficulty

        let index=0
        for ( let key in difficulty_total){
            scatter_data.push(mean_difficulty[key])

            boxplot_data.push(difficulty_total[key])
            city_name_list.push(key)

            index++

        }
        // console.log(boxplot_data)
        // console.log(scatter_data)
        

        const option = {

            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'shadow'
                }
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {},
                    dataZoom:{},
                    

                },
                left: '9%',
                top: '2%',
            },
            grid: {
                left: '8%',
                top: '15%',
                right: '12%',
                bottom: '15%'
            },
            legend: {
                top: '7%',
            },
            xAxis: {
                type: 'category',
                data: city_name_list,

                nameLocation: 'middle',
                boundaryGap: true,
                nameGap: 30,
                splitArea: {
                    show: true
                },
                splitLine: {
                    show: true
                }
            },
            yAxis: {
                type: 'value',
                name: '难度系数',
                position: 'right',
                
            },
            dataZoom: [
                
                {
                    type: 'slider',
                    start: 30,
                    end: 70,
                    
                },
                {
                    type: 'inside'
                },

                {
                    type: 'slider',
                    yAxisIndex: 0,
                    left: '0%',
                    
                },
                
            ],
            series: [

            {
                name: '难度系数',
                type: 'boxplot',
                data: boxplot_data,

            },
            {
                type:'scatter',
                name:'平均难度系数',
                data:scatter_data,
                itemStyle: {
                    color: '#82e38b'
                },
                markLine: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ],
                    lineStyle: {
                        
                        type: 'dashed',      
                        width: 3             
                    },
                    
                    
                },
                label: {
                    show: true,   // 是否显示标签
                    position: 'right',    
                    color: 'rgba(113, 118, 127,0.9)',
                },
            }

            ]
        };

        option && myChart.setOption(option);

    })

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
        position: relative;
        
    }
    .echarts-box {
        width: 80%;
        height: 78%;
        position: relative;
        left: 0%;
        
        display: flex;
        justify-content: center;
        align-items: center;
        
    }


    .tips_icon{
        position: absolute;
        top: 7%;
        left: 85%;
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
        z-index: 2;
        
    }
    .tips{
        position: absolute;
        top: 8%;
        left: 85.5%;
        width: 210px;
        height: 0px;
        padding: 0px 20px 0px 25px;
        
        
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
        z-index: 1;
    }
    

    .tips_icon:hover ~ .tips{
        width: 210px;
        height: 150px;
        padding: 20px 20px 0px 25px;
        border-radius: 10px;
        opacity: 1;

    }
    
    .tips:hover{
        width: 210px;
        height: 150px;
        padding: 20px 20px 0px 25px;
        border-radius: 10px;
        opacity: 1;

    }



</style>
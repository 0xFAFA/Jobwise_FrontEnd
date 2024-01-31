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
    
    
    let myChart=null

    onMounted(
        async ()=>{
            //创建echarts
            let chartDom = document.getElementById('echarts-main')
            myChart = echarts.init(chartDom)

            myChart.showLoading();

            await myDataStore.getEmploymentUnemploymentNumAnalysis() // 获取数据

            myChart.hideLoading();

            const bar_raw_data=[]
            const city_name_list=[]
            const bar_show_data=[]
            

            for(let key in myDataStore.EmploymentUnemploymentNumAnalysisData['UnemploymentNumAnalysis']){
                const bar_item_data=[]
                bar_item_data.push(key)
                bar_item_data.push(myDataStore.EmploymentUnemploymentNumAnalysisData['UnemploymentNumAnalysis'][key])

                bar_raw_data.push(bar_item_data)
            }

            bar_raw_data.sort((a,b)=>{
                return b[1]-a[1]
            })

            for(let i=0;i<bar_raw_data.length;i++){
                city_name_list.push(bar_raw_data[i][0])
                bar_show_data.push(bar_raw_data[i][1])
            }


            const option = {
                    xAxis: {
                        type: 'value',
                        splitLine: {
                            
                        },
                        axisLabel: {
                            formatter: function (val) {
                                return val+ 'W';
                            }
                        }
                    },

                    yAxis: {
                        type: 'category',
                        data: city_name_list,
                        inverse: true,
                        
                        
                    },
                    visualMap: {
                        orient: 'horizontal',
                        bottom: 0,
                        left: 'center',
                        min: Math.min(...bar_show_data),
                        max:  Math.max(...bar_show_data),
                        text: ['High', 'Low'],

                        dimension: 0,
                        inRange: {
                        color: ['#0b489e','#1fabf7','#00ffff', '#00ffff',
                        '#7fe79a','#7fe79a',
                        '#FFCE34', '#FFCE34','#FD665F','#FD665F',]
                        }
                    },
                    series: [
                        {
                            name: '城镇登记失业人员数',
                            type: 'bar',
                            data: bar_show_data,
                            label: {
                                show: true,
                                position: 'right',
                                valueAnimation: true,
                                formatter: function (val) {
                                    return val.value + '万人';
                                }
                            },
                            itemStyle:{
                                borderRadius: [0, 10, 10, 0],
                            }
                        }
                    ],
                    toolbox: {
                        feature: {
                            restore: {},
                            saveAsImage: {},
                            dataView: {},

                        },
                        right: '13%',
                        top: '1%',
                    },
                    legend: {
                        show: true
                    },
                    grid: {
                        left: '15%',
                        top: '10%',
                        right: '15%',
                        bottom: '15%'
                    },  
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c}万人'
                    },
                    animationDuration: 1500,
                    animationEasing: 'ease',
                    
                    dataZoom: [

                        {
                            type: 'slider', 
                            start:0,
                            end: 35,
                            left: 20,
                            yAxisIndex: 0,
                        },
                        {
                            type: 'inside',
                            yAxisIndex: 0,
                        }

                    ],
                    };

            option && myChart.setOption(option);
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
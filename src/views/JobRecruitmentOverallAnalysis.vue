
<template>
    <div class="bone">
        <div class="echarts-box"  id="echarts-main">
        </div>

        <div class="right_tab">
            <el-tabs tab-position="right"  v-model="current_type" class="demo-tabs">
                <el-tab-pane label="工作性质" name="attribute">
                    <template #label>
                        <span class="custom-tabs-label">
                        <span>工作性质</span>
                        </span>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="工作所需经验" name="experience">
                    <template #label>
                        <span class="custom-tabs-label">
                        <span>工作所需经验</span>
                        </span>
                    </template>
                    
                </el-tab-pane>
                <el-tab-pane label="公司团队规模" name="nop">
                    <template #label>
                        <span class="custom-tabs-label">
                        <span>公司团队规模</span>
                        </span>
                    </template>
                    
                </el-tab-pane>
                <el-tab-pane label="所需学历" name="qualification">
                    <template #label>
                        <span class="custom-tabs-label">
                        <span>所需学历</span>
                        </span>
                    </template>
                    
                </el-tab-pane>
                
            </el-tabs>
        </div>
        
    </div>
    
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted,ref, watch,onBeforeUnmount } from 'vue';
import { MyDataStore } from '@/stores';


const myDataStore = MyDataStore();


const current_type=ref('experience')

const city_name_list=ref([])
const mean_r_list=ref([])
const one_labels_explanations=ref([])
const one_labels_distribution=ref([])
const one_labels_distribution_fshow=ref([]) //用于展示堆叠数据的数组

let myChart = null
onMounted(async ()=>{
    //创建echarts
    let chartDom = document.getElementById('echarts-main')
    myChart= echarts.init(chartDom)
    myChart.showLoading();

    await myDataStore.getJobRecruitmentOverallAnalysis() // 获取数据
    
    myChart.hideLoading();

    //绑定数据
    city_name_list.value=myDataStore.JobRecruitmentOverallAnalysisData.city_name_list  //Pinia在内部进行了解包操作，所以不需要.value访问其值
    mean_r_list.value=myDataStore.JobRecruitmentOverallAnalysisData.mean_r_list

    one_labels_explanations.value=myDataStore.JobRecruitmentOverallAnalysisData.labels_explanations[current_type.value]
    one_labels_distribution.value=myDataStore.JobRecruitmentOverallAnalysisData.labels_distribution[current_type.value]

    let t_distribution_fshow=[]
    one_labels_distribution.value.forEach((subArray,i) => {
        subArray.forEach( (element,j) => {
            if(i==0){
                t_distribution_fshow.push([])
            }
            t_distribution_fshow[j].push(element)
        });
    })
    one_labels_distribution_fshow.value=t_distribution_fshow

 
    
    


    const option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
            shadowStyle: {
                color: 'rgba(255, 255, 255, 0.5)' 
            }
        }
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
        dataZoom:{}

      },
      right: '8%',
      top: '0%',
    },
    legend: {
        top: '8%',
    },
    grid: {
        left: '7%',
        right: '4%',
        top: '20%',
        bottom: '12%',
        containLabel: true
    },
    xAxis: [
        {
        type: 'category',
        data: city_name_list.value
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '人数/位',
            position: 'left',
            alignTicks: true,
            axisLine: {
                show: true,
                
            },
            axisLabel: {
                formatter: '{value} '
            }
        },
        {
            type: 'value',
            name: '薪资/元',
            position: 'right',
            alignTicks: true,
            axisLine: {
                show: true,
                
            },
            axisLabel: {
                formatter: '{value}'
            }
        },
    ],
    series: 
    one_labels_explanations.value.map((cur_label,index) => ({
        name: cur_label,
        type: 'bar',
        yAxisIndex: 0,
        stack: 'stack1',
        emphasis: {
            focus: 'series'
        },
        data: one_labels_distribution_fshow.value[index],
        label: { show: true }
        })
    ).concat(
        [
            {
                name: '平均薪资',
                type: 'line',
                yAxisIndex: 1,
                lineStyle: {
                    color: 'rgba(20,255,255,1)',      
                    type: 'dashed',      
                    width: 3             
                },
                data: mean_r_list.value,
                label: {
                    show: true,          // 是否显示标签
                    position: 'top',    
                    formatter: '{c}',
                    color: 'rgba(113, 118, 127,0.8)',
                },
                markLine: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                }
            },
            
        ]
    )
    
    ,
    dataZoom: [
        {
            type: 'slider',
            start: 35,
            end: 65
        },
        {
            type: 'inside'
        },
        {
            type: 'slider',
            yAxisIndex: 0,
            left: '1%',
            
        },
    ],
    
    }

    option && myChart.setOption(option)



    watch(
        current_type,
        (newVal,oldVal)=>{
            
            console.log(newVal)


            one_labels_explanations.value=myDataStore.JobRecruitmentOverallAnalysisData.labels_explanations[current_type.value]
            one_labels_distribution.value=myDataStore.JobRecruitmentOverallAnalysisData.labels_distribution[current_type.value]

            let t_distribution_fshow=[]
            one_labels_distribution.value.forEach((subArray,i) => {
                subArray.forEach( (element,j) => {
                    if(i==0){
                        t_distribution_fshow.push([])
                    }
                    t_distribution_fshow[j].push(element)
                });
            })
            one_labels_distribution_fshow.value=t_distribution_fshow

            myChart.dispose(); //注意要先取消原本的echarts挂载，不然会渲染出错（因为每种type的堆叠图的label数量不一样）
            myChart = echarts.init(chartDom)

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(255, 255, 255, 0.5)' 
                        }
                    }
                },
                toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {},
                    dataZoom:{}

                },
                right: '8%',
                top: '0%',
                },
                legend: {
                    top: '8%',
                },
                grid: {
                    left: '7%',
                    right: '4%',
                    top: '20%',
                    bottom: '12%',
                    containLabel: true
                },
                xAxis: [
                    {
                    type: 'category',
                    data: city_name_list.value
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '人数/位',
                        position: 'left',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            
                        },
                        axisLabel: {
                            formatter: '{value} '
                        }
                    },
                    {
                        type: 'value',
                        name: '薪资/元',
                        position: 'right',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                ],
                series: 
                one_labels_explanations.value.map((cur_label,index) => ({
                    name: cur_label,
                    type: 'bar',
                    yAxisIndex: 0,
                    stack: 'stack1',
                    emphasis: {
                        focus: 'series'
                    },
                    data: one_labels_distribution_fshow.value[index],
                    label: { show: true }
                    })
                ).concat(
                    [
                        {
                            name: '平均薪资',
                            type: 'line',
                            yAxisIndex: 1,
                            lineStyle: {
                                color: 'rgba(20,255,255,1)',      
                                type: 'dashed',      
                                width: 3             
                            },
                            data: mean_r_list.value,
                            label: {
                                show: true,          // 是否显示标签
                                position: 'top',    
                                formatter: '{c}',
                                color: 'rgba(113, 118, 127,0.8)',
                            },
                            markLine: {
                                data: [
                                    { type: 'max', name: 'Max' },
                                    { type: 'min', name: 'Min' }
                                ]
                            }
                        },
                        
                    ]
                )
                
                ,
                dataZoom: [
                    {
                        type: 'slider',
                        start: 35,
                        end: 65
                    },
                    {
                        type: 'inside'
                    },
                    {
                        type: 'slider',
                        yAxisIndex: 0,
                        left: '1%',
                        
                    },
                ],
                }

            option && myChart.setOption(option)
        }
    )

} )


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
        
        padding-left: 20px;
        padding-top: 10px;
        
    }
    .echarts-box {
        width: 800px;
        height: 550px;
        
        display: flex;
        justify-content: center;
        align-items: center;
        
        border-right: 1px dashed #adadad;
    }

    .right_tab{
        flex:1;
        height: 500px;

        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .demo-tabs{
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .el-tab-pane{
       display: none;
    }

    .el-tabs{
        --el-tabs-header-height:70px;
        
    }
    
    ::v-deep .el-tabs__nav-wrap::after {
        width: 5px !important;
        background-color: #d9d8d8;
        border-radius: 3px !important;
        
    }
    
    ::v-deep .el-tabs__active-bar {
        width: 5px !important;
        
        
        border-radius: 3px !important;
    }
        
    ::v-deep .el-tabs__item.is-active {
        
        opacity: 1;
        
        background-image: linear-gradient(to right,rgba(255, 255, 255, 0.3) 0%,rgba(255, 255, 255, 0.2) 60% ,rgba(255, 255, 255, 0) 100%  );
        transition: all 0.5s linear;
    }

    .custom-tabs-label{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        font-size: 17px;
        font-weight: 700;

        
        
    }

    

    
</style>


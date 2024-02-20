<template>
    <div class="bone">
        <div class="salary_info_box">
            <div class="tips_box">
                <div class="tips_icon" @mouseenter="prompt_in" @mouseleave="prompt_out">i</div>
                <div class="tips" @mouseenter="prompt_in" @mouseleave="prompt_out">
                    {{ tips_content   }}
                </div>
            </div>
            
            <div class="clusters_center_labels">
                <div class="clusters_label" v-for="(item,index) in pie_show_name" :key="item" :title="item">{{ clusters_center[index] }}</div>
            </div>

        </div>
        <div class="echarts-box"  id="echarts-main">
        </div>
    </div>
</template>

<script setup>
    import * as echarts from 'echarts';
    import { onMounted,onUnmounted,ref, watch,onBeforeUnmount } from 'vue';
    import { MyDataStore } from '@/stores';

    const myDataStore = MyDataStore();
    const pie_show_name=[
            '第一梯队',
            '第二梯队',
            '第三梯队',
            '第四梯队',
            '第五梯队',
        ]
    const tips_content=ref('薪资水平是通过层次聚类得到的，饼图中由内到外分为五个梯队，每个梯队的聚类中心即平均薪资(/元)见左侧标签')
    const clusters_center=ref([])

    const prompt_in=()=>{
        const temp_docs=document.querySelectorAll('.clusters_label')
        for (let i=0;i<temp_docs.length;i++){
            temp_docs[i].classList.add('clusters_label_prompt')
        }
    }
    const prompt_out=()=>{
        const temp_docs=document.querySelectorAll('.clusters_label')
        for (let i=0;i<temp_docs.length;i++){
            temp_docs[i].classList.remove('clusters_label_prompt')
        }
    }

    let myChart=null

    onMounted( async()=>{
        //创建echarts
        let chartDom = document.getElementById('echarts-main')
        myChart = echarts.init(chartDom)

        myChart.showLoading();

        await myDataStore.getSalaryDistributionAnalysis() // 获取数据

        myChart.hideLoading();

        const pie_raw_data=myDataStore.SalaryDistributionAnalysisData
        // console.log(pie_raw_data)

        const pie_show_data=[]
        const pie_show_radius=[
            ['3%', '21%'],
            ['25%','35%'],
            ['42%','60%'],
            ['65%','75%'],
            ['85%','95%'],
            
        ]

        const pie_show_rosetype=[
            'area',
            'radius',
            'area',
            '',
            'area',
        ]
        const pie_show_formatter=[
            '',
            '',
            '',
            '',
            '{b}:{d}%'
        ]
        const pie_show_label_pos=[
            'inside',
            'inside',
            'inside',
            'inside',
            'outside',
        ]
        const pie_show_bdradius=[2,1,3,5,5]
            
        
        

        for(let i = 0; i < pie_raw_data.length; i++) {
            const pie_show_item_data=[]
            const cur_class_data=pie_raw_data[i]['current_clusters_data']

            clusters_center.value.push(pie_raw_data[i]['clusters_center'])

            for (let key in cur_class_data){

                pie_show_item_data.push({value:cur_class_data[key],name:key})
            }

            const temp_series_item={
                    name: pie_show_name[i],
                    type: 'pie',
                    radius: pie_show_radius[i],
                    center: ['42%', '50%'],
                    roseType: pie_show_rosetype[i],
                    itemStyle: {
                        borderRadius: pie_show_bdradius[i],
                    },
                    label:{
                        show:true,
                        position:pie_show_label_pos[i],
                        formatter:pie_show_formatter[i],
                    },
                    data: pie_show_item_data
            }
            pie_show_data.push(temp_series_item)
        }




        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 20,
                top: 10,
                bottom: 20,
                itemGap:20
            },
            
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {},
                    dataView:{}
                    

                },
                left: '0%',
                top: '0%',
            },
            series: pie_show_data
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
        justify-content: flex-start;
        align-items: start;
        position: relative;
        padding-top: 35px;
        
    }
    .echarts-box {
        width: 800px;
        height: 520px;
        
        position: relative;
        
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .salary_info_box{
        width: 120px;
        height: 520px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .tips_box{
        width: 100%;
        height: 80px;
        position: relative;
        
    }

    $tips-pos-left: 30%;
    $tips-pos-top: 5%;
    $tips-height: 150px;
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
        top: $tips-pos-top+3%;
        left: $tips-pos-left+3%;
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


    .clusters_label_prompt{
        animation: breath 2s linear infinite,  move1 .4s linear ;
        
    }

    
    .clusters_center_labels{
        width: 13px;
        height: 350px;
        border: 1px solid transparent;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-left: 40px;
        position: relative;
        z-index: 1;

        
    }

    .clusters_label{
        width: 13px;
        height: 50px;
        background-color: rgb(94, 122, 202);
        text-shadow: 0px 0px 5px rgba(255, 255, 255, 0);
        border-radius: 0px 0px 0 0;
        color: rgb(94, 122, 202);
        transition: all 0.3s linear;
        position: relative;
        margin: 5px 0px 5px 0px;
        
        font-family:'MaoKenShiJinHei-2' ;
        
        letter-spacing: 3px;

        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .clusters_label:first-child{
        border-radius: 10px 10px 0px 0px;
    }

    .clusters_label:last-child{
        border-radius: 0px 0px 10px 10px;
    }
    .clusters_label:hover{
        width: 150px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        color: #fff;
        text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.5);
    }

    
    @keyframes breath{
        0%{
            box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.75);
        }
        50%{
            box-shadow: 0px 0px 10px 3px rgba(255, 255, 255, 1);
            
        }
        100%{
            box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.75);
        }
    }

    @keyframes move1{
        0%{
            margin: 5px 0px 5px 0px;

        }
        40%{
            margin: 2px 0px 2px 0px;

        }
        50%{
            margin: 5px 0px 5px 0px;
        }
        60%{
            margin: 8px 0px 8px 0px;
        }
        100%{
            margin: 5px 0px 5px 0px;

        }
    }
    

</style>
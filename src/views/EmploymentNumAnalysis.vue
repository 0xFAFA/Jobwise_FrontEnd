<template>
    <div class="bone">
        <el-radio-group v-model="map_data_type" class="employment_type" >
            <el-radio label="Units" size="large">城镇单位从业人数</el-radio>
            <el-radio label="Individual" size="large">城镇私营和个体从业人数</el-radio>
        </el-radio-group>

        <div class="echarts-box"  id="echarts-main">
        </div>
    </div>
</template>

<script setup>
    import * as echarts from 'echarts';
    import { onMounted,onUnmounted,ref, watch,onBeforeUnmount } from 'vue';
    import { MyDataStore } from '@/stores';
    import { geoCoordMap } from '@/utils/geoCoord.js'
    
    import  china from '@/assets/map/map/json/china.json'

    const myDataStore = MyDataStore();
    const type2label={
        'Units':'城镇单位从业人数',
        'Individual':'城镇私营和个体从业人数'
    }

    const map_data_type=ref('Units')



    let myChart=null
    onMounted( async()=>{
        echarts.registerMap('china', china); //注册地图数据
        //创建echarts
        let chartDom = document.getElementById('echarts-main')
        myChart = echarts.init(chartDom)

        myChart.showLoading();

        await myDataStore.getEmploymentUnemploymentNumAnalysis() // 获取数据

        myChart.hideLoading();

        // console.log(myDataStore.EmploymentUnemploymentNumAnalysisData)

        const map_raw_data=myDataStore.EmploymentUnemploymentNumAnalysisData['EmploymentNumAnalysis'][map_data_type.value]

        const map_data=[]
        let data_max=-1e9
        let data_min=1e9

        for(let key in map_raw_data){
            if(map_raw_data[key]>data_max){
                data_max=map_raw_data[key]
            }
            if(map_raw_data[key]<data_min){
                data_min=map_raw_data[key]
            }
            const geoCoord=geoCoordMap[key]
            map_data.push({
                name:key,
                value:geoCoord.concat(map_raw_data[key]) 
            })
            
        }
        

        const option={
            tooltip: {
                trigger: 'item',
                
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {},
                }
            },
            visualMap: {
                min: data_min,
                max: data_max,
                text: [type2label[map_data_type.value]],
                realtime: false,
                calculable: true,
                inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
                },
                left: map_data_type.value==='Units'?'3%':'1%',
            },
            geo:{
                map: "china",
                zoom:1.25,
                label:{show:false},

                emphasis: { // 高亮状态下的多边形和标签样式
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
                }
                    
            },
            series:[
       
                {
                    name: type2label[map_data_type.value],
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data:map_data,

                    encode: {
                        value: 2 ,//指用map_data的每个元素中，数组索引为2的元素的值作为真正的value（第0、1索引为城市的经纬度）
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke',
                        scale:5
                    },
                    symbolSize: function (val) {
                        return val[2] / 100 +10;
                    },
                    label: {
                        formatter: '{b}',
                        position: 'center',
                        color: 'rgba(0,0,0,0.8)',
                        show: true
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    },
                    emphasis: {
                        scale: true,
                        itemStyle: {
                            areaColor: '#8DBFEB',
                            shadowBlur: 5,
                            shadowColor: 'rgba(0, 0, 0, 0.2)',
                            borderColor: 'rgba(0, 0, 0, 0.2)',
                        }
                        
                    },
                    zlevel:1,
                    zoom:1.2
                    
                },
                
            ]
        }

        option && myChart.setOption(option);



        watch(map_data_type,(newVal)=>{

            const map_raw_data=myDataStore.EmploymentUnemploymentNumAnalysisData['EmploymentNumAnalysis'][map_data_type.value]

            const map_data=[]
            let data_max=-1e9
            let data_min=1e9

            for(let key in map_raw_data){
                if(map_raw_data[key]>data_max){
                    data_max=map_raw_data[key]
                }
                if(map_raw_data[key]<data_min){
                    data_min=map_raw_data[key]
                }
                const geoCoord=geoCoordMap[key]
                map_data.push({
                    name:key,
                    value:geoCoord.concat(map_raw_data[key]) 
                })
                
            }

            myChart.dispose(); //防止出现工具箱点击refresh刷新时，图表刷新了(初始化为最开始图表)，但employment_type未切换，即要先取消原本的echarts挂载，让当前图表不受之前图表影响
            myChart = echarts.init(chartDom)

            const option={
                tooltip: {
                    trigger: 'item',
                    
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                    dataView: { readOnly: false },
                    restore: {},
                    saveAsImage: {},
                    }
                },
                visualMap: {
                    min: data_min,
                    max: data_max,
                    text: [type2label[map_data_type.value]],
                    realtime: false,
                    calculable: true,
                    inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                    },
                    left: map_data_type.value==='Units'?'3%':'1%',
                },
                geo:{
                    map: "china",
                    zoom:1.25,
                    label:{show:false},

                    emphasis: { // 高亮状态下的多边形和标签样式
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                    }
                        
                },
                series:[

                    {
                        name: type2label[map_data_type.value],
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data:map_data,

                        encode: {
                            value: 2 ,//指用map_data的每个元素中，数组索引为2的元素的值作为真正的value（第0、1索引为城市的经纬度）
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke',
                            scale:5
                        },
                        symbolSize: function (val) {
                            return val[2] / 100 +10;
                        },
                        label: {
                            formatter: '{b}',
                            position: 'center',
                            color: 'rgba(0,0,0,0.8)',
                            show: true
                        },
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        },
                        emphasis: {
                            scale: true,
                            itemStyle: {
                                areaColor: '#8DBFEB',
                                shadowBlur: 5,
                                shadowColor: 'rgba(0, 0, 0, 0.2)',
                                borderColor: 'rgba(0, 0, 0, 0.2)',
                            }
                            
                        },
                        zlevel:1,
                        zoom:1.2
                        
                    },
                    
                ]
            }

            option && myChart.setOption(option);




        })


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
        align-items: start;
        position: relative;
        padding-top: 10px;

        
    }
    .echarts-box {
        width: 100%;
        height: 85%;
        
        position: relative;
        
        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    .employment_type{
        position: absolute;
        left: 5%;
        top: 1%;

        z-index: 1;
    }




</style>
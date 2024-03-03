<template>
    <div class="bone">
        <div class="bone_left_part">
            <div class="city_select_box" title="选择城市">
                <el-select
                    v-model="current_city"
                    class="city_select"
                    placeholder="选择城市"
                    size="large"
                    style="width: 240px"
                >
                    <el-option
                    v-for="item in city_name_list"
                    :key="item"
                    :label="item"  
                    :value="item"
                    />
                </el-select>
            </div>

            <div class="echarts-box"  id="echarts-main"></div>
        </div>

        <div class="bone_right_part">
            <div class="flex_select_box">
                <div ref="selectBoxRef" class="flex_item" v-for="(item,index) in type_list" :key="item.value" @click="handleClick(item.value,$event,index)">{{ item.label }}</div>
                <div class="arrow" title="搜狗输入法☺">☜</div>
            </div>

        </div>
        

    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted,ref, watch,onBeforeUnmount } from 'vue';
import { MyDataStore } from '@/stores';
import 'echarts-wordcloud';

const myDataStore = MyDataStore();

const city_name_list=ref([])
const current_city=ref('深圳')
const current_type=ref('com_name_frequency')
const type_list=ref([
    {
        value: 'com_name_frequency',
        label: '公司名称'
    },
    {
        value: 'com_type_frequency',
        label: '岗位类型'
    },
    {
        value: 'com_feature_frequency',
        label: '岗位特点'
    }
])
const selectBoxRef = ref(null); //用于绑定dom元素
const handleClick = (value,event,index) => {


    // console.log(value)
    // 排他
    const selectBox = selectBoxRef.value;

    for (let i = 0; i < selectBox.length; i++) {
    selectBox[i].classList.remove('flex_item_active');
    }

    const currentElement = event.target;
    currentElement.classList.add('flex_item_active');

    current_type.value=value

    //调整箭头
    const offset = (event.target.offsetHeight+22) * index +50 
    // console.log(offset)
    document.querySelector('.arrow').style.top=`${offset}px`
}
let myChart =null
onMounted(async ()=>{
    //初始化
    const selectBox = selectBoxRef.value;
    selectBox[0].classList.add('flex_item_active'); 
    const offset = 50 ;
    document.querySelector('.arrow').style.top=`${offset}px`

    //创建echarts
    let chartDom = document.getElementById('echarts-main')
    myChart= echarts.init(chartDom)

    myChart.showLoading();

    await myDataStore.getKeywordHeatAnalysis() // 获取数据

    myChart.hideLoading();

    // console.log(myDataStore.KeywordHeatAnalysisData)

    for (let key in myDataStore.KeywordHeatAnalysisData[current_type.value]){
        city_name_list.value.push(key)
    }

    const wordcloud_data=[]
    const temp_raw_data=myDataStore.KeywordHeatAnalysisData[current_type.value][current_city.value]
    // console.log(temp_raw_data)

    for (let key in temp_raw_data){
        wordcloud_data.push({
            name:key,
            value:temp_raw_data[key]
        })
    }


    const option ={
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

                    },
                    right: '15%',
                    top: '2%',
                },
            
                series: [{
                    type: 'wordCloud',

                    shape: 'circle',
                    keepAspect: false,

                    left: 'center',
                    top: '11%',
                    width: '70%',
                    height: '80%',
                    right: null,
                    bottom: null,

                    sizeRange: [17, 37],

                    rotationRange: [-90, 90],
                    rotationStep: 45,

                    gridSize: 8,

                    drawOutOfBound: false,

                    shrinkToFit: false,

                    layoutAnimation: true,


                    textStyle: {
                        fontFamily: 'MaoKenShiJinHei-2',
                        fontWeight: 'normal',
                        // Color can be a callback function or a color string
                        color: function () {
                            // Random color
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        focus: 'self',

                        textStyle: {
                            textShadowBlur: 15,
                            textShadowColor: '#fff'
                        }
                    },
                    data: wordcloud_data
                }]
        }
    option && myChart.setOption(option);



    watch([current_type,current_city,],(newVal,oldVal)=>{
        
        
        const wordcloud_data=[]
        const temp_raw_data=myDataStore.KeywordHeatAnalysisData[newVal[0]][newVal[1]]
        for (let key in temp_raw_data){
            wordcloud_data.push({
                name:key,
                value:temp_raw_data[key]
            })
        }

        myChart.dispose(); //防止出现工具箱点击refresh刷新时，图表刷新了(初始化为最开始图表)，但city_select_box和flex_select_box未切换，即要先取消原本的echarts挂载，让当前图表不受之前图表影响
        myChart = echarts.init(chartDom)

        const option ={
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

                    },
                    right: '15%',
                    top: '2%',
                },
            
                series: [{
                    type: 'wordCloud',

                    shape: 'circle',
                    keepAspect: false,

                    left: 'center',
                    top: '11%',
                    width: '70%',
                    height: '80%',
                    right: null,
                    bottom: null,

                    sizeRange: [17, 37],

                    rotationRange: [-90, 90],
                    rotationStep: 45,

                    gridSize: 8,

                    drawOutOfBound: false,

                    shrinkToFit: false,

                    layoutAnimation: true,


                    textStyle: {
                        fontFamily: 'MaoKenShiJinHei-2',
                        fontWeight: 'normal',
                        // Color can be a callback function or a color string
                        color: function () {
                            // Random color
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        focus: 'self',

                        textStyle: {
                            textShadowBlur: 15,
                            textShadowColor: '#fff'
                        }
                    },
                    data: wordcloud_data
                }]
        }
        option && myChart.setOption(option);


    })
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
        
        padding-left: 20px;
        padding-top: 20px;
        overflow: hidden;

        position: relative;
    }
    .bone_left_part{
        width: 100%;
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        position: relative;
        left: -12%;
        
    }   
    .echarts-box {
        width: 100%;
        height: 100%;
        margin-top: 20px;
        
        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
        top: -4%;
        
        
    }

    .city_select_box{
        width: 200px;
        height: 50px;
        
        position: absolute;
        left: 14%;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        z-index: 1;
    }
    .city_select{
        width: 100%;
        height: 100%;
    }



    .bone_right_part{
        width: 20%;
        height: 500px;
        
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px dashed #f8f7f7;

        position: absolute;
        right: 1%;        
        top: 44%;

        transform: translateY(-50%);

    }

    .flex_select_box{
        width: 80%;
        height: 80%;
        padding: 5px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        
    }
    .arrow{
        position: absolute;
        height: 50px;
        line-height: 50px;
        top: 0px;
        right: -30px;
        font-size: 50px;
        color: #000000;
        transition: all 0.3s linear;

        user-select: none;
    }

    .flex_item{
        width: 100%;
        flex: 2;
        
        margin: 10px;
        padding: 10px;
        border: 1px solid transparent;
        border-radius: 15px;
        color: #ffffff;
        background-color: #d6d6d6;
        box-shadow:  0px 0px 5px 1px rgba(255, 255, 255, 0.75);
        
        font-size: 25px;
        font-weight: 'bold';
        font-family: MaoKenShiJinHei-2;
        
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s linear;
        
        cursor: pointer;
    }


    .flex_item_active{
        box-shadow:  0px 0px 5px 5px rgba(255, 255, 255, 0.75);
        
        border-radius: 20px;
        color: #323131;
        background-color: aqua;
        flex:3;
        

    }

</style>
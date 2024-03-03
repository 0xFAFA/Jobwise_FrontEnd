<script setup>
    import { onMounted, ref } from 'vue'
    import MyTimer from '@/components/MyTimer.vue'
    
    const is_route= ref(true)
    const myelMenu = ref(null)

    const drawer = ref(false)
    const direction = ref('ttb')

    const drawer_list = ref([
        
        { index: '就业区域差异', content: '不同地区的产业、经济、文化等因素影响了就业机会和需求，导致就业区域性差异' },
        { index: '公司裁员', content: '大量公司的采取裁员与减少新员工招聘等措施' },
        { index: '后疫情时代', content: '后疫情时代的经济变革对就业市场产生了巨大影响' },
        { index: '需求与供给不对称', content: '招聘市场需求与供给不对称的情况，就业人数持续上升，岗位热门领域发生转移' },
        { index: '生活成本', content: '生活成本的不断上涨，房价和薪资水平也成为了去某个城市择业的一个重要的考虑因素' },

    ])

    const source_list = ref([
        { index: '拉勾网', content: 'https://www.lagou.com/' },
        { index: '国家统计局', content: 'https://data.stats.gov.cn/index.htm' },
        { index: '房价网', content: 'http://gz.fangjia.com/' },
    ])

    const tool_list= ref([

        { index: '后端开发', content: [ 'Python','Flask uWSGI'  ]},
        { index: '数据库', content: [ 'MongoDB'  ]},
        { index: '前端开发', content: [ 'Vue3 Pinia Vue-router','Element-plus Echarts','Vite'  ]},
        { index: '数据处理', content: [ 'Selenium','Numpy Panda Sklearn','Pytorch Transformer','讯飞星火大模型'  ]},
        { index: '服务器开发', content: [ 'Nginx','阿里云'  ]},


    ])

    const handleDrawerClick = (e) => {

        const bt_arrow = document.querySelector('.bt_arrow')
        if(drawer.value===true){
            bt_arrow.style.transform = 'rotate(180deg)'
            drawer.value = false
        }
        else{
            bt_arrow.style.transform = 'rotate(0deg)'
            drawer.value = true
        }
        
    }

    onMounted(() => {
        
        myelMenu.value.open('/employment-unemployment-num-analysis')
        myelMenu.value.open('/recruitment-info')
    })

</script>


<template>

    <div class="main_container">
        <el-button type="primary" class="drawer_bt" @click="handleDrawerClick" title="背景介绍">
            <div class="bt_arrow" >&#xea52;</div>
            
        </el-button>



        <el-drawer
            v-model="drawer"
            :direction="direction"
            size="100%"
            :with-header="false"
            :z-index=3
            class="my_drawer"
        >
            <div class="drawer_content">

                <el-carousel :interval="5000" type="card" height="230px" title="选题背景" class="content_main">
                    <el-carousel-item v-for="item in drawer_list" :key="item" class="item_main">
                        <h3 text="2xl" justify="center">{{ item.index }}</h3>

                        <div class="section">{{ item.content }}</div>
                    </el-carousel-item>
                </el-carousel>
                

                <el-carousel :interval="10000" height="250px" class="content_footer">

                    <el-carousel-item class="item_footer">
                        <div class="source_card">
                            <div class="source_title">数据来源：</div>

                            <div class="source_content">
                                <div class="source_item" v-for="item in source_list" :key="item">
                                    <div class="item_title">{{ item.index }}</div>

                                    <a class="item_content" :href="item.content" target="_blank">{{ item.content }}</a>


                                </div>
                            </div>
                        </div>
                    </el-carousel-item>

                    <el-carousel-item class="item_footer">
                        <div class="tool_card">
                            <div class="tool_title">技术栈：</div>

                            <div class="tool_content">

                                <div class="tool_item"  v-for="item in tool_list" :key="item">
                                    <div class="item_title">{{ item.index }}</div>

                                    <div class="item_content" >
                                        <div class="item_content_row" v-for="row in item.content" :key="row">{{ row }}</div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </el-carousel-item>


                </el-carousel>

            </div>

        </el-drawer>

        <div class="main_part">
            <div class="left_part">
                <div class="brand">
                    <div class="my-title" title="择业数据可视化分析系统">择业通航</div>
                </div>

                <div class="menu">
                    
                    <el-menu
                        :default-active="$route.path"
                        class="el-menu-demo"
                        mode="vertical"
                        :router="is_route"
                        background-color="rgba(50, 50, 50, 0)"
                        text-color="#fff"
                        active-text-color="#29b8db"
                        ref="myelMenu"
                        >
                        
                        <el-sub-menu index="/recruitment-info">
                            <template #title>招聘岗位信息分析</template>

                            <el-menu-item index="/recruitment-info/job-recruitment-overall-analysis">整体情况分析</el-menu-item>

                            <el-menu-item index="/recruitment-info/difficulty-coefficient-analysis">难度系数分析</el-menu-item>

                            <el-menu-item index="/recruitment-info/keyword-heat-analysis">关键词热度分析</el-menu-item>

                            <el-menu-item index="/recruitment-info/salary-distribution-analysis">薪资水平分布分析</el-menu-item>
                        
                        </el-sub-menu>

                        

                        <el-sub-menu index="/employment-unemployment-num-analysis">
                            <template #title>城市就业与失业人数分析</template>
                            <el-menu-item index="/employment-unemployment-num-analysis/employment-num-analysis">就业人数分析</el-menu-item>
                            <el-menu-item index="/employment-unemployment-num-analysis/unemployment-num-analysis">失业人数分析</el-menu-item>
                        
                        </el-sub-menu>

                        
                        <el-menu-item index="/house-price-analysis" >城市房价分析</el-menu-item>

                        <el-menu-item index="/llm-assistant" class="last-menu-item">大模型助手 </el-menu-item>
                    </el-menu>


                    <div class="illustration1" title="我只是插图"></div>
                </div>

                


            </div>


            <div class="right_part">
                <div class="top-slogan">
                    <div class="my-timer">
                        <MyTimer></MyTimer>
                    </div>
                </div>

                <div class="main-chart">
                    <div class="my-card">
                        <RouterView></RouterView>
                        
                    </div>
                </div>
            </div>

        </div>  
        
    </div>

</template>







<style lang="scss" scoped>
    .main_container {
        width:88.8%;
        height: 100%;
        position: relative;
        
        /* background-color: rgba(0, 0, 0, 0.5); */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    ::v-deep .el-drawer__body{
        border: 1px solid #000;
        border-radius: 10px;
        padding: 0;
        background-color: rgb(232, 232, 232) ;
    }

    .drawer_content{
        width: 100%;
        height: 100%;
        
        background-image: url('@/assets/sky.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;

        .el-carousel.content_main{
            width: 85%;
            height: 35%;

            margin-top: 60px;
            margin-bottom: 25px;
        }
        .el-carousel__item.item_main{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            border-radius: 15px;
            background-color: #99a9bf;

            h3 {
                color: #475669;
                opacity: 0.75;
                line-height: 50px;
                margin: 0;
                text-align: center;
                font-size: 37px;
                margin-top: 30px;
                margin-bottom: 10px;
                letter-spacing: 5px;

                font-family: MaoKenShiJinHei-2;
                font-weight: 300;
            }

            .section{
                width: 400px;
                height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 17px;
                letter-spacing: 1px;
                line-height: 23px;
                text-align: center;
                color: #ffffff;
                text-shadow: 0px 0px 5px rgba(68, 69, 69, 0.5);
            }
        }


        .el-carousel.content_footer{
            width: 85%;
            height: 45%;

            margin-top: 50px;
        }
        .el-carousel__item.item_footer{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            backdrop-filter: blur(5px);
            border-radius: 20px;

            .source_card{

                display: flex;
                justify-content: center;
                align-items: flex-start;

                .source_title{
                    color: #232323;
                    font-size:24px;

                    width: 150px;
                    margin-left: -60px;

                    font-family: MaoKenShiJinHei-2;
                }

                .source_content{
                    width: 700px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;

                    border: 2px solid #000;
                    border-radius: 15px;
                    margin-left: 10px;
                    background-color: rgba(255, 255, 255, 0.1);

                    padding: 20px;

                    .source_item{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;

                        padding: 10px;
                        margin-left: -10px;

                        .item_title{
                            font-size: 17px;
                            letter-spacing: 1px;
                            font-weight: 600;
                        }

                        .item_content{
                            color: #000;
                            text-decoration: none;
                            padding-left: 60px;

                            transition: all 0.3s linear;
                        }
                        .item_content:hover{
                            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
                        }
                    }
                }
            }


            .tool_card{
                display: flex;
                justify-content: center;
                align-items: flex-start;

                .tool_title{
                    color: #232323;
                    font-size:24px;

                    width: 120px;
                    margin-left: -20px;

                    font-family: MaoKenShiJinHei-2;
                }
                .tool_content{
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .tool_item{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        flex-direction: column;

                        height: 180px;
                        padding: 10px 20px;
                        margin: 10px 20px;
                        border-radius: 10px;

                        border: 2px solid #000;
                        background-color: rgba(255, 255, 255, 0.1);


                        .item_title{
                            font-size: 17px;
                            font-weight: 600;

                            display: flex;
                            justify-content: center;
                            align-items: center;

                            
                        }

                        .item_content{
                            flex:1;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-direction: column;

                            .item_content_row{
                                font-size: 15px;
                                margin: 5px 0px;
                                
                            }
                        }
                    }


                }


            }

        }



    }






    .drawer_bt{
        position: absolute;
        width: 45px;
        height: 25px;
        top: -16px;
        left: center;
        z-index: 4;
        background-color: rgb(243, 251, 251);
        border: 1px solid #000;

        font-family: 'icomoon';
        font-size: 20px;
        line-height: 20px;
        color: #000;
        transition: all 0.3s linear;
        animation: breath 5s linear infinite , shake 5s linear infinite 0.5s;
        

        .bt_arrow{
            transition: all 0.3s linear;
            transform: rotate(180deg);
        }
        
    }
    .drawer_bt:hover{
        top: 0px;        
    }
    @keyframes breath{
        0%{
            box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.4);
        }
        50%{
            box-shadow: 0px 0px 20px 1px rgba(255, 255, 255, 0.9);
            
        }
        100%{
            box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.4);
        }
    }
    @keyframes shake{
        0%{
            transform: rotate(0deg);
        }
        5%{
            transform: rotate(8deg);
            
        }
        10%{
            transform: rotate(-8deg);
            
        }
        15%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(0deg);
        }
    }



    .main_part {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .left_part {
        position: relative;
        z-index: 1;

        width: 17%;
        

        height: 100%;

        
        background-color: rgba(10, 10, 10, 0);

        display: flex;
        flex-direction: column;
        justify-content: flex-start;


    }
    .brand {
        width: 350%;
        height: 60px;
        background: linear-gradient(90deg, rgba(20, 20, 20, 0.7) 0% , rgba(20, 20, 20, 0.7) 2%, rgba(255, 255, 255, 0) 100%);
        border-bottom: 2px solid rgba(255, 255, 255, 0.5);

        display: flex;
        justify-content: flex-start;
        align-items: center;
        

        .my-title {
            width: 52%;
            height: 100%;
            padding-left: 40px;

            font-family:MaoKenShiJinHei-2 ;
            font-size: 32px;
            font-weight: 500;
            letter-spacing:38px;
            text-shadow: rgba(0, 255, 255, 0.7) 1px 1px 3px ;
            color: #fff;

            display: flex;
            justify-content: flex-start;
            align-items: center;

            user-select: none;

            backdrop-filter: blur(8px);

        }
    }
    .menu {
        width: 100%;
        height: 100%;
        flex: 1;
        background-color:  rgba(20, 20, 20, 0.6);
        
        backdrop-filter: blur(8px);
        user-select: none;
    }

    .el-menu-demo{
        border-bottom: 2px solid rgba(255, 255, 255, 0.5);
        box-shadow: 2px 0px 5px 1px rgba(255, 255, 255, 0.5);
        border-radius: 0px 0px 8px 8px;
    }

    .el-menu-item{
        transition: all 0.3s linear;
        border-left: 1px solid transparent;
        letter-spacing: 1px;
    }
    .last-menu-item{
        border-radius: 0px 0px 8px 8px;
        text-shadow: 0px 0px 6px rgba(255, 0, 0, 0.4);
        color: #faf4f4;
        font-family: 'icomoon';
    }

    .el-menu-item.is-active{
        color: aqua;
        border-left: 5px solid #ff5a3b;
        background-color:  rgba(30, 30, 30, 0.5);
        text-shadow: 0px 0px 5px rgba(0, 255, 255, 0.5);
        letter-spacing: 1.5px;
        
    }

    //子菜单高亮，所有父菜单也高亮
    // ::v-deep .el-sub-menu.is-active > .el-sub-menu__title{
        
    // }


    .illustration1 {
        width: 100%;
        height: 120px;

        background-image: url('@/assets/Flat_illustration2.png') ;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;

    }




    .right_part {
        flex: 1;
        height: 100%;
        backdrop-filter: blur(8px);
        background-color: rgba(255, 255, 255, 0);

        display: flex;
        flex-direction: column;
        justify-content: flex-start;

    }
    .top-slogan {
        width: 100%;
        height: 60px;
        background: linear-gradient(190deg,  rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 18%, rgba(255, 255, 255, 0) 100%);        border-bottom: 2px solid rgba(255, 255, 255, 0.5);

        
        
        display: flex;
        justify-content: flex-end;
        
    }
    .my-timer {
        width: 200px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        margin-right: 10px;

    }

    .main-chart {
        flex: 1;
        width: 100%;
        
        padding: 15px 20px 0px 20px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0.3) 35%, rgba(17, 166, 247, 1) 80%, rgba(17, 166, 247, 1) 100%);
        
    }
    .my-card{
        //从上到下线性渐变色背景
        background: linear-gradient(180deg, rgba(255, 255, 255,0.90) 0%, rgba(17, 166, 247, 0.4) 90%, rgba(17, 166, 247, 1) 95%, rgba(17, 166, 247, 1) 100%);
        backdrop-filter: blur(2px);
        width: 100%;
        height: 100%;
        padding: 10px 10px 10px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        
        border-radius: 10px 10px 0px 0px;
        box-shadow: 0px -6px 10px 1px rgba(0, 0, 0, 0.1);

    }


    



</style>
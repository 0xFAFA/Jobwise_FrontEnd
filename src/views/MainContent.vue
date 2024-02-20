<script setup>
    import { onMounted, ref } from 'vue'
    import MyTimer from '@/components/MyTimer.vue'
    
    const is_route= ref(true)
    const myelMenu = ref(null)

    onMounted(() => {
        
        myelMenu.value.open('/employment-unemployment-num-analysis')
        myelMenu.value.open('/recruitment-info')
    })

</script>


<template>

    <div class="main_container">

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

                        <el-menu-item index="/llm-assistant" class="last-menu-item">大模型助手</el-menu-item>
                    </el-menu>


                    <div class="illustration1"></div>
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

        width: 20%;
        max-width: 220px;

        height: 100%;

        
        background-color: rgba(10, 10, 10, 0);

        display: flex;
        flex-direction: column;
        justify-content: flex-start;


    }
    .brand {
        width: 350%;
        height: 70px;
        background: linear-gradient(90deg, rgba(20, 20, 20, 0.7) 0% , rgba(20, 20, 20, 0.7) 2%, rgba(255, 255, 255, 0) 100%);
        border-bottom: 2px solid rgba(255, 255, 255, 0.5);

        display: flex;
        justify-content: flex-start;
        align-items: center;
        

        .my-title {
            width: 45%;
            height: 100%;
            padding-left: 20px;

            font-family:MaoKenShiJinHei-2 ;
            font-size: 35px;
            font-weight: 500;
            letter-spacing:38px;
            text-shadow: rgba(0, 255, 255, 0.7) 1px 1px 3px ;
            color: #fff;

            display: flex;
            justify-content: center;
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
        height: 70px;
        background: linear-gradient(190deg,  rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 18%, rgba(255, 255, 255, 0) 100%);        border-bottom: 2px solid rgba(255, 255, 255, 0.5);

        
        
        display: flex;
        justify-content: flex-end;
        
    }
    .my-timer {
        width: 180px;
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
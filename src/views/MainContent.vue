<script setup>
    import { onMounted, ref } from 'vue'


    
    const is_route= ref(true)
    const myelMenu = ref(null)

    onMounted(() => {
        
        myelMenu.value.open('/employment-unemployment-num-analysis')
        myelMenu.value.open('/recruitment-info')
    })

</script>


<template>
    <div class="main_part">
        <div class="left_part">
            <div class="brand"></div>

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

                    
                    <el-menu-item index="/house-price-analysis" class="last-menu-item">城市房价分析</el-menu-item>

                    
                </el-menu>


                <div class="illustration1"></div>
            </div>

            


        </div>


        <div class="right_part">
            <div class="top-slogan"></div>

            <div class="main-chart">
                <div class="my-card">
                    <RouterView></RouterView>
                    
                </div>
            </div>
        </div>

    </div>
</template>







<style lang="scss" scoped>
    .main_part {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .left_part {
        width: 20%;
        max-width: 220px;

        height: 100%;

        backdrop-filter: blur(10px);
        background-color: rgba(10, 10, 10, 0);

        display: flex;
        flex-direction: column;
        justify-content: flex-start;


    }
    .brand {
        width: 100%;
        height: 80px;
        background-color:  rgba(50, 50, 50, 0.5);
        border-bottom: 2px solid rgba(255, 255, 255, 0.5);

    }
    .menu {
        width: 100%;
        height: 100%;
        flex: 1;
        background-color:  rgba(20, 20, 20, 0.5);
        
        
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
        height: 130px;

        background-image: url('@/assets/Flat_illustration2.png') ;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;

    }




    .right_part {
        flex: 1;
        height: 100%;
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.4);

        display: flex;
        flex-direction: column;
        justify-content: flex-start;

    }
    .top-slogan {
        width: 100%;
        height: 80px;
        background-color:  rgba(255, 255, 255, 0);
        border-bottom: 1px solid rgba(50, 50, 50, 0.5);
    }

    .main-chart {
        flex: 1;
        width: 100%;
        
        padding: 15px 20px 0px 20px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0) 65%, rgba(17, 166, 247, 1) 88%, rgba(17, 166, 247, 1) 100%);
        
    }
    .my-card{
        //从上到下线性渐变色背景
        background: linear-gradient(180deg, rgba(255, 255, 255,0.90) 0%, rgba(17, 166, 247, 0.4) 90%, rgba(17, 166, 247, 1) 95%, rgba(17, 166, 247, 1) 100%);
        
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
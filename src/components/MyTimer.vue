<template>
    <div class="timer" title="2024">
        <div class="top_box">
            <span class="hour up ">1</span>
            <span class="point up">:</span>
            <span class="minute up">2</span>
            <span class="point up">:</span>
            <span class="second up">3</span>       
        </div>

        <div class="bottom_box">
            <div class="left_box">
                <span class="month down">1</span>
                <span class="point down">/</span>
                <span class="day down">2</span>
            </div>
  
            <div class="right_box">
                <span class="week down">3</span>            
            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(()=>{
    let hour = document.querySelector('.hour'); 
    let minute = document.querySelector('.minute'); 
    let second = document.querySelector('.second'); 
    let month = document.querySelector('.month'); 
    let day = document.querySelector('.day'); 
    let week = document.querySelector('.week'); 
    
    count(); // 先调用一次这个函数，防止第一次刷新页面时有间断 
    
    setInterval(count, 1000)

    function count() {
        let nowTime = new Date();
        
        hour.innerHTML =nowTime.getHours()<10?'0'+nowTime.getHours():nowTime.getHours()
        
        minute.innerHTML = nowTime.getMinutes()<10?'0'+nowTime.getMinutes():nowTime.getMinutes();
        
        second.innerHTML = nowTime.getSeconds()<10?'0'+nowTime.getSeconds():nowTime.getSeconds();

        let m=nowTime.getMonth()+1
        month.innerHTML =m<10?'0'+m:m
        
        day.innerHTML = nowTime.getDate()<10?'0'+nowTime.getDate():nowTime.getDate();
        let week_name=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        week.innerHTML = week_name[nowTime.getDay()];
        
    }
})
    

</script>


<style lang="scss" scoped>
    .timer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-left: 8px;

        width: 100%;
        height: 100%;

        font-family: 'Sketch 3D';

        border-left: 1px dashed #ffffff;
        
    }
    .bottom_box{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .right_box{
        margin-left: 20px;
    }
    
    .timer span {
        display: inline-block;
                
        color: rgba(0, 0, 0, 1);
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        font-weight: 400;
        margin: 1px 2px;


        user-select: none;
        /* 防止文本被选中 */
        
    }
    .up {
        font-size: 24px;
    }
    .down {
        font-size: 20px;
    }



</style>
<script setup>
  import MyWave from './components/MyWave.vue';
</script>

<template>
    
  <div class="main">
    <RouterView></RouterView>
    

    <MyWave></MyWave>

    <div class="easter_egg1" title="!!!"></div>
    <div class="easter_egg2" title="vivo50"></div>

  </div>
</template>

<style scoped>

  .main {
    width: 100vw;
    min-width: 1350px;
    height: 100vh;
    min-height: 695px;
    position: relative;

    background-image: url('@/assets/main.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    justify-content: center;

    overflow: hidden;
    
    
  }


  .easter_egg1{
    width: 100px;
    height: 80px;
    background-image: url('@/assets/foot.png');
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    right: -97px;
    top: 50%;

    transition: all 0.3s linear;
  }

  .easter_egg1:hover{
    right: 0px;
  }

  
  .easter_egg2{
    width: 80px;
    height: 100px;
    background-image: url('@/assets/thursday.png');
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    left: -76.5px;
    top: 80%;

    transition: all 0.3s linear;
  }

  .easter_egg2:hover{
    left: 0px;
  }


</style>

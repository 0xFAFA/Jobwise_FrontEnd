<script setup>
  import MyWave from './components/MyWave.vue';
</script>

<template>
    
  <div class="main">
    <RouterView></RouterView>
    

    <MyWave></MyWave>

  </div>
</template>

<style scoped>

  .main {
    width: 100vw;
    min-width: 1430px;
    height: 100vh;
    min-height: 750px;
    position: relative;

    background-image: url('@/assets/main.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    justify-content: center;

    overflow: hidden;
    
    
  }




  

</style>

<template>
    <div class="wave">
      <div class="sailboat" title="定"></div>

      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto" 
      >
        <defs >
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax" >
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(11, 72, 158,1)"
            
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(255, 255, 255,1)"
            
          />

          <use
            xlink:href="#gentle-wave"
            x="48"
            y="10"
            fill="rgba(64, 124, 205,1)"
          />
          </g>
      </svg>
      
    </div>
</template>

<script setup>
  import { onMounted } from 'vue';

  onMounted(
    ()=>{
      
    }
  )
</script>

<style lang="scss" scoped>


  .wave {
    width: 100%;
    height: 12vh;
    min-height: 50px;
    background-color: rgba(255, 255, 255, 0);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
        
  }
  .sailboat {
    width: 170px;
    height: 170px;
    background-image: url('@/assets/sailboat.png');
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: -105%;
    left: 92%;
    z-index: 1;
    

    animation: move-boat 7s linear infinite ;
  }
  .sailboat:hover{
    animation-play-state: paused;
  }

  @keyframes move-boat {
    0% {
      transform: translate3d(0px, 0px, 0) rotate(-10deg);
      left: 92%;
    }

    13% {
      transform: translate3d(0px, -10px, 0) rotate(-15deg);
      left: 91%;
    }
    25% {
      transform: translate3d(0px, -15px, 0) rotate(-10deg);
      left: 90%;
    }
    40% {
      transform: translate3d(0px, -10px, 0) rotate(0deg);
      left: 89%;
    }
    50% {
      transform: translate3d(0px, 0px, 0) rotate(10deg);
      left: 89%;
    }
  
    
    60% {
      transform: translate3d(0px, 10px, 0) rotate(18deg);
      left: 90%;
    }
    75% {
      transform: translate3d(0px, 18px, 0) rotate(10deg);
      left: 91%;
    }
    88% {
      transform: translate3d(0px, 10px, 0) rotate(0deg);
      left: 92%;
    }

    100% {
      transform: translate3d(0px, 0px, 0) rotate(-10deg);
      left: 92%;
    }

  }




  .waves {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 3;

  }
  .parallax > use {
    animation: move-forever 25s linear infinite;
  }
  .parallax > use:hover{
    animation-play-state: paused;
  }
  .parallax > use:nth-child(3) {
    animation-delay: -15s;
    animation-duration: 20s;
    
  }
  .parallax > use:nth-child(2) {
    animation-delay: 0s;
    animation-duration: 8s;
  }
  .parallax > use:nth-child(1) {
    animation-delay: -15s;
    animation-duration: 30s;
  }

  @keyframes move-forever {
    0% {
      transform: translate3d(-90px, 0px, 0);
    }
    100% {
      transform: translate3d(85px, 0px, 0);
    }
  }


</style>
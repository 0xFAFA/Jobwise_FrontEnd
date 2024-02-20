<template>
    <div class="wave">
      <div class="sailboat"></div>

      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
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
    z-index: 2;
        
  }
  .sailboat {
    width: 180px;
    height: 180px;
    background-image: url('@/assets/sailboat.png');
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: -105%;
    left: 88%;
    z-index: 1;
    

    animation: move-boat 3.5s linear infinite ;
  }
  @keyframes move-boat {
    0% {
      transform: translate3d(0px, 0px, 0) rotate(-10deg);
    }

    13% {
      transform: translate3d(0px, -10px, 0) rotate(-15deg);
    }
    25% {
      transform: translate3d(0px, -20px, 0) rotate(-10deg);
    }
    40% {
      transform: translate3d(0px, -10px, 0) rotate(0deg);
    }
    50% {
      transform: translate3d(0px, 0px, 0) rotate(10deg);
    }
  
    
    60% {
      transform: translate3d(0px, 10px, 0) rotate(21deg);
    }
    75% {
      transform: translate3d(0px, 20px, 0) rotate(10deg);
    }
    88% {
      transform: translate3d(0px, 10px, 0) rotate(0deg);
    }

    100% {
      transform: translate3d(0px, 0px, 0) rotate(-10deg);
    }

  }




  .waves {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;

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
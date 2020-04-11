<template>
<div class="flex-box">
  <div class="flex-item">1</div>
  <div class="flex-item">2</div>
  <div class="flex-item">3</div>
  <div class="flex-item">4</div>
  <div class="flex-item">5</div>
  <div class="flex-item">6</div>
</div>
</template>

<script>
import { eventBus } from '@/main.js';

export default {

}
</script>

<style scoped>
  .flex-box {
    padding: 30px;
    height: 100px;
    display: flex;
    align-content: space-around;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: baseline;
  }

  .flex-item {
    border: 3px solid black;
    margin: 3px;
    padding: 20px;
    
  }

</style>
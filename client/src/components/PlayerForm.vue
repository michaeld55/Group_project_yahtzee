<template lang="html">
  <div id="form-container">
    <form v-on:submit.prevent="handleSubmitName">
      <label for="player-name">Your Name: </label>
      <input type="text" id="playerName" playerName="playerName" v-model="playerName" required/>
      <button>Start the Game!</button>
    </form>

  </div>
</template>

<script>
import { eventBus } from '@/main.js';

export default {
  data(){
    return {
      playerName: null
    }
  },

  methods: {
    handleSubmitName: function () {
      eventBus.$emit('game-start', this.playerName);
    }
  }
}
</script>

<style scoped>
  #form-container {
    border: 3px solid black;


    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
  }
</style>
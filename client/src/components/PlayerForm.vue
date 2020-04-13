<template lang="html">
  <div>
    <form v-on:submit.prevent>
      <label for="player-name">Your Name: </label>
      <input v-model="playerName" type="text">
      <button v-on:click="handleSubmitName">Start the Game!</button>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      playerName: ""
    }
  },

  methods: {
    handleSubmitName: function () {
      eventBus.$emit('game-start', playerName);
    }
  }
}
</script>

<style>

</style>
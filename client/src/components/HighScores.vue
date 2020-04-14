<template lang="html">
<div class="container">
  <details>
    <summary>HIGHSCORES</summary>
    <ul v-for="playerAndScore in highScoreData">
      <li>{{ playerAndScore.playerName }}: {{ playerAndScore.highScore }}</li>
    </ul>
  </details>
</div>
</template>

<script>
import ScoreService from '../services/ScoreService.js'
export default {
  data(){
    return {
      highScoreData: []
    }
  },

  mounted(){
    this.fetchHighScores();
  },
  methods: {
    fetchHighScores: function () {
      console.log("boop")
      ScoreService.getScores()
      .then(scores => this.highScoreData = scores)
    }
  }
}


</script>

<style scoped>

</style>
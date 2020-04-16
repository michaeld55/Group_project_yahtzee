<template lang="html">
<div id="high-scores-container">
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
    eventBus.$on ("new-high-score", newHighScore=>{
      highScoreData.push(newHighScore)
    })
  },
  methods: {
    fetchHighScores: function () {
      ScoreService.getScores()
      .then(scores => this.highScoreData = scores)
    }
  },
  computed: {
    sortedHighScores() {
      return this.highScoreData.sort( (firstItem, secondItem) => {
        return (firstItem.highScore < secondItem.highScore) ? 1 : -1
      }).slice(0,5)
    }
  }
}

</script>

<style scoped>

  #high-scores-container {

    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 4;
    grid-row-end: 6;
  }

</style>
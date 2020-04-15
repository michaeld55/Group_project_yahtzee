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
    border: 3px solid black;

    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3;
    grid-row-end: 5;
  }

</style>
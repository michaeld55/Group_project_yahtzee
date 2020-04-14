<template lang="html">
<div class="container">
  <details>
    <summary>HIGHSCORES</summary>
    <ul v-for="playerAndScore in sortedHighScores">
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
  },
  computed: {
    sortedHighScores() {
      return this.highScoreData.sort( (firstItem, secondItem) => {
        return (firstItem.highScore < secondItem.highScore) ? 1 : -1
      }).slice(0,5)
    }
  }
}

// list.sort((a, b) => (a.color > b.color) ? 1 : -1)

</script>

<style scoped>

</style>
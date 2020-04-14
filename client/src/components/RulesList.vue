<template lang='html'>
<div v-if="rules.length">  
    <p>In order to calculate the score for:</p>
    <ul v-for="rule in rules">
        <li>{{Object.keys(rule)[0]}}:</li>
        <p>{{Object.values(rule)[0]}}</p>
    </ul>
</div>
</template>

<script>
import {eventBus} from '../main.js'

export default {
    name: 'rules-list',
    data(){
        return{
            rules:[],
            isDisplayed: false
        }
    },
    mounted(){
        eventBus.$on('display-rules', (blankScorecard) => {
            this.displayRules(blankScorecard)
        })
    },
    methods: {
      displayRules(scoreCard){
          if (!this.isDisplayed) {
            Object.keys(scoreCard.upper.scores).forEach((row) => {
                this.rules.push({[row]: scoreCard.upper.scores[row].scoringRule})
            })
            Object.keys(scoreCard.lower.scores).forEach((row) => {
                this.rules.push({[row]: scoreCard.lower.scores[row].scoringRule})
            })
          } else {
            this.rules = []
          }
          this.isDisplayed = !this.isDisplayed
      },
      formatRules(){
          return this.rules
      }
    }

}
</script>

<style scoped>

li {
    font-weight: bold;
}

</style>
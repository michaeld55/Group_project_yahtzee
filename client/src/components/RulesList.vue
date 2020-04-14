<template lang='html'>
<div v-if="rules.length">  
    <p>In order to calculate the score for:</p>
    <ul>
        <li v-for="rule in rules">{{Object.keys(rule)[0]}}: </br> {{Object.values(rule)[0]}}</li>
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

</style>
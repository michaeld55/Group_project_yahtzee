<template lang='html'>
<div v-if="rules.length">  
    <ul>
        <li v-for="rule in rules">{{rule}}</li>
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
                // var ruleObject= {};
                // ruleObject[row]= scoreCard.upper.scores[row].scoringRule
                // console.log(ruleObject)
                this.rules.push(scoreCard.upper.scores[row].scoringRule)
            })
            Object.keys(scoreCard.lower.scores).forEach((row) => {
                this.rules.push(scoreCard.upper.scores[row].scoringRule)
            })
          } else {
            this.rules = []
          }
          this.isDisplayed = !this.isDisplayed
      }
    }

}
</script>

<style scoped>

</style>
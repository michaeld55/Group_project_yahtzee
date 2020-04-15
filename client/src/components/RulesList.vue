<template lang='html'>
<div id="rules-list-container" v-if="rules.length">  
    <table style="width:100%">
        <tr>
            <th>Score</th>
            <th>Score Description</th> 
        </tr>
        <tr v-for="rule in rules">
            <td>{{Object.keys(rule)[0]}}:</td>
            <td>{{Object.values(rule)[0]}}</td>
        </tr>
    </table>
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

#rules-list-container {
    border: 3px solid black;

    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 9;
}

table {
    border: 3px black solid;
    }

td {
    border-bottom: 1px black solid;
    border-left: 1px black solid;
    border-right-color: 1px black solid;
    border-top: 1px black solid;
    }

</style>
<template lang='html'>
<div id="rules-list-container" v-if="rules.length">

    <p>The point of the game is to acquire as many points as possible by rolling five dice. The face values of the rolled dice are combined to make certain kinds of scores, as described in table below.  
        Per one turn, a user may roll the dice at maximum three times. Then they must select a score they want to obtain on the scorecard, which signals the end of the turn. A user can also choose to save some dice and roll others after the first and second roll in order to try achieving certain scores.
        Users can also select a score after the first roll.
        After a score is selected, it cannot be selected again. Once all scores have been selected on the scorecard, the game is over.
    </p>  
    <table style="width:100%">
        <tr>
            <th>Score Name</th>
            <th>Description</th> 
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

    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
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
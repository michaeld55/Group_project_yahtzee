<template lang='html'>
<div v-if="rules.length">  
    <p>The point of the game is to acquire as many points as possible by rolling five dice. The face values of the rolled dice are combined to make certain kinds of scores.  
        Per one turn, a user may roll the dice at maximum three times. Then they must select a score they want to obtain on the scorecard, which signals the end of the turn. A user can also choose to save some dice and roll others after the first and second roll in order to try and achieve certain scores.
        Users can also select a score after the first roll.
        After a score is selected, it cannot be selected again. Once all scores have been selected on the scorecard, the game is over.
    </p>
    <table>
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

p {
    font-family: "Comic Sans MS", "Comic Sans", cursive;
    text-align:center;
    font-size: x-small;
}

div {
    background-color: lightblue;
}

table {
    width: 60%;
    font-family: "Comic Sans MS", "Comic Sans", cursive;
    font-size: x-small;
    }

td {
    border-bottom: 1px black solid;
    border-left: 1px black solid;
    border-right: 1px black solid;
    border-top: 1px black solid;
    }

</style>
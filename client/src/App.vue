<template>
  <div id="app">
    <player-form v-if="!gameRunning"></player-form>
    <p v-if="!gameRunning">{{gameOverTextBox.text}}</p>
    <high-scores></high-scores>
    <div >
      <rolled-dice v-if="gameRunning" :gameRunning="gameRunning"></rolled-dice>
      <saved-dice v-if="gameRunning" :gameRunning="gameRunning"></saved-dice>
    </div>
    <scorecard :gameRunning="gameRunning"></scorecard>
    <button v-on:click="handleClick">{{button.text}}</button>
    <rules-list />
  </div>
</template>

<script>
import { eventBus } from '@/main.js';
import ScoreService from './services/ScoreService.js';
import HighScores from '@/components/HighScores.vue';
import RolledDice from '@/components/RolledDice.vue';
import SavedDice from '@/components/SavedDice.vue';
import Scorecard from '@/components/Scorecard.vue';
import RulesList from '@/components/RulesList.vue';
import PlayerForm from '@/components/PlayerForm.vue';
import BlankScorecard from './models/scorecard.js';

export default {
  name: "app",
  data(){
    return {
      playerName: "",
      button : {
        text: 'Display the rules'
      },
      rulesDisplayed: false,
      gameRunning: false,
      gameOverTextBox: {
        text: ""
      },
      blankScorecard: {}
      }
    },
  mounted(){
      
    eventBus.$on('game-start', playerName => {
      this.blankScorecard = this.newScorecard();
      this.gameRunning = true
      this.playerName = playerName
      this.gameOverTextBox.text= ""
      eventBus.$emit("game-ready", this.blankScorecard)
    })

    eventBus.$on('game-end', finalScore => {
      const nameAndScore = {
        playerName: this.playerName,
        highScore: finalScore

      }
      let newHighScore = []
      ScoreService.postScore(nameAndScore)
      .then(highScoreWithId => newHighScore.push(highScoreWithId))
      eventBus.$emit ("new-high-score", newHighScore)
      this.gameRunning = false
      this.gameOverTextBox.text = "Game has finished"
    })

  },
  components: {
    'high-scores': HighScores,
    'rolled-dice': RolledDice,
    'saved-dice': SavedDice,
    'scorecard': Scorecard,
    'rules-list': RulesList,
    'player-form': PlayerForm
  },
  methods: {
      handleClick(){
            if (!this.rulesDisplayed){
              this.blankScorecard = this.newScorecard();
              this.button.text = "Hide the rules"
              this.rulesDisplayed= !this.rulesDisplayed
            } else {
              this.button.text= "Display the rules"

              this.rulesDisplayed= !this.rulesDisplayed            }
            eventBus.$emit('display-rules', this.blankScorecard)
      },
      newScorecard(){
        return  {upper: {
              scores: {
                  ones:{currentScore: null, potentialScore: null, scoringRule: "Add the value of all dice with a face value of one."}, 
                  twos:{currentScore: null, potentialScore: null, scoringRule: "Add the value of any dice with a face value of two."}, 
                  threes:{currentScore: null, potentialScore: null, scoringRule: "Add the value of any dice with a face value of three."}, 
                  fours:{currentScore: null, potentialScore: null, scoringRule: "Add the value of any dice with a face value of four."}, 
                  fives:{currentScore: null, potentialScore: null, scoringRule: "Add the value of any dice with a face value of five."}, 
                  sixes:{currentScore: null, potentialScore: null, scoringRule: "Add the value of any dice with a face value of six."},
              },
              validDicePlacement: false,
              subTotal: null, 
              upperBonus: null,
          },
          lower: {
              scores:{
                  threeOfAKind:{currentScore: null, potentialScore: null, scoringRule: "If three or more dice have the same face value, then add up their face values."},
                  fourOfAKind:{currentScore: null, potentialScore: null, scoringRule: "If four or more dice have the same face value, then add up their face values."},
                  fullHouse:{currentScore: null, potentialScore: null, scoringRule: "If three dice have the same face value and two other dice also have a matching face value, then 25 points is yielded. Joker Rule: this only accepts a yatzee if the upper score of the pertaining dice face value is full and you have filled the yatzee box with any value."},
                  smallStraight:{currentScore: null, potentialScore: null, scoringRule: "If your dice have the face values of 1, 2, 3, 4 or 2, 3, 4, 5 or 3, 4, 5, 6, then 30 points is yielded. Joker Rule: this only accepts a yatzee if the upper score of the pertaining dice face value is full and you have filled the yatzee box with any value."},
                  largeStraight:{currentScore: null, potentialScore: null, scoringRule: "If your dice have the face values of 1, 2, 3, 4, 5 or 2, 3, 4, 5, 6, then 40 points is yielded. Joker Rule: this only accepts a yatzee if the upper score of the dice face value is full and you have filled the yatzee box with any value."},
                  chance:{currentScore: null, potentialScore: null, scoringRule: "Add the face values of all dice together and place that score here."},
                  yahtzee:{currentScore: null, potentialScore: null, scoringRule: "If all five dice have the same face value, then 50 points is yielded. Joker Rule: if you roll another yatzee after filling this box with a score of 50 you will gain a bonus 100 points and you can place this score in any available box."}
              },
              validDicePlacement: false,
              totalScore: null
          },
          allowZeroScore: false,
      }
    }
  }
}
</script>

<style scoped>

body, html {
  

}
#app{
  display: grid;
  grid-template-columns: 25% 20% 55%;
  grid-template-rows:  25% 25% 25% 25% 25% 25% 25% 25%;
}
button{
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    height: 40px;
    width: 100px;
}

p {
  font-weight: bold;
  font-size: x-large;
  text-align: center;
}

</style>
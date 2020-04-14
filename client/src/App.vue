<template>
  <div id="app">
    <player-form v-if="!gameRunning"></player-form>
    <p v-if="!gameRunning">{{gameOverTextBox.text}}</p>
    <high-scores></high-scores>
    <div >
      <rolled-dice v-if="gameRunning" :gameRunning="gameRunning"></rolled-dice>
      <saved-dice v-if="gameRunning" :gameRunning="gameRunning"></saved-dice>
    </div>
    <scorecard :blankScorecard="blankScorecard" :gameRunning="gameRunning"></scorecard>
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
      blankScorecard: { 
          upper: {
              scores: {
<<<<<<< HEAD
                  ones:{currentScore: 1, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of One And Place That Score Here"}, 
                  twos:{currentScore: 1, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Two And Place That Score Here"}, 
                  threes:{currentScore: 1, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Three And Place That Score Here"}, 
                  fours:{currentScore: 1, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Four And Place That Score Here"}, 
                  fives:{currentScore: 1, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Five And Place That Score Here"}, 
                  sixes:{currentScore: 1, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Six And Place That Score Here"},
=======
                  ones:{currentScore: null, potentialScore: null, scoringRule: "Add the value of all dice with a face value of one."}, 
                  twos:{currentScore: null, potentialScore: null, scoringRule: "Add the value of any dice with a face value of two."}, 
                  threes:{currentScore: null, potentialScore: null, scoringRule: "Add the value of any dice with a face value of three."}, 
                  fours:{currentScore: null, potentialScore: null, scoringRule: "Add the value of any dice with a face value of four."}, 
                  fives:{currentScore: null, potentialScore: null, scoringRule: "Add the value of any dice with a face value of five."}, 
                  sixes:{currentScore: null, potentialScore: null, scoringRule: "Add the value of any dice with a face value of six."},
>>>>>>> develop
              },
              validDicePlacement: false,
              subTotal: null, 
              upperBonus: null,
          },
          lower: {
              scores:{
<<<<<<< HEAD
                  threeOfAKind:{currentScore: 1, potentialScore: null, scoringRule: "If Three Or More Dice Have The Same Face Value You Can Score Here. Add The Face Values Of All Dice And Place That Score Here"},
                  fourOfAKind:{currentScore: 1, potentialScore: null, scoringRule: "If Four Or More Dice Have The Same Face Value You Can Score Here. Add The Face Values Of All Dice And Place That Score Here"},
                  fullHouse:{currentScore: 1, potentialScore: null, scoringRule: "If Three Dice Have The Same Face Value And Two Other Dice Also Have A Matching Face Value You Can Score Here. This Is Worth 25 Points. Jocker Rule: This Only Accepts A Yatzee If The Upper Score Of The Dice Face Value Is Full And You Have Filled The Yatzee Box With Any Value"},
                  smallStraight:{currentScore: 1, potentialScore: null, scoringRule: "If Your Dice Have The Face Values Of 1, 2, 3, 4 Or 2, 3, 4, 5 Or 3, 4, 5, 6 You Can Score Here. This Is Worth 30 Points. Jocker Rule: This Only Accepts A Yatzee If The Upper Score Of The Dice Face Value Is Full And You Have Filled The Yatzee Box With Any Value" },
                  largeStraight:{currentScore: 1, potentialScore: null, scoringRule: "If Your Dice Have The Face Values Of 1, 2, 3, 4, 5 Or 2, 3, 4, 5, 6 You Can Score Here. This Is Worth 40 Points. Jocker Rule: This Only Accepts A Yatzee If The Upper Score Of The Dice Face Value Is Full And You Have Filled The Yatzee Box With Any Value"},
                  chance:{currentScore: null, potentialScore: null, scoringRule: "Add The Face Values Of All Dice Together And Place That Score Here"},
                  yahtzee:{currentScore: 1, potentialScore: null, scoringRule: "If All Five Dice Have The Same Face Value You Can Score Here. This Is Worth 50 Points. Jocker Rule: If You Roll Another Yatzee After Filling This Box With A Score Of 50 You Will Gain A Bouns 100 Points And You Can Place This These Dice In Any Box"}
=======
                  threeOfAKind:{currentScore: null, potentialScore: null, scoringRule: "If three or more dice have the same face value, then add up their face values."},
                  fourOfAKind:{currentScore: null, potentialScore: null, scoringRule: "If four or more dice have the same face value, then add up their face values."},
                  fullHouse:{currentScore: null, potentialScore: null, scoringRule: "If three dice have the same face value and two other dice also have a matching face value, then 25 points is yielded. Joker Rule: this only accepts a yatzee if the upper score of the pertaining dice face value is full and you have filled the yatzee box with any value."},
                  smallStraight:{currentScore: null, potentialScore: null, scoringRule: "If your dice have the face values of 1, 2, 3, 4 or 2, 3, 4, 5 or 3, 4, 5, 6, then 30 points is yielded. Joker Rule: this only accepts a yatzee if the upper score of the pertaining dice face value is full and you have filled the yatzee box with any value."},
                  largeStraight:{currentScore: null, potentialScore: null, scoringRule: "If your dice have the face values of 1, 2, 3, 4, 5 or 2, 3, 4, 5, 6, then 40 points is yielded. Joker Rule: this only accepts a yatzee if the upper score of the dice face value is full and you have filled the yatzee box with any value."},
                  chance:{currentScore: null, potentialScore: null, scoringRule: "Add the face values of all dice together and place that score here."},
                  yahtzee:{currentScore: null, potentialScore: null, scoringRule: "If all five dice have the same face value, then 50 points is yielded. Joker Rule: if you roll another yatzee after filling this box with a score of 50 you will gain a bonus 100 points and you can place this score in any available box."}
>>>>>>> develop
              },
              validDicePlacement: false,
              totalScore: null
          },
          allowZeroScore: false,
        }
      }
    },
  mounted(){
      
    eventBus.$on('game-start', playerName => {
      this.gameRunning = true
      this.playerName = playerName
      this.gameOverTextBox.text= ""
    })

    eventBus.$on('game-end', finalScore => {
      const nameAndScore = {
        playerName: this.playerName,
        highScore: finalScore

      }
      ScoreService.postScore(nameAndScore)
      this.gameRunning = false
      this.gameOverTextBox.text = "Game has finished"
      this.blankScorecard = this.blankScorecard
      console.log(this.blankScorecard.lower.scores.chance.currentScore)
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
              this.button.text = "Hide the rules"
              this.rulesDisplayed= !this.rulesDisplayed
            } else {
              this.button.text= "Display the rules"
              this.rulesDisplayed= !this.rulesDisplayed
            }
            eventBus.$emit('display-rules', this.blankScorecard)
      }
  }
}
</script>

<style scoped>

p {
  font-weight: bold;
  font-size: x-large;
  text-align: center;
}

</style>
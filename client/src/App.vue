<template>
  <div id="app">
    <player-form v-if="!gameRunning"></player-form>
    <high-scores></high-scores>
    <div >
      <rolled-dice v-if="gameRunning" :gameRunning="gameRunning"></rolled-dice>
      <saved-dice v-if="gameRunning" :gameRunning="gameRunning"></saved-dice>
    </div>
    <scorecard :blankScorecard="blankScorecard" :gameRunning="gameRunning"></scorecard>
    <button v-on:click="handleClick">Display rules of game</button>
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
      gameRunning: false,
      blankScorecard: { 
          upper: {
              scores: {
                  ones:{currentScore: 1, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of One And Place That Score Here"}, 
                  twos:{currentScore: 1, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Two And Place That Score Here"}, 
                  threes:{currentScore: 1, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Three And Place That Score Here"}, 
                  fours:{currentScore: 1, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Four And Place That Score Here"}, 
                  fives:{currentScore: 1, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Five And Place That Score Here"}, 
                  sixes:{currentScore: 1, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Six And Place That Score Here"},
              },
              validDicePlacement: false,
              subTotal: null, 
              upperBonus: null,
          },
          lower: {
              scores:{
                  threeOfAKind:{currentScore: 1, potentialScore: null, scoringRule: "If Three Or More Dice Have The Same Face Value You Can Score Here. Add The Face Values Of All Dice And Place That Score Here"},
                  fourOfAKind:{currentScore: 1, potentialScore: null, scoringRule: "If Four Or More Dice Have The Same Face Value You Can Score Here. Add The Face Values Of All Dice And Place That Score Here"},
                  fullHouse:{currentScore: 1, potentialScore: null, scoringRule: "If Three Dice Have The Same Face Value And Two Other Dice Also Have A Matching Face Value You Can Score Here. This Is Worth 25 Points. Jocker Rule: This Only Accepts A Yatzee If The Upper Score Of The Dice Face Value Is Full And You Have Filled The Yatzee Box With Any Value"},
                  smallStraight:{currentScore: 1, potentialScore: null, scoringRule: "If Your Dice Have The Face Values Of 1, 2, 3, 4 Or 2, 3, 4, 5 Or 3, 4, 5, 6 You Can Score Here. This Is Worth 30 Points. Jocker Rule: This Only Accepts A Yatzee If The Upper Score Of The Dice Face Value Is Full And You Have Filled The Yatzee Box With Any Value" },
                  largeStraight:{currentScore: 1, potentialScore: null, scoringRule: "If Your Dice Have The Face Values Of 1, 2, 3, 4, 5 Or 2, 3, 4, 5, 6 You Can Score Here. This Is Worth 40 Points. Jocker Rule: This Only Accepts A Yatzee If The Upper Score Of The Dice Face Value Is Full And You Have Filled The Yatzee Box With Any Value"},
                  chance:{currentScore: null, potentialScore: null, scoringRule: "Add The Face Values Of All Dice Together And Place That Score Here"},
                  yahtzee:{currentScore: 1, potentialScore: null, scoringRule: "If All Five Dice Have The Same Face Value You Can Score Here. This Is Worth 50 Points. Jocker Rule: If You Roll Another Yatzee After Filling This Box With A Score Of 50 You Will Gain A Bouns 100 Points And You Can Place This These Dice In Any Box"}
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
    })

    eventBus.$on('game-end', finalScore => {
      const nameAndScore = {
        playerName: this.playerName,
        highScore: finalScore
      }
      ScoreService.postScore(nameAndScore)
      this.gameRunning = false
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
            eventBus.$emit('display-rules', this.blankScorecard)
      }
  }
}
</script>

<style scoped>

</style>
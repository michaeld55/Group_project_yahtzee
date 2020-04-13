<template>
<div>

</div>
</template>

<script>
import Scorecard from '../models/scorecard.js';
import {eventBus} from '../main.js'

export default {
    name: 'rules-list',
    data(){
        return {
            scoreCard= null
        }
    },
    mounted(){
      this.getScoreCard(),
      event
    },
    methods: {
      getScoreCard(){
        this.scoreCard= new Scorecard
      },
      displayRules(){
          rules = [];
          for(row in this.scoreCard.upper.scores){
              rules.push(row.scoringRule)
          }
          for(row in this.scoreCard.lower.scores){
              rules.push(row.scoringRule)
          }
          return rules;
      }
    }
    


}
</script>

<style scoped>

</style>
<template lang='html'>
<div v-if="rules">  
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
            rules: [],
            scoreCard: null
        }
    },
    props: ['scoreCard'],
    mounted(){
        eventBus.$on('display-rules', (scoreCard)=>{
            this.scoreCard= scoreCard
            this.displayRules()
        })
    },
    methods: {
      displayRules(){
          for(row in this.scoreCard.upper.scores){
              this.rules.push(row.scoringRule)
          }
          for(row in this.scoreCard.lower.scores){
              this.rules.push(row.scoringRule)
          }
      }
    }

}
</script>

<style scoped>

</style>
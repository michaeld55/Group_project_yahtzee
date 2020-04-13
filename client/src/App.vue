<template>
  <div id="app">
    <high-scores></high-scores>
    <div >
      <rolled-dice></rolled-dice>
      <saved-dice></saved-dice>
    </div>
    <scorecard ></scorecard>
    <rules-list-item />
    <!-- <rules-list /> -->

  </div>
</template>

<script>
import { eventBus } from '@/main.js';
import HighScores from '@/components/HighScores.vue';
import RolledDice from '@/components/RolledDice.vue';
import SavedDice from '@/components/SavedDice.vue';
import Scorecard from '@/components/Scorecard.vue';
import RulesListItem from '@/components/RulesListItem.vue';
import RulesList from '@/components/RulesListItem.vue';

export default {
  name: "app",
  mounted(){


  },
  components: {
    'high-scores': HighScores,
    'rolled-dice': RolledDice,
    'saved-dice': SavedDice,
    'scorecard': Scorecard,
    'rules-list-item': RulesListItem,
    'rules-list': RulesList
  },
  methods: {
    // getDiceNumbers(){
    //   const diceNumbers= DiceRoller.rollDice(),
    // }
  }
}
</script>

<style scoped>

</style>
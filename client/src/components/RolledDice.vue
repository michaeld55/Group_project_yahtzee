<template lang="html">
  <div>
    <p>ROLLED DICE</p>
    <p v-for="(die, index) in diceArray" :die="die" :key="index"> {{ die.diceValue }} </p>
  </div>
</template>
<script>
import { eventBus } from '@/main.js';
import DiceRoller from '@/models/DiceRoller.js';
const diceRoller = new DiceRoller();

export default {
  name:'RolledDice',
  data(){
    return {
      diceArray: [
        {diceValue: 0},
        {diceValue: 0},
        {diceValue: 0},
        {diceValue: 0},
        {diceValue: 0}
      ]
    }
  },
  mounted(){
    this.getDiceNumbers()
  },
  methods: {
    getDiceNumbers(){
      console.log(diceRoller.rollDice(this.diceArray.length))
      return this.diceArray = diceRoller.rollDice(this.diceArray.length);
    }
  }

// option 1
//dice: [1, 2, 3, 3, 6]
// roll 2
// dice: [2, 2]

// dice: [{roll: 1, img: die_one_face.img }]

 //option 2
//dice: [{roll: 1, saved: false}, {roll: 2, saved: false}, ]

//roll 2
// dice: [{roll: 1, saved: true}, {roll: 5, saved: false}, ]


}
</script>


<style scoped>

</style>




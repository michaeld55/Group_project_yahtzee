<template>
  <p>ROLLED DICE</p>
</template>

<script>
import { eventBus } from '@/main.js';

export default {
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
  p {
    border: 1px solid black;
    margin: 0px;
    height: 60%;
  }
</style>





<template lang="html">
  <div class="scorecard-item">
    <tr>
        <td v-if="row">{{ row }}</td>
    </tr>
  </div>



<!-- <div>
    <tr>
    <td> {{ row }}  </td>
    <td v-model="selectedScore" v-on:click="handleSaveScore" v-if="row.potentialScore"> ({{row.potentialScore}})</td>
    <td v-if="row.currentScore">{{row.currentScore}}</td>
    </tr>
</div> -->
</template>

<script>
export default {
    props: ["row", "index"]
}
</script>

<style scoped>

</style>
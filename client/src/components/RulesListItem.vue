<template>
<div>
    <li v-on:click="handleClick"><rules-list /></li>
</div>
</template>

<script>
import RulesList from '../components/RulesList.vue'
import {eventBus} from '../main.js'

export default {
    name: 'rules-list-item',
    components: {
        "rules-list": RulesList
    },
    methods: {
        handleClick(){
            eventBus.$emit('display-rules', null)
        }
    }

}
</script>

<style scoped>

</style>
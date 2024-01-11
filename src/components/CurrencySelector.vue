<!-- My Currency Selector -->
<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
store.dispatch('fetchData')

var gbpRate = ref(null)
var usdRate = ref(null)
var eurRate = ref(null)
var selected = ref('')

watchEffect(() => {
    if (store.state.data) {
        gbpRate.value = store.state.data.gbpRate
        usdRate.value = store.state.data.usdRate
        eurRate.value = store.state.data.eurRate
    }
})

const selectedRate = computed(() => {
    switch (selected.value) {
        case 'GBP':
            return gbpRate.value
        case 'USD':
            return usdRate.value
        case 'EUR':
            return eurRate.value
        default:
            return ''
    }
})
</script>
<template>
    <div class="text-xl m-11 bg-slate-400 text-slate-900 text-center p-6 rounded-sm transition-all">
        <p class="mb-1 rounded-sm">Select A Currency</p>
        <select v-model="selected" class="mb-6">
            <option disabled value="">Please select one</option>
            <option>GBP</option>
            <option>USD</option>
            <option>EUR</option>
        </select>
        <p v-if="selected" class="mb-1">Current Rate:</p>
        <p v-if="selected" class="mb-1">{{ selected }} Rate: {{ selectedRate }}</p>  
    </div>
</template>

<style>
.text-xl {
    transition: all 0.3s ease;
}
</style>
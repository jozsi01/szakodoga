<template>
    <div class="dropdown-container">
        <label for="dropdown" class="label">Select robot strategy</label>
        <select id="dropdown" v-model="selectedStartegy" class="select">
            <option value="Beginner">Beginner</option>
            <option value="Intermidiate">Intermidiate</option>
            <option value="Advanced">Advanced</option>
        </select>
        <p class="selected-item">Selected Item: {{ selectedStartegy }}</p>
        <div class="field">
            <input data-test="robotCheckbox" id="robotEnable" type="checkbox" name="robotEnable" class="switch"
                v-model="gamePlayStore.robotEnabled">
            <label for="robotEnable">Robot</label>
        </div>
    </div>
</template>

<script setup>
import { useGamePlayStore } from 'src/store/gameplayStore';
import { ref, watch } from 'vue';
const gamePlayStore = useGamePlayStore();

const selectedStartegy = ref(null);

watch(selectedStartegy,(newValue) => {
    console.log(newValue)
    if(newValue === "Intermidiate") gamePlayStore.setRobotStartegyToIntermidiate();
    else if(newValue === "Advanced") gamePlayStore.setRobotStartegyToAdvanced();
    else gamePlayStore.setRobotStartegyToBeginner();
})
</script>

<style scoped>
.dropdown-container {
    font-family: Arial, sans-serif;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 250px;
    margin: 0 auto;
    text-align: center;
}

.label {
    font-weight: bold;
}

.select {
    width: 100%;
    padding: 5px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
}
.selected-item {
  margin-top: 10px;
  font-weight: bold;
}
</style>
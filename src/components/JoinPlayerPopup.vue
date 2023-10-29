<script setup>

import { useBoardStore } from 'src/store/boardStore';
import { reactive, onMounted } from 'vue';


const boardStore = useBoardStore();
onMounted(async ()=>{
    await boardStore.getColors();
});

const emit = defineEmits(["joinPlayerPopUpOpen"])
const player = reactive({ name: '', color: '' });

const props = defineProps(["boardId"]);

</script>

<template>
    <div class="popup-container">
        <div class="popup">
            <slot />
            <div class="popupInner">
                <h2>Join Player</h2>
                <div class="field">
                    <label>Name:</label>
                    <div class="control">
                        <input data-test="nameInput" type="text" placeholder="Player name" v-model="player.name">
                    </div>
                </div>
                <div class="field">
                    <label>Color: </label>
                    <div class="control">
                        <div class="select">
                            <select data-test="colorInput" v-model="player.color" placeholder="Player's color">
                                <option v-for="color in boardStore.colors" :key="color">
                                    {{ color }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>


                <button data-test="joinButton" class="button is-success" v-if="player.name.length>0 && player.color.length > 0"
                    @click="boardStore.joinPlayer(boardId, player); emit('joinPlayerPopUpOpen', false)">Join</button>
                <button data-test="joinButton" v-else class="button is-success " title="Disabled button" disabled>Join</button>
                <button class="button is-danger" @click="emit('joinPlayerPopUpOpen', false)">Cancel</button>
            </div>

        </div>
    </div>
</template>

<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.popupInner {
    background: #FFF;
    padding: 32px;
    border-radius: 10px;
}

form {
    display: flex;
    flex-direction: column;
}
</style>
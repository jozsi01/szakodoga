import { useBoardStore } from "src/store/boardStore";
import { useGamePlayStore } from "src/store/gameplayStore";


 function boardStoreFactory(){
    return useBoardStore();
}

 function gamePlayStoreFactory() {
    return useGamePlayStore();
}

export { boardStoreFactory, gamePlayStoreFactory}
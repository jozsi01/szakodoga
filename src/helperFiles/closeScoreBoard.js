import { useBoardStore } from "src/store/boardStore";
import { useGamePlayStore } from "src/store/gameplayStore";

function closeScoreboard(router){
   const gameStore = useGamePlayStore();
   const boardStore = useBoardStore();
   boardStore.eventSource.close();
   boardStore.$reset();
    gameStore.$reset();
    router.push({
        path: '/boardManagement',
    });
    
}

export{closeScoreboard}
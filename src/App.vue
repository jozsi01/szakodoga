<script setup>
import { useBoardStore } from './store/boardStore';
const boardStore = useBoardStore();


</script>

<template>

 <nav class="navbar has-shadow py-2 px-2">

  <div class="content">
    <h2 class="navbar-item"> Menu</h2>
  </div>

  <div class="navbar-menu" id="nav-links">
    <div class="navbar-start">
      <button @click="boardStore.changeRoute($router,'/boardManagement')" class="navbar-item button is-link is-large">Board Management</button>
    </div>
  </div>
    
 </nav>
<div class="content">
  <section>
    <h3>
      Welcome to Who Laughs Last main page
    </h3>
    <p>
      This is the main page of the Who Laughs Last board game. If you want to start a new go to Board Management and create a new board. Have fun!
    </p>
  </section>



  
 
</div>
</template>


<style scoped>
#button{
  text-align: center;
}
section{
  text-align: center;
}

.navbar{
  display: flex;
  align-items: center;
}
</style>
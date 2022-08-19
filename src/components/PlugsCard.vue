<template>


<div class="row d-flex justify-content-center text-center">
  <div class="col-md-10">
    <div v-for="p in plug">
<h3>{{p.title}}</h3>
<img :src="p.banner" alt="">
<p>{{p.linkURL}}</p>
</div>
  </div>
</div>



</template>





<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { plugsService } from "../services/PlugsService";

export default {
setup() {

async function getPlugs(){
  try {
    await plugsService.getPlugs()
  } catch (error) {
    logger.error('[Getting Plugs]',error)
    Pop.toast(error.message, 'error')
  }
}
onMounted(()=> {
  getPlugs()
})



  return {
    plug: computed(()=> AppState.plug)
  };
},
};
</script>





<style>
</style>
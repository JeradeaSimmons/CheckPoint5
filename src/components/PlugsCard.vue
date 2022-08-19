<template>


<div class="row d-flex justify-content-end text-center">
  <div class="col-md-6">
    <div v-for="p in plug">
<h3>{{p.title}}</h3>
<img :src="p.tall" alt="" width="350">
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
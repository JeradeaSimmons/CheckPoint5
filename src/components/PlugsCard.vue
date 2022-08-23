<template>




  <div v-for="p in plug">
    <div class="row d-flex justify-content-end text-center my-5">
      <div class="col-md-5">
        <img class="image-fluid" :src="p.tall" alt="" height="850" width="250">
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
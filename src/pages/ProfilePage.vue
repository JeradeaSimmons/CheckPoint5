<template>

  <div class="card m-5">
    <div class="row d-flex justify-content-around text-center">
      <div class="col-md-5">
        <img :src="profile.picture" alt="" height="55">
      </div>
      <div class="col-md-5">
        <h3>{{profile.name}}</h3>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-10 text-center">
        <p><b>{{ profile.bio }}</b></p>
      </div>
    </div>
  </div>




</template>
<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { profileService } from '../services/ProfileService.js';
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { router } from "../router";

export default {
setup() {
const route = useRoute()





async function getProfileById() {
      try {
        await profileService.getProfileById((route.params.profileId))
      } catch (error) {
        logger.error('[GettingProfile]', error)
        Pop.error(error)
        router.push({ name: 'Home' })
      }
    }

onMounted(()=>{
  getProfileById()

})


  return {
    account: computed(() => AppState.account),
    profile: computed(() => AppState.activeProfile),




  }
}
}
</script>
<style lang="scss" scoped> 


</style>
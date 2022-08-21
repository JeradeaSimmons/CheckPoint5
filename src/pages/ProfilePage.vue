<template>

{{profile}}





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


async function getProfileById(profileId) {
      try {
        await profileService.getProfileById(profileId)
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
profile: computed(()=> AppState.activeProfile),




  };
},
};
</script>
<style> 
</style>
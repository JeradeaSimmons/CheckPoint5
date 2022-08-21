<template>

  <!-- Home page allows to see Posts but no interaction unless signed in! -->
<div class="row text-center d-flex justify-content-center">
  <div class="col-md-8 offset-1"> <PostForm /></div>
 
</div>
  <div class="row d-flex justify-content-evenly text-center my-3">
    <div class="col-md-3 offset-1">
      <button class="btn btn-dark" @click="changePage(newerPage)" :disabled="!newerPage">RECENT
      </button>
    </div>
    <div class="col-md-3">
      <button class="btn btn-dark" @click="changePage(olderPage)" :disabled="!olderPage" >
        OLDER
      </button>
    </div>
  </div>

  <div class="row d-flex justify-content-end text-center">
    <div class="col-md-11">

      <PostCard />
    </div>
  </div>


</template>

<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { postsService } from "../services/PostsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import PostForm from "../components/PostForm.vue"



export default {
    setup() {
        return {
            olderPage: computed(() => AppState.olderPage),
            newerPage: computed(() => AppState.newerPage),
            async changePage(url) {
                try {
                    await postsService.changePage(url);
                }
                catch (error) {
                    logger.error("[change page]", error);
                    Pop.toast(error.message, "error");
                }
            }
        };
    },
    components: { PostForm }
}

</script>

<style scoped lang="scss">

</style>

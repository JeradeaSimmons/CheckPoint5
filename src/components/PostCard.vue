<template>

<div v-for="p in posts.posts">
<div class="card my-5"><img :src="p.imgUrl" alt="" height="400">
<h4><span>{{p.body}}</span> <span class="mdi mdi-heart">{{p.likes.length}}</span></h4></div>

</div>
 



</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  setup(){

onMounted(async ()=> {
  try {
    await postsService.getPosts()
  } catch (error) {
    logger.error('[getting posts]',error)
    Pop.toast(error.message, 'error')
  }
})
  
  
  
  return{
posts: computed(()=> AppState.posts)
  }
  }
}

</script>

<style scoped lang="scss">

</style>

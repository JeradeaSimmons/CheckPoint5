<template>

      <form v-if="user.isAuthenticated" @submit.prevent="handleSubmit">
        <p><b>CREATE POST</b></p>
        <p><input class="form-control" type="text" placeholder="Image Url" v-model= posts.imgUrl /></p>
        <p><input class="form-control" type="text" placeholder="Type Here" v-model= posts.body /></p>
        <button class="btn btn-secondary my-2 p-2 bg-black text-white">{{posts.id ? 'Save' : 'Post' }}</button>
      </form>
  

</template>

<script>

import { computed } from "@vue/reactivity";
import { ref, watchEffect } from "vue";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
 
setup() {
 
 

  
const editable = ref ({})


watchEffect(() => {
      if (!AppState.activePost) { return }


editable.value = { ...AppState.posts }


})


  return {

   user: computed(() => AppState.user),

editable,

    async handleSubmit(){
      try {
        if(editable.value.id){
          await postsService.editPost(editable.value)
          Pop.success('Post Updated')
        }else {
          
             await postsService.createPost(editable.value)
          Pop.success('YAY YOU POSTED!!')
          
         
        }
        editable.value ={}
      } catch (error) {
        logger.error('[Handling Submit]',error)
        Pop.toast(error.message, 'error')
      }
      
    },
    posts: computed(()=> AppState.posts),

  };
},
};
</script>
<style> 
</style>
<template>



  <div v-for="p in posts.posts">

    <div class="card my-5"><img :src="p.imgUrl" alt="" height="500">

      <span>
        <div>
          <router-link :to="{ name: 'Profile', params: { profileId: p.creator.id } }"
            class="btn selectable text-uppercase">
            <img class="rounded-circle" :src="p.creator.picture" alt="" height="50" :title="p.creator.name">
          </router-link>
        </div>
        <p class="my-2">
        <h4>{{ p.body }} </h4>
        </p>
      </span>
      {{ new Date(p.createdAt).toLocaleDateString('de-DE', {
          month: 'short', day:
            'numeric', year: '2-digit', hour: 'numeric', minute: "numeric"
        })
      }}
      <span>{{ p.likes.length }}❤️</span>
      <span v-if="p.creator.id == account.id"><button class=" btn btn-secondary"
          @click="deletePost(p.id)">❌</button></span>


    </div>

  </div>




</template>

<script>

import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import { Post } from "../models/Post";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {

  posts: {
posts: {type: Post, required: true}
  },
  setup(){



const route = useRoute()
    
 

onMounted(async ()=> {
  try {
    await postsService.getPosts()
  } catch (error) {
    logger.error('[getting posts]',error)
    Pop.toast(error.message, 'error')
  }
  
})
  
  
  
  return{
posts: computed(()=> AppState.posts),
profilePosts: computed(()=>AppState.profilePosts),
account: computed(() => AppState.account),





async deletePost(p) {
        try {
          const yes = await Pop.confirm('Delete Your Post?')
          if (!yes) { return }
          await postsService.deletePost(p)
        } catch (error) {
          logger.error('[Deleting POST]', error)
          Pop.error(error)
        }
      }



  }
  }
}

</script>

<style scoped lang="scss">

</style>

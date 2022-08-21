<template>



<div v-for="p in profile" :key="profile.id" >
 <PostCard :posts="p"/>
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
import PostCard from "../components/PostCard.vue";
import { postsService } from "../services/PostsService";
import { Post } from "../models/Post";


export default {
 


 profilePosts: {
posts: {type: Post, required: true}
  },


   setup() {
    const route = useRoute()
 
 
 

      async function getProfileById() {
        try {
          await profileService.getProfileById((route.params.profileId));
        }
        catch (error) {
          logger.error("[GettingProfile]", error);
          Pop.error(error);
          router.push({ name: "Home" });
        }
      }



      onMounted(() => {
        getProfileById()
        getPostsByCreatorId()


        async function getPostsByCreatorId() {
          try {
            await postsService.getPostsByCreatorId(route.params.profileId)
          } catch (error) {
            logger.error(error)
            Pop.toast(error.message, 'error')
          }
        }


         


   
               
        })


        return {
          
            account: computed(() => AppState.account),
            profile: computed(() => AppState.activeProfile),
            posts: computed(()=> AppState.profilePosts),
         
        } 
       
    },
    components: { PostCard }
}
</script>
<style lang="scss" scoped> 



</style>
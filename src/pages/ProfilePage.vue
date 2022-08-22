<template>

<div class="profile-page">

  <div class="card m-5">
    <div class="row">
      <img :src="profile.coverImg" alt="">
    </div>
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
 </div>

 <div class="row d-flex justify-content-between text-center mx-5 my-5">
    <div class="col-md-4">
      <button class="btn btn-dark" @click="changePage(newerPage)" :disabled="!newerPage">RECENT
      </button>
    </div>
    <div class="col-md-4">
      <button class="btn btn-dark" @click="changePage(olderPage)" :disabled="!olderPage">
        OLDER
      </button>
    </div>
  </div>
<div>
 <PostCard v-for="posts in posts" :key="creatorId" :posts="{}" />
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
import { postsService } from "../services/PostsService";
import { Post } from "../models/Post";







export default {
 props:{
posts:{type: Post}
 },
 

setup() {
    const route = useRoute()
 
 onMounted(() => {
       getProfileById()
       getPostsByCreatorId()
       getPostsByPostsId()
       
     })



  return {


  account: computed(() => AppState.account),
  profile: computed(() => AppState.activeProfile),
  posts: computed(() => AppState.profilePosts),
  olderPage: computed(()=> AppState.olderPage),
  newerPage: computed(()=> AppState.newerPage),
   async changePage(url) {
                try {
                    await postsService.changePage(url);
                }
                catch (error) {
                    logger.error("[change page]", error);
                    Pop.toast(error.message, "error");
                }
            }


 }   
     async function getProfileById() {
       try {
         await profileService.getProfileById(route.params.profileId);
       }
       catch (error) {
         logger.error("[GettingProfile]", error);
         Pop.error(error);
         router.push({ name: "Home" });
       }
     }
async function getPostsByCreatorId() {
       try {
         await profileService.getPostsByCreatorId(route.params.profileId)
       } catch (error) {
         logger.error(error)
         Pop.toast(error.message, 'error')
       }
       
     } 
     async function getPostsByPostsId(){
      try {
        await profileService.getPostsByPostsId(route.params.profileId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
     }
     


   },
    
    }
</script>
<style lang="scss" scoped> 



</style>
<template>

<div class="profile-page">

  <div class="card m-5">
    <div class="row">
      <img :src="profile.coverImg" alt="" height="650">
    </div>
    <div class="row d-flex justify-content-evenly text-center">
      <div class="col-md-3">
        <img :src="profile.picture" alt="" height="55">
      </div>
      <div class="col-md-3">
        <h3>{{profile.name}}</h3>
      </div>
      <div class="col-md-3">
        <h3>{{profile.class}}</h3>
      </div>
      <div class="col-md-2">
        <h3 v-if="profile.graduated==true" >🎓</h3>
        </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-10 text-center">
        <p><b>{{ profile.bio }}</b></p>
      </div>
    </div>
    <div class="row d-flex justify-content-evenly text-center mb-3">
     <div class="col-md-3"><a :href="profile.resume"><img src="https://www.bing.com/th?id=OIP.445ESeazr_QFkusNwyy9jAHaIp&w=231&h=270&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="" height="50"></a>  </div>
     <div class="col-md-3"><a :href="profile.github"><img src="https://th.bing.com/th/id/OIP.MjKl469RxHnAC3EbI2nDdwHaHa?w=175&h=180&c=7&r=0&o=5&pid=1.7" alt="" height="50"></a>  </div>
     <div class="col-md-3"><a :href="profile.linkedin"><img src="https://th.bing.com/th/id/OIP.EgSPriuEnAtlIWJV8R_E1QHaGs?w=204&h=184&c=7&r=0&o=5&pid=1.7" alt="" height="50"></a>  </div>
    </div>
  </div>
 </div>

 <div class="row d-flex justify-content-between text-center mx-5 my-5">
    <div class="col-md-4">
      <button class="btn btn-dark" @click="changePage(newerPage)" :disabled="!newerPage">RECENT
      </button>
    </div>
    <div class="col-md-4">
      <button class="btn btn-dark" @click="changePage(olderPage)" >
        OLDER
      </button>
    </div>
  </div>
<div class="text-center">
 <ProfilePostCard  />
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
 
 onMounted(() => {



 })
   
getProfileById()

 getPostsByProfileId() 
  
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
 
  
  


     async function getPostsByProfileId(){
      try {
        await profileService.getPostsByProfileId(route.params.profileId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
     }
  
  
  
  
  
  return {
account: computed(() => AppState.account),
  profile: computed(() => AppState.activeProfile),
  profilePosts: computed(() => AppState.profilePosts),
  olderPage: computed(()=> AppState.olderPage),
  newerPage: computed(()=> AppState.newerPage),
  posts: computed(()=> AppState.posts),


   async changePage(url) {
                try {
                    await profileService.changePage(url);
                }
                catch (error) {
                    logger.error("[change page]", error);
                    Pop.toast(error.message, "error");
                }
            },






 } 

   },
    
    }
</script>
<style lang="scss" scoped> 



</style>
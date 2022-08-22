<template>

<div>
<form @submit.prevent="searchProfile">

<input class="form-control" type="text" required v-model="query"/>
<button class="btn btn-dark" type="submit">SEARCH</button>

</form>



</div>










</template>
<script>
import { ref } from "vue";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";


export default {


setup() {
const query = ref('')


  return {
query,
async searchProfile(){
  try {
    await postsService.getPostsBySearch(query.value)
    query.value = ''
  } catch (error) {
    logger.error(error)
    Pop.toast(error.message, 'error')
  }
}


  };
},
};
</script>
<style> 
</style>
<template>


  <form class="card account-form" @submit.prevent="handleSubmit">
    <div class="card-body text-start">
      <div>
        <label for="name">Name:</label>
        <input type="text" class="form-control" v-model="editable.name" name="name">
      </div>
      <div>
        <label for="picture">Picture:</label>
        <input type="url" class="form-control" v-model="editable.picture" name="picture" placeholder="picture">
      </div>
      <div>
        <label for="coverImg">Cover Image:</label>
        <input type="url" class="form-control" v-model="editable.coverImg"  name="coverImg">
      </div>
      <div>
        <label for="bio">Bio:</label>
        <textarea type="text" class="form-control" v-model="editable.bio" required name="bio" rows="8"
          style="resize:none"></textarea>
      </div>
      <div>
        <label for="github">GitHub:</label>
        <input type="url" class="form-control" v-model="editable.github" name="github">
      </div>
      <div>
        <label for="linkedin">LinkedIn:</label>
        <input type="url" class="form-control" v-model="editable.linkedin"  name="linkedin">
      </div>
      <div>
        <label for="resume">Resume:</label>
        <input type="url" class="form-control" v-model="editable.resume" name="resume">
      </div>
      <div>
        <label for="class">Class:</label>
        <input type="text" class="form-control" v-model="editable.class"  name="class">
      </div>
      <div class="form-group form-check">
                <input type="checkbox" v-model="editable.graduated" id="graduated" class="form-check-input">
                <label class="form-check-label" for="graduated">Graduated?</label>
            </div>
      <div>
        <button type="submit" class="btn btn-secondary w-100 mt-2">Save</button>
      </div>
    </div>
  </form>





</template>



<script>
import { ref, watchEffect } from "vue";
import { AppState } from "../AppState";
import { router } from "../router";
import { accountService } from "../services/AccountService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {

setup() {

  const editable = ref({})

  watchEffect(()=> {
    if (!AppState.account) {return}
    editable.value = {...AppState.account}
  })


  return {
    editable,
    async handleSubmit(){
      try {
        await accountService.editAccount(editable.value)
        router.push ({name: 'Profile', params: {profileId: editable.value.id}})
      } catch (error) {
        logger.error('Submit', error)
        Pop.toast(error.message, 'error')
      }
    }
  };
},
};
</script>



<style> 
</style>
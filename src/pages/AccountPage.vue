<template>
  <div class="text-center">

    <img class="rounded" :src="account.picture" alt="" />
    <h3>{{ account.name }}</h3>
    <p><b>{{ account.bio }}</b></p>
    <p>{{ account.email }}</p>




    <div class="offcanvas offcanvas-bottom show" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasLabel">Edit Account</h5>

      </div>
      <div class="offcanvas-body">
        <div>
          <AccountForm />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>

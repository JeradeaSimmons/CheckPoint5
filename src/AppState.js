import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /**@type {import('./models/Account.js').Account} */
  account: {},

  /**@type {import('./models/Plugs.js').Plugs} */
  plug: {}, 


  /**@type {import('./models/Post.js').Post[]} */
  posts: {},
  newerPage: null,
  olderPage: null,
  activePost: {},
  likes: '',
 profilePosts: {},

   /**@type {import('./models/Profile.js').Profile} */
   activeProfile: null,

   /**@type {import('./models/Post.js').Post[]} */
 
})

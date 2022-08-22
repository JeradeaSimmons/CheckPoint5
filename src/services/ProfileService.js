import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { bcwSandbox } from "./AxiosService.js"




class ProfileService {

async setActiveProfile(profile){
  AppState.activeProfile = profile
}
  async getProfileById(id){
    const res = await bcwSandbox.get(`api/profiles/${id}`)
console.log('[PROFILE ID]', id);

    AppState.activeProfile = new Profile(res.data)
    console.log('Active Profile',AppState.activeProfile);
    
  }



  async getPostsByCreatorId(creatorId) {
    const res = await bcwSandbox.get(`api/posts/`, {
      params: {
        creatorId
      }
    })
    console.log(creatorId);
   AppState.profilePosts = res.data
    console.log('[CREATOR DATA]', res.data);
  }


async getPostsByPostsId(postsId,posts){
  const res = await bcwSandbox.get(`api/profiles/${postsId}`, {
    params: {
      posts
    }
  })
  AppState.profilePosts = res.data
  console.log('[POSTS ID]', res.data);

}
}

export const profileService = new ProfileService()
import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { bcwSandbox } from "./AxiosService.js"




class ProfileService {

async setActiveProfile(profile){
  AppState.activeProfile = profile
}
  async getProfileById(id){
    const res = await bcwSandbox.get(`api/profiles/${id}`)


    AppState.activeProfile = new Profile(res.data)
    console.log('ACTIVE PROFILE',AppState.activeProfile);
    
  }


  async changeProfilePage(creatorId){
    const res = await bcwSandbox.get(`/api/posts/${creatorId}`)
    AppState.profilePosts = res.data.results
    console.log('[ChangingPage]',res.data);
    AppState.profileNewerPage = res.data.newer
    AppState.profileOlderPage = res.data.older

    console.log('[NEWER OLDER]', res.data.newer, res.data.older);
   
  }



async getPostsByProfileId(profileId){
  const res = await bcwSandbox.get(`api/profiles/${profileId}/posts`)
  AppState.profilePosts = res.data
  console.log('[PROFILE POSTS]', res.data);

}
}

export const profileService = new ProfileService()
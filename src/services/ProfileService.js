import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { bcwSandbox } from "./AxiosService.js"




class ProfileService {


  async getProfileById(id){
    const res = await bcwSandbox.get(`api/profiles/${id}`)
    AppState.activeProfile = new Profile(res.data)
    console.log('RES DATA',res.data);
    
  }
}


export const profileService = new ProfileService()
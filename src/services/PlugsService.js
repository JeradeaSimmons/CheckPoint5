import { AppState } from "../AppState"
import { bcwSandbox } from "./AxiosService"




class PlugsService{

  async getPlugs(){
    const res = await bcwSandbox.get('api/ads')
    AppState.plug = res.data
  }


}


export const plugsService = new PlugsService()
import { AppState } from "../AppState"


import { bcwSandbox } from "./AxiosService"



class PostsService{

  async getPosts(){
    const res = await bcwSandbox.get('api/posts')
    AppState.posts = res.data

  }
  
}

export const postsService = new PostsService()
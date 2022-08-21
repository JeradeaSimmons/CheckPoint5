import { AuthPlugin } from "@bcwdev/auth0provider-client"
import { AppState } from "../AppState"
import { Post } from "../models/Post"


import { bcwSandbox } from "./AxiosService"



class PostsService{

  async getPosts(){
    const res = await bcwSandbox.get('api/posts')
    AppState.posts = res.data
    AppState.newerPage = res.data.newer
    AppState.olderPage = res.data.older

  }

async createPost(postData){
  
  const res = await bcwSandbox.post(`/api/posts`, postData)
  console.log('CREATE data', res);
  AppState.posts.unshift = (new Post(res.data))
  console.log('RES DATA',res.data);
}

async editPost(postData){
  const res = await bcwSandbox.put(`api/posts/${postData.id}`, postData)
  const index = AppState.posts.findIndex(p => p.id == postData.id)
  AppState.posts.splice(index, 1, new Post(res.data))
}


async deletePost(post) {
  
  
  await bcwSandbox.delete(`/api/posts/${post}`)
  console.log(_id);
  AppState.posts = AppState.posts.filter(p => p.id != post)

}







  async changePage(url){
    const res = await bcwSandbox.get(url,'api/posts')
    AppState.posts = res.data
    AppState.newerPage = res.data.newer
    AppState.olderPage = res.data.older
   
  }
  
}

export const postsService = new PostsService()

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

  async getPostsByCreatorId(creatorId) {
    const res = await bcwSandbox.get(`api/posts/`, {
      params: {
        creatorId
      }
    })
    AppState.profilePosts = new Post(res.data)
    console.log('[CREATOR DATA]', res.data);
  }

async createPost(postData){
  
  const res = await bcwSandbox.post(`/api/posts`, postData)
  
  AppState.posts = res.data
  
}

async editPost(postData){
  const res = await bcwSandbox.put(`api/posts/${postData.id}`, postData)
  const index = AppState.posts.findIndex(p => p.id == postData.id)
  AppState.posts.splice(index, 1, new Post(res.data))
}


async deletePost(id) {
  
  console.log(id);
  await bcwSandbox.delete(`/api/posts/${id}`)
  
  AppState.posts.posts = AppState.posts.posts.filter(p => p.id != id)

}







  async changePage(url){
    const res = await bcwSandbox.get(url,'api/posts')
    AppState.posts = res.data
    AppState.newerPage = res.data.newer
    AppState.olderPage = res.data.older
   
  }
  
}

export const postsService = new PostsService()
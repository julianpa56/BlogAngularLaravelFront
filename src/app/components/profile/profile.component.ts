import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers : [PostService, UserService]
})
export class ProfileComponent implements OnInit{

  public url
  public posts: Array<Post> = []
  public identity
  public token
  public user : any


  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.url = global.url
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    
  }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile(){
    this._route.params.subscribe(params => {
      let userId = +params['id']
      this.getUser(userId)
      this.getPosts(userId)
      }
    )
  }


  getPosts(userId: any){
    this._userService.getPostsUser(userId).subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts
        }
        else {
          this._router.navigate(['/inicio'])
        }
      },
      error => {
        console.log(error)
        this._router.navigate(['/inicio'])
      }
    )
  }


  getUser(userId: any){
    this._userService.getUser(userId).subscribe(
      response => {
        this.user = response.user
      },
      error => {
        console.log(error)
      }
    )
  }

  deletePost(id:any){
    this._postService.postDelete(this.token,id).subscribe(
      response => {
        this.getProfile()
      },
      error => {
        console.log(error)
      }
    )
  }
}


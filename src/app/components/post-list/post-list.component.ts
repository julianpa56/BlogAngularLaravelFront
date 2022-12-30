import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{

  @Input() posts: any;
  @Input() identity: any;
  @Input() url: any;

  public token: any
  public user : any

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.token = this._userService.getToken()
  }

  ngOnInit(): void {
    
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

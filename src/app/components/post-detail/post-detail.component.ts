import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit{

  public post: any = null
  public identity

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.identity = this._userService.getIdentity()
  }

  ngOnInit(): void {
    this.getPost()
  }

  getPost(){
    this._route.params.subscribe(params => {
      let id = +params['id']
      this._postService.getPost(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.post = response.post
            console.log(this.post)
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
    })
  }

}

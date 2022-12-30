import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';
import { Category } from 'src/app/models/category';
import { global } from 'src/app/services/global';
import { Post } from 'src/app/models/post';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService, UserService, PostService]
})
export class CategoryDetailComponent implements OnInit{

  public category: Category
  public posts: Post[] = []
  public url: string
  public token : any
  public identity : any


  constructor(
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.url = global.url
    this.token = this._userService.getToken()
    this.identity = this._userService.getIdentity()
    this.category = new Category(0,'')
    this.getCategory()
  }
  
  ngOnInit(): void {
    
  }

  getCategory(){
    this._route.params.subscribe(params => {
      let id = params['id']
      this._categoryService.getCategory(id).subscribe(
        response => {
          if (response.status == 'success'){
            this.category = response.category
            this.getPosts(id)
          }
          else {
            console.log(response)
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

  getPosts(id: any){
    this._categoryService.getPostCategory(id).subscribe(
      response => {
        if (response.status == 'success'){
          this.posts = response.posts
          console.log(this.posts)
        }
        else {
          console.log(response)
          this._router.navigate(['/inicio'])
        }
      },
      error => {
        console.log(error)
        this._router.navigate(['/inicio'])
      }
    )
  }

  deletePost(id:any){
    this._postService.postDelete(this.token,id).subscribe(
      response => {
        this.getCategory()
      },
      error => {
        console.log(error)
      }
    )
  }
}

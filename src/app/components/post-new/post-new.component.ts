import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Post } from 'src/app/models/post';
import { AngularFileUploaderConfig } from 'angular-file-uploader/public-api';
import { global } from 'src/app/services/global';
import { PostService } from 'src/app/services/post/post.service';



@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit{

  public identity: any
  public token: any
  public post: Post
  public categories: any
  public statusGeneral = ''
  public statusImage = ''
  public url = ''

  public froala_options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };

  afuConfig : AngularFileUploaderConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif",
    maxSize: 20,
    uploadAPI:  {
      url: global.url+'/post/upload',
      method:"POST",
      headers: {
        "Authorization": this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      attachPinBtn: 'Sube la imagen de tu post'
    }
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ){
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.post = new Post(1,this.identity.sub,1,'','','',null)

  }

  ngOnInit(): void {
    this.getCategories()
    console.log(this.post)
  }

  onSubmit(datos:any){
    this._postService.create(this.token,this.post).subscribe(
      response => {
        if(response.status == 'success'){
          this.post = response.post
          this.statusGeneral = 'success'
          console.log('OK')
          this._router.navigate(['/inicio'])
        }
        else {
          this.statusGeneral = 'success'
        }
      },
      error => {
        this.statusGeneral = 'error'
      }
    )
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.status == 'success'){
          this.categories = response.categories
          console.log(this.categories)
          this.statusGeneral = 'success'
        }
      },
      error => {
        console.log(error)
        this.statusGeneral = 'error'
      }
    )
  }


  imageUpload(datos: any){
    let data = datos.body
    if (data.status == 'success'){
      this.statusImage = 'success'
      this.post.image = data.image
    }
    else{
      this.statusImage = 'error'
    }
  }
}

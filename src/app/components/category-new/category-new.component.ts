import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';




@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit{
  public identity;
  public token;
  public category: Category
  public status= ''


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ){
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.category = new Category(1,'')
  }

  ngOnInit() {
  
  }

  onSubmit(datos:any){
    this._categoryService.create(this.token,this.category).subscribe(
      response => {
        if (response.status == 'success'){
          this.category = response.category
          this.status = 'success'
          console.log('OK')
          this._router.navigate(['/inicio'])
        }
        else{
          this.status = 'error'
        }

      },
      error => {
        this.status = 'error'
        console.log(<any>error)
      }
    )
  }


}


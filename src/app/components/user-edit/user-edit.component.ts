import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFileUploaderConfig } from 'angular-file-uploader/public-api';
import { global } from 'src/app/services/global';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit{
  public user: User
  public status: any
  public identity: any
  public token: any
  public url: any

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
      url: global.url+'/users/upload',
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
      attachPinBtn: 'Sube tu avatar de usuario'
    }
  };

  constructor(
    private _userService: UserService
  ){
    this.user= new User(0,'','','ROLE_USER','','','','');
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.user.id= this.identity.sub
    this.user.name= this.identity.name
    this.user.surname= this.identity.surname
    this.user.email= this.identity.email
    this.user.description= this.identity.description
    this.user.image= this.identity.image
    this.url = global.url
  }

  ngOnInit(): void {
    
  }

  onSubmit(form:any){
    this._userService.update(this.token,this.user).subscribe(
      response => {
        if (response.status == 'success'){
          this.status='success'
          
          if(response.changes.name){
            this.user.name = response.changes.name
          }
          if(response.changes.surname){
            this.user.surname = response.changes.surname
          }
          if(response.changes.email){
            this.user.email = response.changes.email
          }
          if(response.changes.description){
            this.user.description = response.changes.description
          }
          if(response.changes.image){
            this.user.image = response.changes.image
          }

          this.identity= this.user
          localStorage.setItem('identity',JSON.stringify(this.identity))
        }  
        else {
          this.status = 'error'
        }
      },
      error => {
        this.status='error'
        console.log(error)
      }
    )
  }

  avatarUpload(datos: any){
    let data = datos.body
    this.user.image = data.image
  }
}

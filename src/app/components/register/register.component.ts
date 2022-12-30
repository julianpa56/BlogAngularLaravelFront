import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit{
  public user: User;
  public status: string =''
  constructor(
    private _userService: UserService
  ){
    this.user= new User(0,'','','ROLE_USER','','','','');
  }

  ngOnInit(){

    
  }

  onSubmit(form:any){
    this._userService.register(this.user).subscribe(
      response => {
        if (response.status == "success"){
          this.status= response.status
          form.reset()
        }
        else{
          this.status='error'
        }
      },
      error => {
        alert("Error")
        this.status='error'
      }
    )
  }

}

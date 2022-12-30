import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { Router,ActivatedRoute,Params } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit{
  public user: User
  public status: string = ''
  public token: any = ''
  public identity: any = ''

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.user= new User(0,'','','ROLE_USER','','','','');
  }
  ngOnInit(): void {
    //Se ejecuta siempre y cierra sesion si le llega el parametro sure
    this.logout()
  }

  onSubmit(form:any){
    this._userService.signup(this.user,false).subscribe(
      response => { // DEVUELVE TOKEN
        if (response.status != 'error'){
          this.status= 'success'
          this.token = response
          //OBTENER USUARIO
          this._userService.signup(this.user,true).subscribe(
            response => { 
              this.identity = response
              //PERSISTIR DATOS DE USUARIO IDENTIFICADO
              localStorage.setItem('token',this.token)
              localStorage.setItem('identity',JSON.stringify(this.identity))

              this._router.navigate(['inicio'])
            },
            error => {
              this.status='error'
              alert("Error en obtener usuario")
            })
        }
        else {
          this.status='error'
          alert("Error en obtencion de token")
        }
      },
      error => {
        this.status='error'
        alert("Error")
      }
    )
    
  }

  logout(){
    this._route.params.subscribe(params =>{
      let logout = +params['sure']
      if (logout == 1){
        localStorage.removeItem('identity')
        localStorage.removeItem('token')
        this.identity= null
        this.token= null

        this._router.navigate(['inicio'])
      }
    })
  }

}

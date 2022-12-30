import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../global';
import { User } from 'src/app/models/user';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string
  public token:any = null
  public identity:any = null


  constructor(
    public _http: HttpClient
  ) { 
    this.url= global.url+'/users'
  }
  
  register(user: User): Observable<any>{
    let json= JSON.stringify(user)
    let params= 'json='+json

    let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    
    return this._http.post(this.url+'/register',params,{headers: headers})
  }

  signup(user: User, getToken = false):Observable<any>{
    user.description = global.htmlEntities(user.description)
    let json= JSON.stringify(user)
    let params= 'json='+json
    if (getToken){
      params= params.replace('}',',"gettoken": "true"}')
    }
    let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    
    return this._http.post(this.url+'/login',params,{headers : headers})
  
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity')||'[]')

    if(identity && identity !='[]'){
      this.identity=identity
    }
    else {
      this.identity=null
    }
    return this.identity
  }

  getToken(){
    let token = localStorage.getItem('token')||'[]'

    if(token && token !='[]'){
      this.token=token
    }
    else {
      this.token=null
    }
    return this.token
  }

  update(token:any,user:any):Observable<any>{
    user.description = global.htmlEntities(user.description)
    let json= JSON.stringify(user)
    let params= "json="+json
    let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                  .set('Authorization',token)
    return this._http.put(this.url+'/update',params,{headers : headers})
  }

  getPostsUser(id: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    return this._http.get(global.url + '/post/user/' + id ,{headers:headers})
  }

  getUser(id: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    return this._http.get(this.url + '/detail/' + id ,{headers:headers})
  }
}

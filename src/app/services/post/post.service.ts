import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Post } from "src/app/models/post";
import { global } from "../global";

@Injectable()
export class PostService{
    public url : string
    


    constructor(
        private _http:HttpClient
    ){
        this.url= global.url+'/post'
    }

    create(token:string, post: Post):Observable<any>{
        post.content = global.htmlEntities(post.content)
        let json = JSON.stringify(post)
        let params = 'json='+json

        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization',token)

        return this._http.post(this.url,params,{headers:headers})
    }

    getPosts():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        return this._http.get(this.url,{headers:headers})
    }

    getPost(id:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        return this._http.get(this.url+'/'+id,{headers:headers})
    }

    postUpdate(token:string,post:Post,id:any):Observable<any>{
        post.content = global.htmlEntities(post.content)
        let json = JSON.stringify(post)
        let params = 'json='+json

        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization',token)

        return this._http.put(this.url + '/' + id,params,{headers:headers})
    }

    postDelete(token:string,id:any){
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization',token)

        return this._http.delete(this.url + '/' + id,{headers:headers})
    }
}
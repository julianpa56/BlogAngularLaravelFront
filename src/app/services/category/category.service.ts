import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../global';
import { Category } from 'src/app/models/category';




@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    public url: string
    public token: any = null
    public identity: any = null


    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url + '/category'
    }

    create(token: string, category: Category):Observable<any>{
        let json = JSON.stringify(category)
        let params = "json="+json

        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization', token)
        return this._http.post(this.url,params,{headers:headers})
    }

    getCategories():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        return this._http.get(this.url,{headers:headers})
    }

    getCategory(id:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        return this._http.get(this.url+'/'+id,{headers:headers})
    }

    getPostCategory(id:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        return this._http.get(global.url+'/post/category/'+id,{headers:headers})
    }
}

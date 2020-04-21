import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BackendServices{

    constructor(private httpClient: HttpClient){}
    
    login(userCreds): any{
         return this.httpClient.post<any>("http://localhost:8081/authenticate",userCreds,{observe:'response'})
         .pipe(
             tap(response => {
                 response.headers.keys()
                localStorage.setItem('userItem', response.headers.get('Authorization'));
                return response;
             })
         )
        
    }

}
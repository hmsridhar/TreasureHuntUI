import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { userData } from './global-models';

@Injectable({providedIn: 'root'})
export class BackendServices{

    constructor(private httpClient: HttpClient){}
    
    login(userCreds): any{
         return this.httpClient.post<any>("http://localhost:8081/authenticate",userCreds,{observe:'response'})
         .pipe(
             tap(response => {
                 response.headers.keys()
                var data = new userData(userCreds.username,response.headers.get('Authorization'),1,'Abc',20);
                localStorage.setItem('Data', JSON.stringify(data));
                return response;
             })
         )
        
    }

    logout(){
        localStorage.removeItem('Data');
    }

}
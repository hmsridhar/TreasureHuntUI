import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BackendServices{

    constructor(private httpClient: HttpClient){}
    
    login(): any{
         return this.httpClient.post<any>("http://localhost:8081/login",{username: 'admin',password: 'admin'},{observe:'response'})
        
    }

}
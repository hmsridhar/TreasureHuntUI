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
                 console.log(response.headers.keys())

                var data = new userData(userCreds.username,response.headers.get('Authorization'),parseInt(response.headers.get('teamId')),userCreds.username,0);
                localStorage.setItem('Data', JSON.stringify(data));
                return response;
             })
         )
        
    }

    logout(){
        localStorage.removeItem('Data');
    }

    getTeamInfo(teamId: number):any{
        return this.httpClient.get("http://localhost:8081/team/"+teamId).pipe(
            map(response => {
                return response;
            })
        )
    }

    getTeamScore(teamId: number):any{
        return this.httpClient.get("http://localhost:8081/team/"+teamId+"/points").pipe(
            map(response =>{
                return response;
            })
        )
    }

    getLeaderBoard():any{
        return this.httpClient.get('http://localhost:8081/team/score').pipe(
            map(response => {
                return response;
            })
        )
    }

    uploadTeamFile(file: File):any{
        const formData = new FormData();
        formData.append('file',file);
        // return this.httpClient.post('http://localhost:8081/team/1/upload',formData,
        // {headers: {'Content-Type' : undefined}}).pipe(
        //     map(response => {
        //         return response;
        //     })
        // )
        console.log(formData);
       return this.httpClient.post('http://localhost:8081/team/1/upload', formData,{observe: 'response'}).pipe(
           map(response => {
               return response;
           })
       )
    //   .subscribe(event => {  
    //     console.log(event)
    //   })
    }

}
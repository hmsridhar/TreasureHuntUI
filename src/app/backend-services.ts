import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { userData, PassKey } from './global-models';
import { StateManagementService } from './state-management.service';

@Injectable({providedIn: 'root'})
export class BackendServices{

    backendUrl = "http://localhost:8081";
    constructor(private httpClient: HttpClient, private stateMgmtService: StateManagementService){}
    
    login(userCreds): any{
         return this.httpClient.post<any>(this.backendUrl+"/authenticate",userCreds,{observe:'response'})
         .pipe(
             tap(response => {
                response.headers.keys()
                var data = new userData(userCreds.username,response.headers.get('Authorization'),
                parseInt(response.headers.get('teamId')),userCreds.username,0,parseInt(response.headers.get('currentDay')),
                parseInt(response.headers.get('teamDay')),parseInt(response.headers.get('teamStage')),
                response.headers.get('teamImageUploadStatus'),response.headers.get('hint'));
                localStorage.setItem('Data', JSON.stringify(data));

                this.stateMgmtService.setUsername(data.username);
                this.stateMgmtService.setTeamName(data.teamName);
                this.stateMgmtService.setUsertype("TEAM");
                console.log('Hint'+response.headers.get('hint'));
                // if(data.hint!= '' || data.hint!= undefined)
                this.stateMgmtService.setHint(data.hint);
                this.stateMgmtService.setTeamId(data.teamId);
                this.stateMgmtService.setCurrentDay(data.currentDay);
                this.stateMgmtService.setTeamDay(data.teamDay);
                this.stateMgmtService.setTeamStage(data.teamStage);
                this.stateMgmtService.setTeamImageUploadStatus(data.teamImageUploadStatus);
                // this.stateMgmtService.refreshUserDetails();
                return response;
             })
         )
        
    }

    logout(){
        localStorage.removeItem('Data');
    }

    getTeamInfo(teamId: number):any{
        return this.httpClient.get(this.backendUrl+"/team/"+teamId).pipe(
            map(response => {
                return response;
            })
        )
    }

    getTeamScore(teamId: number):any{
        return this.httpClient.get(this.backendUrl+"/team/"+teamId+"/points").pipe(
            map(response =>{
                return response;
            })
        )
    }

    getLeaderBoard():any{
        return this.httpClient.get(this.backendUrl+'/team/score').pipe(
            map(response => {
                return response;
            })
        )
    }

    uploadTeamFile(file: File):any{
        const formData = new FormData();
        formData.append('file',file);
       return this.httpClient.post(this.backendUrl+'/team/'+this.stateMgmtService.getTeamId()+'/upload', formData,{observe: 'response'}).pipe(
            map(response => response)
       )
    }

    tryMoveUsingPasskey(passkey: string):any{
        var pKey = new PassKey(passkey);
        return this.httpClient.post(this.backendUrl+"/config/team/"+this.stateMgmtService.getTeamId()+"/passkey/enter",
        JSON.stringify(pKey),{observe: 'response', headers: {'Content-Type': 'application/json'}}).pipe(
            map( response => response)
        );
    }

    reachCity():any{
        return this.httpClient.get(this.backendUrl+"/config/team/"+this.stateMgmtService.getTeamId()+"/reachCity",{observe: 'response'}).pipe(
            map( response => response)
        );
    }

    getQuestion():any{
        return this.httpClient.get(this.backendUrl+"/question/"+this.stateMgmtService.getTeamId()).pipe(
            map(response => response)
        )
    }

    getClue():any{
        return this.httpClient.get(this.backendUrl+"/question/"+this.stateMgmtService.getTeamId()+"/clue",{observe: 'response'})
        .pipe(map(response => response));
    }

}
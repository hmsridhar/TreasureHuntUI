import { Injectable, EventEmitter } from '@angular/core';
import { userData } from './global-models';
import { BackendServices } from './backend-services';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class StateManagementService{
    
    // backendUrl = "http://192.168.113.26:8081";
    backendUrl = "http://localhost:8081";
    username: string;
    teamName: string;
    userType: string;
    teamId: number;
    token: string;
    hint: string;
    lastUpdatedScore : number;
    currentDay: number;
    teamDay: number;
    teamStage: number;
    teamImageUploadStatus: string;
    gameCompleted: boolean;

    constructor(private httpClient: HttpClient){
        if(localStorage.getItem("Data") != undefined){
            var data = JSON.parse(localStorage.getItem('Data'));
            this.setUsername(data.username);
            this.setUsertype("TEAM");
            this.setTeamName(data.teamName);
            this.setTeamId(data.teamId);
            this.setHint(data.hint);
            this.setLastUpdatedScore(data.lastUpdatedScore);
            this.setCurrentDay(data.currentDay);
            this.setTeamDay(data.teamDay);
            this.setTeamStage(data.teamStage);
            this.setTeamImageUploadStatus(data.teamImageUploadStatus);
            this.setGameCompleted(data.gameCompleted);
            console.log(this.gameCompleted);
        }
    }

    public reinitializeStateManagement(data: userData){
            this.setUsername(data.username);
            this.setUsertype("TEAM");
            this.setTeamName(data.teamName);
            this.setTeamId(data.teamId);
            this.setToken(data.token);
            this.setHint(data.hint);
            this.setCurrentDay(data.currentDay);
            this.setTeamDay(data.teamDay);
            this.setTeamStage(data.teamStage);
            this.setTeamImageUploadStatus(data.teamImageUploadStatus);
            this.setGameCompleted(data.gameCompleted);
    }

    public refreshUserDetails(){
        console.log('Refreshing');
        this.getUserDetails().subscribe( response =>{
            var data: userData = response;
            localStorage.setItem("Data",JSON.stringify(data));
            this.reinitializeStateManagement(data);
        }
         
        )
    }

    getUserDetails():any{
        return this.httpClient.get(this.backendUrl+"/team/"+this.getTeamId()+"/user").pipe(
            map(response => response)
        );
    }

    public setUsername(username: string): void{ this.username = username; }   
    
    public getUsername(): string{ return this.username; }

    public setTeamName(teamname: string): void{ this.teamName = teamname; }

    public getTeamName(): string{ return this.teamName; }

    public setUsertype(userType: string): void{ this.userType = userType; }

    public getUsertype(): string{ return this.userType; }

    public setTeamId(teamId: number):void { this.teamId = teamId; }

    public getTeamId(): number{ return this.teamId; }

    public setToken(token: string){ this.token = token;}

    public getToken():string{ return this.token;}

    public setHint(hint: string){ this.hint = hint; }

    public getHint():string{ return this.hint; }

    public setLastUpdatedScore(score: number){ this.lastUpdatedScore = score;}

    public getLastUpdatedScore():number{ return this.lastUpdatedScore; }

    public getCurrentDay():number{ return this.currentDay;}
    public getTeamDay():number{ return this.teamDay;}
    public getTeamStage():number{ return this.teamStage;}
    public getTeamImageUploadStatus():string{ return this.teamImageUploadStatus}

    public setCurrentDay(day: number){ this.currentDay = day; }

    public setTeamDay(day: number){ this.teamDay = day; }

    public setTeamStage(stage: number){ this.teamStage = stage; }

    public setTeamImageUploadStatus(status: string){ this.teamImageUploadStatus = status; }

    public setGameCompleted(status: boolean){ this.gameCompleted = status;}

    public getGameCompleted():boolean{ return this.gameCompleted;}

}
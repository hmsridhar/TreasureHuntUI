import { Injectable } from '@angular/core';
import { userData } from './global-models';


@Injectable({providedIn: 'root'})
export class StateManagementService{

    username: string;
    teamName: string;
    userType: string;
    teamId: number;
    currentDay: number;
    teamDay: number;
    teamStage: number;
    teamImageUploadStatus: string;

    constructor(){
        if(localStorage.getItem("Data") != undefined){
            var data = JSON.parse(localStorage.getItem('Data'));
            this.setUsername(data.username);
            this.setUsertype("TEAM");
            this.setTeamName(data.teamName);
            this.setTeamId(data.teamId);
            this.setCurrentDay(data.currentDay);
            this.setTeamDay(data.teamDay);
            this.setTeamStage(data.teamStage);
            this.setTeamImageUploadStatus(data.teamImageUploadStatus);
        }
    }

    public reinitializeStateManagement(data: userData){
            this.setUsername(data.username);
            this.setUsertype("TEAM");
            this.setTeamName(data.teamName);
            this.setTeamId(data.teamId);
            this.setCurrentDay(data.currentDay);
            this.setTeamDay(data.teamDay);
            this.setTeamStage(data.teamStage);
            this.setTeamImageUploadStatus(data.teamImageUploadStatus);
    }

    public setUsername(username: string): void{ this.username = username; }   
    
    public getUsername(): string{ return this.username; }

    public setTeamName(teamname: string): void{ this.teamName = teamname; }

    public getTeamName(): string{ return this.teamName; }

    public setUsertype(userType: string): void{ this.userType = userType; }

    public getUsertype(): string{ return this.userType; }

    public setTeamId(teamId: number):void { this.teamId = teamId; }

    public getTeamId(): number{ return this.teamId; }

    public getCurrentDay():number{ return this.currentDay;}
    public getTeamDay():number{ return this.teamDay;}
    public getTeamStage():number{ return this.teamStage;}
    public getTeamImageUploadStatus():string{ return this.teamImageUploadStatus}

    public setCurrentDay(day: number){ this.currentDay = day; }

    public setTeamDay(day: number){ this.teamDay = day; }

    public setTeamStage(stage: number){ this.teamStage = stage; }

    public setTeamImageUploadStatus(status: string){ this.teamImageUploadStatus = status; }

}
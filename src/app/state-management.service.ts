import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class StateManagementService{

    username: string;
    userType: string;
    teamId: number;

    constructor(){}

    public setUsername(username: string): void{ this.username = username; }   
    
    public getUsername(): string{ return this.username; }

    public setUsertype(userType: string): void{ this.userType = userType; }

    public getUsertype(): string{ return this.userType; }

    public setTeamId(teamId: number):void { this.teamId = teamId; }

    public getTeamId(): number{ return this.teamId; }


}
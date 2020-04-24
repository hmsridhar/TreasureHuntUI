
export class userData{
    username: string;
    token: string;
    teamId: number;
    teamName: string;
    lastUpdatedScore: number;
    currentDay: number;
    teamDay: number;
    teamStage: number;
    teamImageUploadStatus: string;

    constructor(username: string, token: string, teamId: number, teamName: string,
         lastUpdatedScore: number, currentDay: number, teamDay: number,
         teamStage: number, teamImageUploadStatus: string){
       this.username = username; 
       this.token = token;
       this.teamId = teamId;
       this.teamName = teamName;
       this.lastUpdatedScore = lastUpdatedScore;
       this.currentDay = currentDay;
       this.teamDay = teamDay;
       this.teamStage = teamStage;
       this.teamImageUploadStatus = teamImageUploadStatus;
    }

    public setLastUpdatedScore(score: number): void{
        this.lastUpdatedScore = score;
    }

    public getCurrentDay():number{ return this.currentDay;}
    public getTeamDay():number{ return this.teamDay;}
    public getTeamStage():number{ return this.teamStage;}
    public getTeamImageUploadStatus():string{ return this.teamImageUploadStatus}

}

export class PuzzleData{
    path: string;
    id: number;
    text: string;

constructor(path: string, id: number, text: string){
        this.path = path;
        this.id = id;
        this.text = text;
    }
}
export class TeamMember{
    teamId: number;
    name: string;

    constructor(teamId: number, name: string){
        this.teamId = teamId;
        this.name = name;
    }
}
export class TeamMembersKey{
    teamMembersKey: TeamMember;
}

export class TeamInfo{
    type: string;
    name: string;
    list: TeamMembersKey[];
}

export class TeamList{
    list: TeamMember[]
    constructor(l: TeamMember[]){
        this.list = l;
    }
}

export class TeamScore{
    type: string;
    teamName: string;
    score: number
}

export class TeamScoreList{
    type: string;
    list: TeamScore[];
}
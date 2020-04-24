
export class userData{
    username: string;
    token: string;
    teamId: number;
    teamName: string;
    lastUpdatedScore: number;

    constructor(username: string, token: string, teamId: number, teamName: string, lastUpdatedScore: number){
       this.username = username; 
       this.token = token;
       this.teamId = teamId;
       this.teamName = teamName;
       this.lastUpdatedScore = lastUpdatedScore;
    }

    public setLastUpdatedScore(score: number): void{
        this.lastUpdatedScore = score;
    }

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
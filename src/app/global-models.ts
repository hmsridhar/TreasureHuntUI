
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
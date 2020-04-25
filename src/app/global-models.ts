
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
    hint: string;

    constructor(username: string, token: string, teamId: number, teamName: string,
         lastUpdatedScore: number, currentDay: number, teamDay: number,
         teamStage: number, teamImageUploadStatus: string, hint: string){
       this.username = username; 
       this.token = token;
       this.teamId = teamId;
       this.teamName = teamName;
       this.lastUpdatedScore = lastUpdatedScore;
       this.currentDay = currentDay;
       this.teamDay = teamDay;
       this.teamStage = teamStage;
       this.teamImageUploadStatus = teamImageUploadStatus;
       this.hint = hint;
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

export class DayImageDetails{
    stage1img: string;
    stage2img: string;
    stage3img: string;
    stage4img: string;

    constructor(img1, img2, img3, img4){
        this.stage1img = img1;
        this.stage2img = img2;
        this.stage3img = img3;
        this.stage4img = img4;
    }
}

export class GlobalImageDetails{
    day1: DayImageDetails;
    day2: DayImageDetails;
    day3: DayImageDetails;
    day4: DayImageDetails;

    constructor(day1, day2, day3, day4){
        this.day1 = day1;
        this.day2 = day2;
        this.day3 = day3;
        this.day4 = day4;
    }
}

export class PassKey{
    type: string;
    key: string;

    constructor(key: string){
        this.type = "passkey";
        this.key = key;
    }
}
import { Component } from '@angular/core';
import { StateManagementService } from './state-management.service';
import { userData } from './global-models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TreasureHunt';

  sideBarOpened = false;
  isUserLoggedIn = false;
  teamName: string;
  score: number;

  constructor(private stateMgmtService: StateManagementService){
    console.log('here refresh');
    if(localStorage.getItem("Data") != undefined){
      var data: userData = JSON.parse(localStorage.getItem('Data'));
      this.teamName = data.teamName;
      this.score = data.lastUpdatedScore;
    }
  }

  toggleSideBar(event: any){
    if(event.type == "sideBarEvent"){
      this.sideBarOpened = ! this.sideBarOpened;
    }else if(event.type == "logout"){
      this.sideBarOpened = false;
      this.isUserLoggedIn = false;
    }
  }

  onActivate(event){
    if(event == undefined)
      return;
    else if(event.loginEventEmitter != undefined){
      event.loginEventEmitter.subscribe((eventData)=>{
        if(eventData.type == 'loginEvent'){
          this.isUserLoggedIn = true;
          this.stateMgmtService.setUsername(eventData.username);
          this.stateMgmtService.setUsertype(eventData.userType);
          this.stateMgmtService.setTeamId(eventData.teamId);
          this.teamName = eventData.teamName;
          this.score = eventData.score;
        }
      })
      
    }
  }

  ngOnInit(){
    console.log('init');
    if(localStorage.getItem('Data')){
      this.isUserLoggedIn = true;
      var data: userData = JSON.parse(localStorage.getItem('Data'));
      this.stateMgmtService.setTeamName(data.teamName);
    }
  }
}

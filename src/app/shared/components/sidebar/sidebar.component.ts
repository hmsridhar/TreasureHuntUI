import { Component, OnInit, Input } from '@angular/core';
import { BackendServices } from 'src/app/backend-services';
import { StateManagementService } from 'src/app/state-management.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() teamName: string;
  @Input() score: number;
  keyCount: number = 0;
  subscription: any;
  isGameComplete = false;
  constructor(private backendService: BackendServices, private stateMgmtService: StateManagementService) { 
    this.keyCount = 0;
    this.subscription = backendService.getPointsEventEmitter().subscribe(event => {
      if(event!=null && event.type == "pointsChange"){
        this.score += event.score;
        this.stateMgmtService.refreshUserDetails();
      }else if(event!=null && event.type == "hintTaken"){
        this.score -= event.score;
      }
    });
    this.keyCount = this.stateMgmtService.getTeamDay()-1;
    if(localStorage.getItem("Data"))
    this.isGameComplete = JSON.parse(localStorage.getItem("Data")).gameCompleted;
  }

  ngOnInit(): void {
  }

}

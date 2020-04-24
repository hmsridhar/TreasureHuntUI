import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendServices } from 'src/app/backend-services';
import { TeamInfo, TeamList, TeamMember } from 'src/app/global-models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StateManagementService } from 'src/app/state-management.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {

  teamname: string;
  teamList  = [];
  displayedColumns= ["teamId","name"];
  dataSource : MatTableDataSource<TeamMember>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private backendService: BackendServices, private stateMgmtService: StateManagementService) {
    this.backendService.getTeamInfo(this.stateMgmtService.getTeamId()).subscribe(
      data => {
        var list = [];
        var teamInfo :TeamInfo = data;
        this.teamname = teamInfo.name;
        var index = 1;
        teamInfo.list.forEach(element => {
          var member = element.teamMembersKey;
          list.push(new TeamMember(index++,member.name));
        });
        console.log(list);
        this.dataSource = new MatTableDataSource(list);
        this.dataSource.sort = this.sort;
      }
    );
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    if(this.dataSource != undefined){
      this.dataSource.sort = this.sort;
    }
  }

}

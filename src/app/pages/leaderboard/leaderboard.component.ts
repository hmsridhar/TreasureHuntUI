import { Component, OnInit } from '@angular/core';
import { TeamScore } from 'src/app/global-models';
import { BackendServices } from 'src/app/backend-services';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  teamScoreList: TeamScore[];
  displayedColumns = ['teamName','score'];
  dataSource : MatTableDataSource<TeamScore>;
  constructor(private backendService: BackendServices) {
    this.backendService.getLeaderBoard().subscribe(response => {
      this.teamScoreList = response.list;
      this.dataSource = new MatTableDataSource(this.teamScoreList);
    })
   }

  ngOnInit(): void {
  }

}

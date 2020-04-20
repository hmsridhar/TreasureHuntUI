import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TreasureHunt';

  sideBarOpened = false;

  constructor(){}

  toggleSideBar(event: any){
    if(event.type == "sideBarEvent"){
      this.sideBarOpened = ! this.sideBarOpened;
    }
  }
}

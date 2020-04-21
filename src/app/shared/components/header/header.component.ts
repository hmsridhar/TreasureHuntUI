import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isUserLoggedIn = false;

  @Output() sideBarEventEmitter: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  emitSideBarEvent(){
    this.sideBarEventEmitter.emit({type : 'sideBarEvent'});
  }
}

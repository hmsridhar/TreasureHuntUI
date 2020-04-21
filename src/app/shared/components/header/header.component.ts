import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BackendServices } from 'src/app/backend-services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isUserLoggedIn = false;

  @Output() sideBarEventEmitter: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router,private backendServices: BackendServices) { }

  ngOnInit(): void {
  }

  emitSideBarEvent(){
    this.sideBarEventEmitter.emit({type : 'sideBarEvent'});
  }

  login(){
    console.log('clicked');
    this.router.navigate['/login'];
  }

  logout(){
    this.backendServices.logout();
    this.sideBarEventEmitter.emit({type: 'logout'});
    this.router.navigate([''])
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BackendServices } from 'src/app/backend-services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  @Output() loginEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private service: BackendServices) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.service.login({username: this.username, password: this.password}).subscribe(response=>{
      // console.log(response);
      // console.log(response.status);
      if(response.status == 200){
        this.loginEventEmitter.emit({type: 'loginEvent', username: this.username, userType: 'TEAM', teamId: 2});
      }
    })
  }

}

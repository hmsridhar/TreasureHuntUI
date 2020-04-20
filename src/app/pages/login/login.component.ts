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
    // console.log(this.username);
    // console.log(this.password);
    this.service.login().subscribe(response=>{
      console.log(response);
      console.log(response.status)
    })
  }

}

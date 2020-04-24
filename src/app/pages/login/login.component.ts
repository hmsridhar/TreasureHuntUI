import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BackendServices } from 'src/app/backend-services';
import { Router } from '@angular/router';
import { userData } from 'src/app/global-models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  @Output() loginEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private service: BackendServices, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.service.login({username: this.username, password: this.password}).subscribe(response=>{
      // console.log(response);
      console.log(response.status);
      if(response.status == 200){
        this.service.getTeamScore(response.headers.get('teamId')).subscribe(innerResponse => {
          this.loginEventEmitter.emit({type: 'loginEvent', username: this.username, userType: 'TEAM', teamId: response.headers.get('teamId'), teamName: this.username, score : innerResponse.points});
        this.router.navigate(['/question']);
        var data : userData = JSON.parse(localStorage.getItem('Data'));
        data.setLastUpdatedScore(innerResponse.points);
        localStorage.setItem('Data',JSON.stringify(data));
        })
      }else if(response.status == 401){
        alert('Invalid Credentials');
      }
    })
  }

}

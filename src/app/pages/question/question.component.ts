import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  currentImagePath: string;
  passcode: string;
  answer: string;
  shipEntry = true;
  cityGate = false;
  cityMain = false;
  shipExit = false;
  

  constructor() { 
    this.currentImagePath = "url('../../assets/ship.jpg')";  
  }

  ngOnInit(): void {
  }

  enterCity(){
    this.currentImagePath ="url('../../assets/door1.jpg')";
    this.shipEntry = false;
    this.cityGate = true;
  }

  openGateIfAnswerValid(){
    if(this.passcode == "sudo"){
      this.passcode="";
      this.cityGate = false;
      this.cityMain = true;
      this.currentImagePath = "url('../../assets/city1.png')"
    }
  }

  getKeyIfAnswerValid(){
    if(this.answer == "sudo"){
      this.answer = "";
      this.cityMain = false;
      this.shipExit = true;
      this.currentImagePath="url('../../assets/shipExit.webp')"
    }
  }
}

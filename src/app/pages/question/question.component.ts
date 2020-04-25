import { Component, OnInit } from '@angular/core';
import { GlobalImageDetails, DayImageDetails } from 'src/app/global-models';
import { StateManagementService } from 'src/app/state-management.service';
import { BackendServices } from 'src/app/backend-services';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  teamDay : number;
  question: string;
  teamStage: number;
  hintText: string;
  hintUnlocked = false;
  currentImagePath: string;
  passkey: string;
  answer: string;
  shipEntry = false;
  cityGate = false;
  cityMain = false;
  shipExit = false;
  isPhotoUploaded = false;
  imageDetails: GlobalImageDetails;
  dayObj: DayImageDetails = null;
  invalidAnswer = false;

  constructor(private stateMgmtService: StateManagementService,
    private backendServices: BackendServices ) { 
    // this.currentImagePath = "url('../../assets/ship.jpg')";
    this.teamDay = this.stateMgmtService.getTeamDay();
    this.teamStage = this.stateMgmtService.getTeamStage();
    if(this.stateMgmtService.getHint() != "" || this.stateMgmtService.getHint() != undefined){
      this.hintText = "Hint: "+this.stateMgmtService.getHint();
    }
    if(this.hintText != "" || this.hintText != undefined){
      this.hintUnlocked = true;
    } 
    if(this.stateMgmtService.getTeamImageUploadStatus() == "done"){
      this.isPhotoUploaded = true;
    }
    this.imageDetails = {
      day1: new DayImageDetails("url('../../assets/ship.jpg')","url('../../assets/day1/door.jpg')",
              "url('../../assets/day1/city.png')","url('../../assets/shipExit.webp')"),
      day2: new DayImageDetails("url('../../assets/ship.jpg')","url('../../assets/day2/door.jpg')",
              "url('../../assets/day2/city.png')","url('../../assets/shipExit.webp')"),
      day3: new DayImageDetails("url('../../assets/ship.jpg')","url('../../assets/day3/door.jpg')",
              "url('../../assets/day3/city.png')","url('../../assets/shipExit.webp')"),
      day4: new DayImageDetails("url('../../assets/ship.jpg')","url('../../assets/day4/door.jpg')",
              "url('../../assets/day4/city.png')","url('../../assets/shipExit.webp')"),
    }
    this.dayObj = this.getDayObject();
    switch(this.teamStage){
      case 1: this.showShipEntry(); break;
      case 2: this.showCityGate(); break;
      case 3: this.showCityMain(); break;
      case 4: this.showShipExit(); break;
      case 5: this.showShipExit(); break;
      // case 
    }  
  }

  ngOnInit(): void {
  }

  getDayObject(){
    var dayObj : DayImageDetails = null;
    switch(this.teamDay){
      case 1: dayObj = this.imageDetails.day1; break;
      case 2: dayObj = this.imageDetails.day2; break;
      case 3: dayObj = this.imageDetails.day3; break;
      case 4: dayObj = this.imageDetails.day4; break;
    }
    return dayObj;
  }

  showShipEntry(){
    this.currentImagePath = this.dayObj.stage1img;
    this.shipEntry = true;
  }
  showCityGate(){
    this.currentImagePath = this.dayObj.stage2img;
    this.shipEntry = false;
    this.cityGate = true;
  }
  showCityMain(){
    this.backendServices.getQuestion().subscribe(response=>{
      this.question = response.text;
    })
    this.currentImagePath = this.dayObj.stage3img;
    this.cityGate = false;
    this.cityMain = true;
  }
  showShipExit(){
    this.currentImagePath = this.dayObj.stage4img;
    this.cityMain = false;
    this.shipExit = true;
  }

  enterCity(){
    this.backendServices.reachCity().subscribe(response => {
      alert(response.body.message);
      this.stateMgmtService.refreshUserDetails();
      this.showCityGate();
    })
    // this.currentImagePath ="url('../../assets/day1/door.jpg')";
    // this.shipEntry = false;
    // this.cityGate = true;
  }

  openGateIfAnswerValid(){
    if(this.passkey == "" || this.passkey == undefined){
      this.invalidAnswer = true;
      // alert('Passkey cannot be empty!');
      return;
    }
    this.backendServices.tryMoveUsingPasskey(this.passkey).subscribe(response => {
      this.invalidAnswer = false;
      // alert(response.body.message);
      this.stateMgmtService.refreshUserDetails();
      this.showCityMain();
    },error => {
      this.invalidAnswer = true;
      // alert(error);
    })
    // if(this.passkey == "sudo"){
    //   this.passkey="";
    //   this.cityGate = false;
    //   this.cityMain = true;
    //   this.currentImagePath = "url('../../assets/day1/city.png')"
    // }
  }

  getKeyIfAnswerValid(){
    if(this.answer == "sudo"){
      this.answer = "";
      this.cityMain = false;
      this.shipExit = true;
      this.currentImagePath="url('../../assets/shipExit.webp')"
    }
  }

  getKey(){
    alert('Photo upload is done, so getting key');
  }

  getHint(){
    this.hintUnlocked = true;
    this.backendServices.getClue().subscribe(response =>{
      console.log(response);
      if(response.body.clue!= undefined){
        this.hintText = "Hint: "+response.body.clue;
        this.stateMgmtService.refreshUserDetails();
      }
      else
        this.hintText = response.body.message
    },error =>{
      console.log(error);
      this.hintText = error;
    })
  }
}

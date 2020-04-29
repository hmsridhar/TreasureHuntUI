import { Component, OnInit } from '@angular/core';
import { GlobalImageDetails, DayImageDetails } from 'src/app/global-models';
import { StateManagementService } from 'src/app/state-management.service';
import { BackendServices } from 'src/app/backend-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  teamDay : number;
  cityName: string;
  cityPos : string;
  isLastGate = false;
  keyText: string;
  filename: string;
  keyButtonText = "Get Key";
  keyAvailable : boolean;
  question: string;
  teamStage: number;
  showSolvePuzzleButton = false;
  hintText: string;
  gotHint = false;
  hintUnlocked = false;
  currentImagePath: string;
  passkey: string;
  placeholder: string;
  answer: string;
  shipEntry = false;
  cityGate = false;
  cityMain = false;
  shipExit = false;
  isPhotoUploaded = false;
  imageDetails: GlobalImageDetails;
  dayObj: DayImageDetails = null;
  invalidAnswer = false;
  answerStatus: string;
  isTeamLaggingBehind = false;
  hasCompletedFinalChallenge = false;
  showCave = false;
  inpButtons = ["inp1","inp2","inp3","inp4","inp5","inp6","inp7","inp8","inp9"];
  in1=0; in2=0; in3=0; in4=0; in5=0; in6=0; in7=0; in8=0; in9=0;
  isGameCompleted = false;

  constructor(private stateMgmtService: StateManagementService,
    private backendServices: BackendServices,private router: Router ) { 
      this.isGameCompleted = this.stateMgmtService.getGameCompleted();
      if(this.isGameCompleted)
        this.showCave = true;
      this.placeholder="";
    // this.currentImagePath = "url('../../assets/ship.jpg')";
    this.teamDay = this.stateMgmtService.getTeamDay();
    this.teamStage = this.stateMgmtService.getTeamStage();
    var currentDay = this.stateMgmtService.getCurrentDay();
    if(this.teamDay < currentDay){
      this.isTeamLaggingBehind = true;
    }
    if(this.teamDay == 4){
      this.keyButtonText = "Check Completion Status";
      this.isLastGate = true;
    }
    if(this.stateMgmtService.getHint()){
      this.hintText = "Hint: "+this.stateMgmtService.getHint();
    }
    if(this.hintText != "" && this.hintText != undefined && this.hintText){
      if(this.hintText.includes("Hint:"))
        this.gotHint = true;
      this.hintUnlocked = true;
    } 
    if(this.stateMgmtService.getTeamImageUploadStatus() == "done"){
      this.isPhotoUploaded = true; 
    }
    this.imageDetails = {
      day1: new DayImageDetails("url('../../assets/ship.jpg')","url('../../assets/day1/door.jpg')",
              "url('../../assets/day1/city.png')","url('../../assets/shipExit.webp')"),
      day2: new DayImageDetails("url('../../assets/ship.jpg')","url('../../assets/day2/door.jpg')",
              "url('../../assets/day2/city.jpg')","url('../../assets/shipExit.webp')"),
      day3: new DayImageDetails("url('../../assets/ship.jpg')","url('../../assets/day3/door.jpg')",
              "url('../../assets/day3/city.jpg')","url('../../assets/shipExit.webp')"),
      day4: new DayImageDetails("url('../../assets/day4/main.jpg')","url('../../assets/day4/door.jpg')",
              "url('../../assets/day4/city.jpg')","url('../../assets/day4/exit.jpg')"),
    }
    this.dayObj = this.getDayObject();
    switch(this.teamStage){
      case 1: this.showShipEntry(); break;
      case 2: this.showCityGate(); break;
      case 3: this.showCityMain(); break;
      case 4: if(this.teamDay!=4)this.showShipExit(); else this.showFinalQuestion(); break; 
      case 5: 
      console.log(this.stateMgmtService.getGameCompleted());
        if(this.teamDay!=4)this.showShipExit();
        else if(this.stateMgmtService.getGameCompleted() == true && this.teamDay == 4){
          this.isGameCompleted = true; 
          this.currentImagePath="url('../../assets/day4/final.jpg')";
          this.showCave = false;
        }
        
        else this.showFinalQuestion(); 
        break; 
      // case 
    }  
  }

  ngOnInit(): void {
  }

  getDayObject(){
    var dayObj : DayImageDetails = null;
    switch(this.teamDay){
      case 1: dayObj = this.imageDetails.day1; this.cityName = "Devipura"; this.cityPos="first secret city"; this.placeholder="Enter forest"; break;
      case 2: dayObj = this.imageDetails.day2; this.cityName = "Teshwasara";this.cityPos="second secret city";  break;
      case 3: dayObj = this.imageDetails.day3; this.cityName = "Operipuram";this.cityPos="third secret city"; break;
      case 4: dayObj = this.imageDetails.day4; this.cityName = "Manikyaranya";this.cityPos="fourth secret place - Forest"; break;
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
      this.filename = response.filename;
    })
    this.currentImagePath = this.dayObj.stage3img;
    this.cityGate = false;
    this.cityMain = true;
  }
  showShipExit(){
    this.currentImagePath = this.dayObj.stage4img;
    this.cityMain = false;
    this.shipExit = true;
    this.keyAvailable = true;
  }

  enterCity(){
    this.backendServices.reachCity().subscribe(response => {
      // alert(response.body.message);
      this.stateMgmtService.refreshUserDetails();
      if(this.stateMgmtService.getTeamDay() == 4){
        this.shipEntry = false;
        this.cityGate = false;
        this.showCityMain();
      }
      else
        this.showCityGate();
    })
    // this.currentImagePath ="url('../../assets/day1/door.jpg')";
    // this.shipEntry = false;
    // this.cityGate = true;
  }

  openGateIfAnswerValid(){
    if(this.isLastGate){

    }
    if(this.passkey == "" || this.passkey == undefined){
      this.invalidAnswer = true;
      // alert('Passkey cannot be empty!');
      return;
    }
    this.backendServices.tryMoveUsingPasskey(this.passkey).subscribe(response => {
      this.invalidAnswer = false;
      this.showCityMain();
      this.stateMgmtService.refreshUserDetails();
    },error => {
      this.invalidAnswer = true;
    })
  }

  submitAnswer(){
    if(this.answer == "" || this.answer == undefined){
      this.answerStatus = "Answer cannot be empty!";
      return;
    }
    this.backendServices.submitAnswer(this.answer).subscribe(response => {
      if(response.message == "Incorrect answer,please Retry"){
          this.answerStatus = response.message;
      }else if(response.message == "Answer submitted successfully"){
        this.stateMgmtService.refreshUserDetails();
        // if(this.teamDay == 4){
        //   this.hasCompletedFinalChallenge = true;
        //   this.keyButtonText = "Check Completion Status";
        // }
        if(this.teamDay == 4){
          this.showFinalQuestion();
          this.answer ="";
        }else{
        this.showShipExit();
        }
      }
    });
  }

  getKey(){
    // alert('Photo upload is done, so getting key');
    this.backendServices.getKey().subscribe(response=>{
      if(response.body.key.includes("key with you already")){
        this.keyText = response.body.key;
      }else if(response.body.key.includes("Game completed")){
        alert('Game completed!');
      }
      else {
        if(response.body.key.includes('Congrats!'))
          this.keyText = response.body.key;
        else
          this.keyText = "Your key for the day is "+response.body.key+". Please keep this key safe, as it might be required later";
      }
    },error =>{
      this.keyText = "Your team image has not yet been approved";
    })
  }

  getHint(){
    this.hintUnlocked = true;
    this.backendServices.getClue().subscribe(response =>{
      // console.log(response);
      if(response.body.clue!= undefined){
        this.showSolvePuzzleButton = false;
        this.hintText = "Hint: "+response.body.clue;
        console.log(this.hintText);
        this.backendServices.emitPointsChangeEvent({type:'hintTaken',score:16})
        this.stateMgmtService.refreshUserDetails();
      }
      else{
        this.hintText = response.body.message;
        this.showSolvePuzzleButton = true;
      }
    },error =>{
      console.log(error);
      this.hintText = error;
    })
  }

  enterNextCity(){
    this.backendServices.enterNextCity().subscribe(response=>{
      this.stateMgmtService.refreshUserDetails();
      alert(response.body.message);
      window.location.reload(true)
      // this.router.navigate['/quest'];
    },error =>{
      alert(error);
    })
  }

  showFinalQuestion(){
    this.cityMain = false;
    this.showCave = true;
    this.backendServices.getFinalQuestion().subscribe(response =>{
      this.question = response.body.text;
      this.filename = response.body.filename;
      // console.log(response);
      this.currentImagePath="url('../../assets/day4/cave.jpg')";
    })
  }
  submitFinalAnswer(){
    var ans: string = this.in1.toString()+this.in2.toString()+this.in3.toString()+this.in4.toString()+this.in5.toString()+this.in6.toString()+
    this.in7.toString()+this.in8.toString()+this.in9.toString();
    this.backendServices.submitFinalAnswer(ans).subscribe(response=>{
      if(response.body.message.includes("Answer submitted successfully")){
        // alert('Hurray! You have successfully completed the game! Upload your team image to confirm your team win status');
        this.showCave = false;
        this.isGameCompleted = true;
        this.stateMgmtService.refreshUserDetails();
        this.currentImagePath="url('../../assets/day4/final.jpg')";
        // this.router.navigate(['event-summary'])
      }else
        alert(response.body.message);
    },error=>{
      alert(error);
    });
  }
}

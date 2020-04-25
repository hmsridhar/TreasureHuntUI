import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component, EventEmitter } from '@angular/core';
import { BackendServices } from 'src/app/backend-services';

@Component({
    selector: 'answer-puzzle',
    templateUrl: 'answer-puzzle.component.html'
  })
  export class AnswerPuzzleComponent{
    answer: string;
    puzzleId: number
    answerStatusEvent = new EventEmitter();
    constructor(
    public dialogRef: MatDialogRef<AnswerPuzzleComponent>,
    @Inject(MAT_DIALOG_DATA) data: Puz, private backendServices: BackendServices){
        this.puzzleId = data.puzzleId;
    }
  
    onClick(){
        if(!this.answer){
          alert('Answer cannot be empty');
        }else{
        this.backendServices.submitPuzzleAnswer(this.puzzleId,this.answer).subscribe(response => {
          if(response.body.message == "Max attempts reached"){
            this.answerStatusEvent.emit({type: 'max-attempts',puzzleId: this.puzzleId});
          }
          else if(response.body.message == "Answer submitted successfully"){
            // alert(response.body.message);
            this.answerStatusEvent.emit({type: 'correct-ans',puzzleId: this.puzzleId,answer: this.answer});
          }
        })
        // console.log(this.puzzleId);
        // console.log(this.answer);
        }
        this.dialogRef.close();
    }
  }
  
  export class Puz{
    puzzleId: number;
  }
  
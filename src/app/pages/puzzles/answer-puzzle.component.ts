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
        if (!this.answer){
          alert('Answer cannot be empty');
        }else{
        this.backendServices.submitPuzzleAnswer(this.puzzleId,this.answer).subscribe(response => {
          const message = response.body.message;
          if (message.indexOf('Max attempts reached') !== -1){
            alert('Sorry. Max attempts reached');
            location.reload();
           // this.answerStatusEvent.emit({type: 'max-attempts', puzzleId: this.puzzleId});
          }
          else if (message.indexOf('Answer submitted successfully') !== -1){
            // alert(response.body.message);
            location.reload();
           // this.answerStatusEvent.emit({type: 'correct-ans', puzzleId: this.puzzleId, answer: this.answer});
          }else if (message.indexOf('Incorrect answer') !== -1){
            const messages = message.split(':');
            alert('Sorry. Your answer is wrong ! \nAttempts Tried Count : ' + messages[1]);
          }
        });
        // console.log(this.puzzleId);
        // console.log(this.answer);
        }
        this.dialogRef.close();
    }
  }

export class Puz{
    puzzleId: number;
  }

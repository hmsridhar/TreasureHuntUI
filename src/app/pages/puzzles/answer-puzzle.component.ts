import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component } from '@angular/core';

@Component({
    selector: 'answer-puzzle',
    templateUrl: 'answer-puzzle.component.html'
  })
  export class AnswerPuzzleComponent{
    answer: string;
    puzzleId: number
    constructor(
    public dialogRef: MatDialogRef<AnswerPuzzleComponent>,
    @Inject(MAT_DIALOG_DATA) data: Puz){
        this.puzzleId = data.puzzleId;
    }
  
    onClick(){
        console.log(this.puzzleId);
        console.log(this.answer);
        this.dialogRef.close();
    }
  }
  
  export class Puz{
    
    puzzleId: number;
  }
  
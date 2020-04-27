import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { PuzzleData } from 'src/app/global-models';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnswerPuzzleComponent } from './answer-puzzle.component';
import { BackendServices } from 'src/app/backend-services';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.scss']
})
export class PuzzlesComponent implements OnInit {

  public puzzles: PuzzleData[] = [];
  answeredPuzzles: PuzzleData[] = [];
  maxAttemptPuzzles: PuzzleData[] =[] ;
  currentPuzzle: number;
  voiceType = "VOICE";
  
  constructor(public dialog: MatDialog, private backendServices: BackendServices) {
    // this.puzzles = [new PuzzleData('assets/board-game.jpg',1,"This is question 1 text you know"),
    // new PuzzleData('assets/treasure-hunt.jpg',2,'This is question 2 you know')];
    // console.log(this.puzzles);
    this.backendServices.getPuzzles().subscribe(response => {
      var allpuzzles: PuzzleData[] = response.list;
      for(var i=0;i<allpuzzles.length;i++){
        if(allpuzzles[i].hasAnswered){
          this.answeredPuzzles.push(allpuzzles[i])
        }else if(allpuzzles[i].maxAttemptsReached){
          this.maxAttemptPuzzles.push(allpuzzles[i])
        }else{
          this.puzzles.push(allpuzzles[i]);
        }
      }
      // this.puzzles = response.list;
    })
   }

  ngOnInit(): void {
    
  }

  submitAnswer(event){
    var id :number = event._elementRef.nativeElement.attributes.id.value;
    console.log(id);

  }

  openDialog(event):void{
    var id = event._elementRef.nativeElement.attributes.id.value;
    this.currentPuzzle = id;
    // const dialofRef = this.dialog.open(AnswerPuzzleComponent,{
    //   width: '230px',
    //   puz: {puzzleId: this.currentPuzzle}
    // })
    const dialogRef = this.dialog.open(AnswerPuzzleComponent,{
      width: '300px',
      data: { puzzleId : this.currentPuzzle}
    });
    const eventListener = dialogRef.componentInstance.answerStatusEvent.subscribe(data=>{
        // console.log(data);
        this.reshufflePuzzles(data.type, data.puzzleId, data.answer);
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.refresh();
      location.reload();
      console.log('The dialog was closed');
      eventListener.unsubscribe();
    });
  }

  reshufflePuzzles(eventType: string, puzzleId: number, answer: string){
    location.reload();
    console.log('Reshuffle puzzle called');
    var idMap = this.puzzles.map(function(element){ return element.id});
    var removeIndex = idMap.findIndex(element => element == puzzleId);
    
    var elementToBeRemoved = this.puzzles[removeIndex];
    console.log('Element to be remove is'+elementToBeRemoved);
    // console.log(elementToBeRemoved);
    if(eventType == "correct-ans"){
      this.backendServices.emitPointsChangeEvent(2);
      elementToBeRemoved.teamAnswer=answer;
      // window.alert = null;
      alert('Yayy! That\'s the right answer');
      // delete window.alert;
      this.answeredPuzzles.push(elementToBeRemoved);
    }else if(eventType == "max-attempts"){
      alert('Max Attempts reached, question disabled!')
      this.maxAttemptPuzzles.push(elementToBeRemoved);
    }
    this.puzzles.splice(removeIndex,1);
    console.log('element removed');
    // location.reload();
    // console.log('original')
    // console.log(this.puzzles);
    // console.log('answered')
    // console.log(this.answeredPuzzles);
  }

}


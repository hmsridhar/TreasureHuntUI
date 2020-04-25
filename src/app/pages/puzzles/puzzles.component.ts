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

  public puzzles: PuzzleData[] ;
  currentPuzzle: number;
  
  constructor(public dialog: MatDialog, private backendServices: BackendServices) {
    this.puzzles = [new PuzzleData('assets/board-game.jpg',1,"This is question 1 text you know"),
    new PuzzleData('assets/treasure-hunt.jpg',2,'This is question 2 you know')];
    console.log(this.puzzles);
    this.backendServices.getPuzzles().subscribe(response => {
      this.puzzles = response.list;
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
      width: '230px',
      data: { puzzleId : this.currentPuzzle}
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.refresh();
      console.log('The dialog was closed');
    });
  }

}


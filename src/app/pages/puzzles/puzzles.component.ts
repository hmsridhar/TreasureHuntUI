import { Component, OnInit } from '@angular/core';
import { PuzzleData } from 'src/app/global-models';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.scss']
})
export class PuzzlesComponent implements OnInit {

  public puzzles: PuzzleData[] ;
  
  constructor() {
    this.puzzles = [new PuzzleData('assets/logo.png',1,"This is question 1 text you know"),
    new PuzzleData('assets/treasure-hunt.jpg',2,'This is question 2 you know')];
    console.log(this.puzzles);
   }

  ngOnInit(): void {
    
  }

  submitAnswer(event){
    var id = event._elementRef.nativeElement.attributes.id.value;
    console.log(id);
  }

}

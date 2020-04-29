import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { BackendServices } from 'src/app/backend-services';
import { PuzzleWithAnswer } from 'src/app/global-models';

@Component({
  selector: 'app-event-summary',
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss']
})
export class EventSummaryComponent implements OnInit {

  
  detailsColor: ThemePalette = 'primary';
  statsColor: ThemePalette = 'primary';
  answersColor: ThemePalette = 'primary';
  imagesColor: ThemePalette = 'primary';
  voteColor: ThemePalette = 'primary';
  title: string;
  questionFileNames = [];
  puzzles: PuzzleWithAnswer[];
  teamImageFilenames = []

  constructor(private backendServices: BackendServices) { 
    this.teamImageFilenames = ["p1.jpeg","p2.png","p3.png","p4.jpeg","p5.jpeg","p6.jpeg","p7.png","p8.jpg","p9.jpeg","p10.jpeg"
    ,"p11.png","p12.png","p13.png","p14.png","p15.jpeg","p16.jpeg"]
  }

  ngOnInit(): void {
    this.showEventDetails();
  }

  showEventDetails(){
    this.detailsColor = 'accent';
    this.statsColor = 'primary';
    this.answersColor = 'primary';
    this.imagesColor = 'primary';
    this.voteColor = 'primary';
    this.title="Event Details"
  }

  showEventStats(){
    this.detailsColor = 'primary';
    this.statsColor = 'accent';
    this.answersColor = 'primary';
    this.imagesColor = 'primary';
    this.voteColor = 'primary';
    this.title="Event Statistics"
  }

  showAnswers(){
    this.detailsColor = 'primary';
    this.statsColor = 'primary';
    this.answersColor = 'accent';
    this.imagesColor = 'primary';
    this.voteColor = 'primary';
    this.title="Question, Puzzle Answers";
    this.backendServices.getQuestionFileNames().subscribe(response=>{
      this.questionFileNames = response.body.list;
    },error => {
      alert(error);
    })
    this.backendServices.getPuzzlesWithAnswers().subscribe(response =>{
      this.puzzles = response.body.list;
    },error=>{
      alert(error);
    })
  }

  showImages(){
    this.detailsColor = 'primary';
    this.statsColor = 'primary';
    this.answersColor = 'primary';
    this.imagesColor = 'accent';
    this.voteColor = 'primary';
    this.title="Team Images"
  }

  showVoteOfThanks(){
    this.detailsColor = 'primary';
    this.statsColor = 'primary';
    this.answersColor = 'primary';
    this.imagesColor = 'primary';
    this.voteColor = 'accent';
    this.title="Vote of thanks"
  }
}

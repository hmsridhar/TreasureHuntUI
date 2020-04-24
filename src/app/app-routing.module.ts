import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { QuestionComponent } from './pages/question/question.component';
import { PuzzlesComponent } from './pages/puzzles/puzzles.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { DefaultComponent } from './pages/default/default.component';
import { TeamInfoComponent } from './pages/team-info/team-info.component';
import { ImageUploadComponent } from './pages/image-upload/image-upload.component';


const routes: Routes = [{
  path: '',
  component: DefaultComponent
},
  {
  path: 'login',
    component: LoginComponent
},{
  path: 'question',
  component: QuestionComponent
},{
  path: 'puzzles',
  component: PuzzlesComponent
},{
  path: 'leaderboard',
  component: LeaderboardComponent
},{
  path: 'team-info',
  component: TeamInfoComponent
},{
  path: 'upload-image',
  component: ImageUploadComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

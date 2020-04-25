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
import { JWTAuthService } from './jwt-auth.service';
import { AuthGuardService } from './pages/auth-guard.service';


const routes: Routes = [{
  path: '',
  component: DefaultComponent
},
  {
  path: 'login',
    component: LoginComponent
},{
  path: 'quest',
  component: QuestionComponent,
  canActivate: [AuthGuardService]
},{
  path: 'puzzles',
  component: PuzzlesComponent,
  canActivate: [AuthGuardService]
},{
  path: 'leaderboard',
  component: LeaderboardComponent,
  canActivate: [AuthGuardService]
},{
  path: 'team-info',
  component: TeamInfoComponent,
  canActivate: [AuthGuardService]
},{
  path: 'upload-image',
  component: ImageUploadComponent,
  canActivate: [AuthGuardService]
},
// { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

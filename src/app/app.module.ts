import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './pages/login/login.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuestionComponent } from './pages/question/question.component';
import { PuzzlesComponent} from './pages/puzzles/puzzles.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { DefaultComponent } from './pages/default/default.component';
import { TeamInfoComponent } from './pages/team-info/team-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AnswerPuzzleComponent  } from '../app/pages/puzzles/answer-puzzle.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InterceptorService } from './interceptor.sevice';
import {ErrorInterceptorService} from './error-interceptor.service';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuestionComponent,
    PuzzlesComponent,
    LeaderboardComponent,
    DefaultComponent,
    TeamInfoComponent,
    AnswerPuzzleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    SharedModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    NgbModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [AnswerPuzzleComponent]
})
export class AppModule { }

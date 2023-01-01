import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfViewComponent } from './prof-view/prof-view.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { GestionViewComponent } from './gestion-view/gestion-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SubjectViewComponent } from './gestion-view/views/subject-view/subject-view.component';
import { ClassViewComponent } from './gestion-view/views/class-view/class-view.component';
import { RoomsViewComponent } from './gestion-view/views/rooms-view/rooms-view.component';
import { ProfessorsViewComponent } from './gestion-view/views/professors-view/professors-view.component';
import { StudentsViewComponent } from './gestion-view/views/students-view/students-view.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentViewComponent,
    NavbarComponent,
    ProfViewComponent,
    CalendarViewComponent,
    GestionViewComponent,
    PageNotFoundComponent,
    SubjectViewComponent,
    ClassViewComponent,
    RoomsViewComponent,
    ProfessorsViewComponent,
    StudentsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path : 'gestion-view',
        component:GestionViewComponent,
        children :[
          {path : 'subject-view', component:SubjectViewComponent},
          {path : 'rooms-view', component:RoomsViewComponent},
          {path : 'professors-view', component:ProfessorsViewComponent},
          {path : 'students-view', component:StudentsViewComponent},
          {path : 'class-view', component:ClassViewComponent}
        ]
      },
      {path : 'subject-view', component:SubjectViewComponent},
      {path : 'rooms-view', component:RoomsViewComponent},
      {path : 'professors-view', component:ProfessorsViewComponent},
      {path : 'students-view', component:StudentsViewComponent},
      {path : 'class-view', component:ClassViewComponent},
      {path : 'calendar-view', component:CalendarViewComponent},
      {path : '' ,redirectTo:'/calendar-view' ,pathMatch:'full'},
      //faire fonctionner la redirection auto
      {path : 'gestion-view' ,redirectTo:'subject-view' ,pathMatch:'full'},
      {path : '**',component:PageNotFoundComponent},
      
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

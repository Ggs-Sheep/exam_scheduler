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
import { ResponsableViewComponent } from './responsable-view/responsable-view.component';
import { ProfAdminViewComponent } from './prof-admin-view/prof-admin-view.component';
import { RespoPlanningCreatorComponent } from './respo-planning-creator/respo-planning-creator.component';
import { MyWatchViewComponent } from './prof-admin-view/views/my-watch-view/my-watch-view.component';
import { MyAbsenceViewComponent } from './prof-admin-view/views/my-absence-view/my-absence-view.component';
import { AbsenceAdderViewComponent } from './prof-admin-view/views/absence-adder-view/absence-adder-view.component';
import { AuthGuard } from './helpers/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './helpers/token.interceptor';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RedirectionComponent } from './redirection/redirection.component';

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
    StudentsViewComponent,
    ResponsableViewComponent,
    ProfAdminViewComponent,
    RespoPlanningCreatorComponent,
    MyWatchViewComponent,
    MyAbsenceViewComponent,
    AbsenceAdderViewComponent,
    RedirectionComponent,
    
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      

      //Vues principales (redirection selon la nature de l'user)
      {
        path:'prof-view',
        component:ProfViewComponent,
        canActivate:[AuthGuard],
        children:[
          {path : 'calendar-view', component:CalendarViewComponent,canActivate:[AuthGuard]},
          {
            path : 'administratif-view',
            component:ProfAdminViewComponent,
            canActivate:[AuthGuard],
            children:[
              {path : 'my-watch', component:MyWatchViewComponent,canActivate:[AuthGuard]},
              {path : 'absence-adder', component:AbsenceAdderViewComponent,canActivate:[AuthGuard]},
              {path : 'my-absence', component:MyAbsenceViewComponent,canActivate:[AuthGuard]},
            ]
          }
        ]
      },
      {
        path:'responsable-view',
        component:ResponsableViewComponent,
        canActivate:[AuthGuard],
        children:[
          {
            path : 'gestion-view',
            component:GestionViewComponent,
            canActivate:[AuthGuard],
            children :[
              {path : 'subject-view', component:SubjectViewComponent,canActivate:[AuthGuard]},
              {path : 'rooms-view', component:RoomsViewComponent,canActivate:[AuthGuard]},
              {path : 'professors-view', component:ProfessorsViewComponent,canActivate:[AuthGuard]},
              {path : 'students-view', component:StudentsViewComponent,canActivate:[AuthGuard]},
              {path : 'class-view', component:ClassViewComponent,canActivate:[AuthGuard]}
            ]
          },
          {path : 'calendar-view', component:CalendarViewComponent,canActivate:[AuthGuard]},
          {path : 'planner-view', component:RespoPlanningCreatorComponent,canActivate:[AuthGuard]}
        ]
      },
      {
        path:'student-view',
        component:StudentViewComponent,
        canActivate:[AuthGuard],
        children:[
          {path : 'calendar-view', component:CalendarViewComponent,canActivate:[AuthGuard]}
        ]
      },
      //Autres vues
      {path:'login', component:LoginComponent},
      {path:'',component:ResponsableViewComponent, canActivate:[AuthGuard]},
      {path : '**',component:PageNotFoundComponent,canActivate:[AuthGuard]},
    ])
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

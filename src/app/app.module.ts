import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './helpers/token.interceptor';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RedirectionComponent } from './redirection/redirection.component';
import { AddSubjectViewComponent } from './gestion-view/views/subject-view/subviews/add-subject-view/add-subject-view.component';
import { VisualizeSubjectViewComponent } from './gestion-view/views/subject-view/subviews/visualize-subject-view/visualize-subject-view.component';
import { AppRoutingModule } from './app-routing.module';
import { VisualizeClassViewComponent } from './gestion-view/views/class-view/subviews/visualize-class-view/visualize-class-view.component';
import { AddClassViewComponent } from './gestion-view/views/class-view/subviews/add-class-view/add-class-view.component';
import { VisualizeProfViewComponent } from './gestion-view/views/professors-view/subviews/visualize-prof-view/visualize-prof-view.component';
import { AddProfViewComponent } from './gestion-view/views/professors-view/subviews/add-prof-view/add-prof-view.component';
import { VisualizeRoomViewComponent } from './gestion-view/views/rooms-view/subviews/visualize-room-view/visualize-room-view.component';
import { AddRoomViewComponent } from './gestion-view/views/rooms-view/subviews/add-room-view/add-room-view.component';
import { VisualizeStudentViewComponent } from './gestion-view/views/students-view/subviews/visualize-student-view/visualize-student-view.component';
import { AddStudentViewComponent } from './gestion-view/views/students-view/subviews/add-student-view/add-student-view.component';
import { ApiHttpService } from './services/apihttp.service';

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
    AddSubjectViewComponent,
    VisualizeSubjectViewComponent,
    VisualizeClassViewComponent,
    AddClassViewComponent,
    VisualizeProfViewComponent,
    AddProfViewComponent,
    VisualizeRoomViewComponent,
    AddRoomViewComponent,
    VisualizeStudentViewComponent,
    AddStudentViewComponent,
    
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

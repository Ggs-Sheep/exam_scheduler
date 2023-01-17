import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
//Import interfaces
import { SubjectInterface } from '../types/subject.interface';
import { ClassInterface } from '../types/class.interface';
import { RoomInterface } from '../types/room.interface';
//Imports clients
import { SubjectClient } from '../clients/subject.client';
import { ClassesClient } from '../clients/classes.client';
import { RoomsClient } from '../clients/rooms.client';
import { Router } from '@angular/router';
import { ApiHttpService } from '../services/apihttp.service';
import { SessionsClient } from '../clients/sessions.client';

@Component({
  selector: 'app-respo-planning-creator',
  templateUrl: './respo-planning-creator.component.html',
  styleUrls: ['./respo-planning-creator.component.css']
})
export class RespoPlanningCreatorComponent implements OnInit {
  public plannerForm!: FormGroup;
  public periodsAmount:number = 0;

  private exSubjects:number[] = [];
  private exClasses:number[] = [];
  private muSubjects:number[] = [];
  private exRooms:number[] = [];

 

  constructor(
    private classesClient:ClassesClient,
    private subjectClient:SubjectClient,
    private roomsClient:RoomsClient,
    private router:Router,
    private apihttp:ApiHttpService,
    private sessionClient:SessionsClient
    
    ) { 
      
      
    }

  ngOnInit(): void {
    
    this.refreshAllData();
    this.plannerForm = new FormGroup({
      name: new FormControl('',Validators.required),
      start_date: new FormControl('',Validators.required),
      end_date: new FormControl('',Validators.required),
    });

    this.getAllSubjects().forEach((sub:SubjectInterface)=>{
      this.plannerForm.addControl('ex_subject_'+sub.id,new FormControl('',Validators.required))
      this.exSubjects.push(sub.id);
      
    })

    this.getAllClasses().forEach((sub:ClassInterface)=>{
      this.plannerForm.addControl('ex_class_'+sub.id,new FormControl('',Validators.required))
      this.exClasses.push(sub.id);
      
    })

    //matières à mutualiser
    this.getAllSubjects().forEach((sub:SubjectInterface)=>{
      this.plannerForm.addControl('mu_subject_'+sub.id,new FormControl('',Validators.required))
      this.muSubjects.push(sub.id);
      
    })

    this.getAvailableRooms().forEach((sub:RoomInterface)=>{
      this.plannerForm.addControl('ex_room_'+sub.id,new FormControl('',Validators.required))
      this.exRooms.push(sub.id);
    })

    
    
  }

  public refreshAllData(){
    this.classesClient.refreshClassesData();
    this.subjectClient.refreshSubjectsData();
    this.roomsClient.refreshRoomsData();

  }
 
  public getAllClasses():ClassInterface[]{
    return this.classesClient.getData()!;
  }

  public getAllSubjects():SubjectInterface[]{
    var data:SubjectInterface[] = this.subjectClient.getData();
    return data;
  }

  public returnArray(value:number){
    
   
    //console.log(Array.from(Array(value).keys()))
    return Array.from(Array(value).keys());
  }

  public setPeriodsAmount(event:any){
    
    this.periodsAmount = Number(event.target.value);
    this.returnArray(this.periodsAmount).forEach((sub:number)=>{

      if(!this.plannerForm.contains('start_ex_period_'+sub) || !this.plannerForm.contains('end_ex_period_'+sub)){
        this.plannerForm.addControl('start_ex_period_'+sub,new FormControl('',Validators.required));
        this.plannerForm.addControl('end_ex_period_'+sub,new FormControl('',Validators.required));
      }
      
    })
    //console.log(this.periodsAmount)
  }
 

  public getAvailableRooms():RoomInterface[]{
    return this.roomsClient.getData();
  }
 
  public sendPlannerInfo(){
    //on capture tous les elements ayant l'id :
    
    var elem =document.getElementsByClassName('retrievable');
    var arr:any[] = [].slice.call(elem);

    var timeslotsArray = [];
    for(let i=0;i<arr.length;i+=2){
      var js = {
        "start_date":arr[i].value,
        "end_date":arr[i+1].value
      }
      timeslotsArray.push(js);

    }

    //récupération des données dans un array
    var exSubjectsValues: any[] = [];
    this.exSubjects.forEach(id=>{
      //console.log
      if(this.compare(this.plannerForm.get('ex_subject_'+id)!.value)){
        exSubjectsValues.push(id);
      }
    })
    console.log(exSubjectsValues);

    var exClassesValues: any[] = [];
    this.exClasses.forEach(t=>{
      //console.log
      if(this.compare(this.plannerForm.get('ex_class_'+t)!.value)){
        exClassesValues.push(t)
      }
    })
    console.log(exClassesValues);

    var muSubjectsValues: any[] = [];
    this.muSubjects.forEach(t=>{
      //console.log
      if(this.compare(this.plannerForm.get('mu_subject_'+t)!.value)){
        muSubjectsValues.push(t)
      }
    })
    console.log(muSubjectsValues);

    var exRoomsValues: any[] = [];
    this.exRooms.forEach(t=>{
      //console.log
      if(this.compare(this.plannerForm.get('ex_room_'+t)!.value)){
        exRoomsValues.push(t)
      }
    })
    console.log(exRoomsValues);





    //Construction du json data

    var output = {
      "exam":{
        "name":this.plannerForm.get('name')!.value,
        "start_date": this.plannerForm.get('start_date')!.value,
        "end_date": this.plannerForm.get('end_date')!.value
      },
    "excluded_subjects":exSubjectsValues,
    "excluded_classes":exClassesValues,
    "excluded_timeslots":timeslotsArray,
    "mixed_subjects":muSubjectsValues,
    "excluded_rooms":exRoomsValues
    };

    console.log(output);
    this.sessionClient.postExamJSON(output)
    this.router.navigate(["responsable-view/calendar-view"])
  }

  private compare(val:any):boolean{
    if(val==true){
      return true;
    }else{
      return false;
    }
  }

}

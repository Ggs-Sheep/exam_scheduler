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

@Component({
  selector: 'app-respo-planning-creator',
  templateUrl: './respo-planning-creator.component.html',
  styleUrls: ['./respo-planning-creator.component.css']
})
export class RespoPlanningCreatorComponent implements OnInit {
  public plannerForm!: FormGroup;
  public periodsAmount:number = 0;
 

  constructor(
    private classesClient:ClassesClient,
    private subjectClient:SubjectClient,
    private roomsClient:RoomsClient
    
    ) { 
      
      
    }

  ngOnInit(): void {
    
    this.refreshAllData();
    this.plannerForm = new FormGroup({
      start_date: new FormControl('',Validators.required),
      end_date: new FormControl('',Validators.required),
    });
    
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
    //console.log(this.periodsAmount)
  }
 

  public getAvailableRooms():RoomInterface[]{
    return this.roomsClient.getData();
  }
 
  public sendPlannerInfo(){
    //On va ajouter les champs manquants au formGroup (les champs créés dynamiquement)
    
  }

}

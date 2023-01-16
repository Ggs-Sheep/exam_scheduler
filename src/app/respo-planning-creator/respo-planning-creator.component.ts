import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
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
  nameCtrl: FormControl = new FormControl();
  public periodsAmount:number = 0;
 

  constructor(
    private classesClient:ClassesClient,
    private subjectClient:SubjectClient,
    private roomsClient:RoomsClient
    
    ) { 
      this.nameCtrl = new FormControl();
      
    }

  ngOnInit(): void {
    
    this.refreshAllData();
    
    
  }

  public refreshAllData(){
    this.classesClient.refreshClassesData();
    this.subjectClient.refreshSubjectsData();
    this.roomsClient.refreshRoomsData();

  }

  public getAllClasses():ClassInterface[]{
    return this.classesClient.getAllClassesData()!;
  }

  public getAllSubjects():SubjectInterface[]{
    var data = this.subjectClient.getAllSubjectsData()!;
    var output:SubjectInterface[] = [];
    data.then((d)=>{
      output=d!;
    })
    return output;
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
    return this.roomsClient.getAvailableRooms();
  }
 

}

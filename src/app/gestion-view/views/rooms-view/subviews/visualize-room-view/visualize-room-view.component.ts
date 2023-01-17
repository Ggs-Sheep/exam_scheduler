import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomsClient } from 'src/app/clients/rooms.client';
import { RoomInterface } from 'src/app/types/room.interface';

@Component({
  selector: 'app-visualize-room-view',
  templateUrl: './visualize-room-view.component.html',
  styleUrls: ['../../../subviews-style.css']
})
export class VisualizeRoomViewComponent implements OnInit {

  public data:RoomInterface[]= [];
  public selectedId =-1;
  public pageMode = 0; //0 for visualize, 1 for modify form;
  public modifyForm!:FormGroup;
  constructor(private roomsClient:RoomsClient,private router:Router) { }

  async ngOnInit(): Promise<void> {

    this.roomsClient.refreshRoomsData();
    this.modifyForm = new FormGroup({
      name: new FormControl('',Validators.required),
      capacity: new FormControl('',Validators.required),
      
    });
    this.pageMode = 0;
    this.data = await this.roomsClient.getAllRoomsData()!;
    this.selectedId = this.data[0].id;
  }

  public getDataById(id:number):RoomInterface{
    return this.roomsClient.getRoomData(id)!;
  }

  public goToModifyForm(){
    
    this.pageMode = 1;
    console.log(this.pageMode);
  }

  public goToVisualize(){
    this.pageMode = 0;
    console.log(this.pageMode);
  }

  public onSubmit(){
    this.roomsClient.modifySubject(
      this.selectedId!,
      this.modifyForm.get('name')!.value!,
      this.modifyForm.get('capacity')!.value!
    )
    this.goToVisualize();
    this.router.navigate(["responsable-view/gestion-view/rooms-view"]).then(()=>
      this.router.navigate(["responsable-view/gestion-view/rooms-view/visualize-room"])
    )
    
    
  }

  public onDelete(){
    this.roomsClient.deleteSubject(
      this.selectedId!
    )
    this.selectedId = this.data[0].id;
    this.router.navigate(["responsable-view/gestion-view/rooms-view"]).then(()=>
      this.router.navigate(["responsable-view/gestion-view/rooms-view/visualize-room"])
    )
    
  }

}

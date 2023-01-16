import { Component, OnInit } from '@angular/core';
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

  constructor(private roomsClient:RoomsClient) { }

  ngOnInit(): void {
    this.pageMode = 0;
    this.roomsClient.refreshRoomsData();
    this.data = this.roomsClient.getAllRoomsData()!;
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

}

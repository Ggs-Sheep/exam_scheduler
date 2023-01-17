import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomsClient } from 'src/app/clients/rooms.client';
import {FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-add-room-view',
  templateUrl: './add-room-view.component.html',
  styleUrls: ['./add-room-view.component.css']
})
export class AddRoomViewComponent implements OnInit {
  public addForm!:FormGroup;
  constructor(private roomsClient:RoomsClient,private router:Router) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl('',Validators.required),
      capacity: new FormControl('',Validators.required),
    });
  }

  public onSubmit(){
    console.log(this.addForm!.get('name')!.value);
    this.roomsClient.createNewRoom(this.addForm!.get('name')!.value,this.addForm!.get('capacity')!.value)
    this.router.navigate(["responsable-view/gestion-view/rooms-view/visualize-room"]);
    
    
  }

}

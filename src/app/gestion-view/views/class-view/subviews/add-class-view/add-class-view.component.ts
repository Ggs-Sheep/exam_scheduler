import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { ClassesClient } from 'src/app/clients/classes.client';

@Component({
  selector: 'app-add-class-view',
  templateUrl: './add-class-view.component.html',
  styleUrls: ['./add-class-view.component.css']
})
export class AddClassViewComponent implements OnInit {
  public addForm!:FormGroup;
  constructor(private classesClient:ClassesClient,private router:Router) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl('',Validators.required),
    });
  }

  public onSubmit(){
    console.log(this.addForm!.get('name')!.value);
    this.classesClient.createNewClass(this.addForm!.get('name')!.value)
    this.router.navigate(["responsable-view/gestion-view/class-view/visualize-class"]);
    
    
  }

}

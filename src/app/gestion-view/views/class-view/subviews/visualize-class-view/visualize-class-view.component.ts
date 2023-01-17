import { Component, OnInit } from '@angular/core';
import { ClassesClient } from 'src/app/clients/classes.client';
import { SubjectClient } from 'src/app/clients/subject.client';
import { ClassInterface } from 'src/app/types/class.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-visualize-class-view',
  templateUrl: './visualize-class-view.component.html',
  styleUrls: ['../../../subviews-style.css']
})
export class VisualizeClassViewComponent implements OnInit {

  public data:ClassInterface[]= [];
  public selectedId =-1;
  public pageMode = 0; //0 for visualize, 1 for modify form;
  public modifyForm!:FormGroup;
  constructor(private classesClient:ClassesClient,private router:Router) { }

  async ngOnInit(): Promise<void> {
    this.classesClient.refreshClassesData();
    this.data = await this.classesClient.getAllClassesData()!;
    this.modifyForm = new FormGroup({
      name: new FormControl('',Validators.required),
      
    });
    this.pageMode = 0;
   
    
    this.selectedId = this.data[0].id;
  }

  public getDataById(id:number):ClassInterface{
    return this.classesClient.getClassData(id)!;
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
    this.classesClient.modifyClass(
      this.selectedId!,
      this.modifyForm.get('name')!.value!
    )
    this.goToVisualize();
    this.router.navigate(["responsable-view/gestion-view/class-view"]).then(()=>
      this.router.navigate(["responsable-view/gestion-view/class-view/visualize-class"])
    )
    
    
  }

  public onDelete(){
    this.classesClient.deleteClass(
      this.selectedId!
    )
    this.selectedId = this.data[0].id;
    this.router.navigate(["responsable-view/gestion-view/class-view"]).then(()=>
      this.router.navigate(["responsable-view/gestion-view/class-view/visualize-class"])
    )
    
  }

  

}

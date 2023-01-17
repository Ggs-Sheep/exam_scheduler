import { Component, OnInit } from '@angular/core';
import { StudentsClient } from 'src/app/clients/students.client';
import { StudentInterface } from 'src/app/types/student.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-visualize-student-view',
  templateUrl: './visualize-student-view.component.html',
  styleUrls: ['../../../subviews-style.css']
})
export class VisualizeStudentViewComponent implements OnInit {

  public data:StudentInterface[] = [];
  public selectedId =0;
  public pageMode = 0; //0 for visualize, 1 for modify form;
  public modifyForm!:FormGroup;
  constructor(
    private studentsClient:StudentsClient,
    private router:Router
    ) { }

  async ngOnInit(): Promise<void> {
    this.studentsClient.refreshStudentsData();
    
   
    this.data = await this.studentsClient.getAllStudentsData();
    
    this.modifyForm = new FormGroup({
      email: new FormControl('',Validators.required),
      last_name: new FormControl('',Validators.required),
      first_name: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      
    });
    
    this.pageMode = 0;
    this.selectedId = this.data[0].id;
  }

  public getDataById(id:number):StudentInterface{
    return this.studentsClient.getStudentData(id)!;
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
    var data = {
      "email":this.modifyForm!.get('email')!.value,
      "first_name":this.modifyForm!.get('first_name')!.value,
      "last_name":this.modifyForm!.get('last_name')!.value,
      "password":this.modifyForm!.get('password')!.value,
      "teacher":false,
      "admin":false
    }
    this.studentsClient.modifyStudent(
      this.selectedId!,
      data
    )
    this.goToVisualize();
    this.router.navigate(["responsable-view/gestion-view/students-view"]).then(()=>
      this.router.navigate(["responsable-view/gestion-view/students-view/visualize-student"])
    )
    
  }

  public onDelete(){
    this.studentsClient.deleteSubject(
      this.selectedId!
    )
    this.selectedId = this.data[0].id;
    this.router.navigate(["responsable-view/gestion-view/students-view"]).then(()=>
      this.router.navigate(["responsable-view/gestion-view/students-view/visualize-student"])
    )
    
  }

}

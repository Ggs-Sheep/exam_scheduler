import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { StudentsClient } from 'src/app/clients/students.client';

@Component({
  selector: 'app-add-student-view',
  templateUrl: './add-student-view.component.html',
  styleUrls: ['./add-student-view.component.css']
})
export class AddStudentViewComponent implements OnInit {
  public addForm!:FormGroup;
  constructor(private studentsClient:StudentsClient,private router:Router) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      last_name: new FormControl('',Validators.required),
      first_name: new FormControl('',Validators.required),
      
    });
  }

  public onSubmit(){
    //console.log(this.addForm!.get('name')!.value);
    var data = {
      "email":this.addForm!.get('email')!.value,
      "password":this.addForm!.get('password')!.value,
      "first_name":this.addForm!.get('first_name')!.value,
      "last_name":this.addForm!.get('last_name')!.value,
      "teacher":false,
      "admin":false,
      
    }
    this.studentsClient.createNewStudent(data)
    console.log("created user");
    this.router.navigate(["responsable-view/gestion-view/students-view/visualize-student"]);
    
    
  }

}

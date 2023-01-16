import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { SubjectClient } from 'src/app/clients/subject.client';
@Component({
  selector: 'app-add-subject-view',
  templateUrl: './add-subject-view.component.html',
  styleUrls: ['./add-subject-view.component.css']
})
export class AddSubjectViewComponent implements OnInit {
  public addForm!:FormGroup;
  constructor(private subjectClient:SubjectClient) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl('',Validators.required),
    });
  }

  public onSubmit(){
    console.log(this.addForm!.get('name')!.value);
    this.subjectClient.createNewSubject(this.addForm!.get('name')!.value)
    
    
    
  }

}

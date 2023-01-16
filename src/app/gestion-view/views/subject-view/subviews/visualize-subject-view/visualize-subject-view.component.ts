import { Component, OnInit } from '@angular/core';
import { SubjectClient } from 'src/app/clients/subject.client';
import { SubjectInterface } from 'src/app/types/subject.interface';
import { ClassInterface } from 'src/app/types/class.interface';
import { ClassesClient } from 'src/app/clients/classes.client';
import { ApiHttpService } from 'src/app/services/apihttp.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-visualize-subject-view',
  templateUrl: './visualize-subject-view.component.html',
  styleUrls: ['../../../subviews-style.css']
})
export class VisualizeSubjectViewComponent implements OnInit {

  public data:SubjectInterface[]= [];
  public selectedId =-1;
  public pageMode = 0; //0 for visualize, 1 for modify form;
  public modifyForm!:FormGroup;
  constructor(
    private subjectClient:SubjectClient,
    private classesClient:ClassesClient,
    private apiServices:ApiHttpService
    ) { 

  }

  ngOnInit(): void {
    this.modifyForm = new FormGroup({
      name: new FormControl('',Validators.required),
      
    });
    this.pageMode = 0;
    
    this.subjectClient.refreshSubjectsData();
    this.classesClient.refreshClassesData();
    this.subjectClient.getAllSubjectsData()!.then((data)=>{
      this.data = data!;
    });
    this.selectedId = this.data[0].id;
    
    
  }

  public getDataById(id:number):SubjectInterface{
    return this.subjectClient.getSubjectData(id)!;
  }

  public getRelatedClassDataById(id:number):ClassInterface[]{
    var output:ClassInterface[] = [];
    this.getDataById(id).classesId.forEach((idx:number)=>{
      output.push(this.classesClient.getClassData(idx)!);
    })
    
    return output;
  }

  public findIfClassIsRelated(id:number):boolean{
    var output = false;
    this.getRelatedClassDataById(this.selectedId!).forEach((c:ClassInterface)=>{
      if(c.id == id){output=true;}
    });
    return output;
  }

  public goToModifyForm(){
    this.pageMode = 1;
    console.log(this.pageMode);
  }

  public goToVisualize(){
    this.pageMode = 0;
    console.log(this.pageMode);
  }

  public getAllClasses():ClassInterface[]{
    return this.classesClient.getAllClassesData()!;
  }

  public onSubmit(){
    this.subjectClient.modifySubject(
      this.selectedId!,
      this.modifyForm.get('name')!.value!
    )
  }
}

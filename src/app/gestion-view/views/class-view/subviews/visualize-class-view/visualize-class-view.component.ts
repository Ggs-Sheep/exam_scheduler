import { Component, OnInit } from '@angular/core';
import { ClassesClient } from 'src/app/clients/classes.client';
import { SubjectClient } from 'src/app/clients/subject.client';
import { ClassInterface } from 'src/app/types/class.interface';
import { SubjectInterface } from 'src/app/types/subject.interface';

@Component({
  selector: 'app-visualize-class-view',
  templateUrl: './visualize-class-view.component.html',
  styleUrls: ['../../../subviews-style.css']
})
export class VisualizeClassViewComponent implements OnInit {

  public data:ClassInterface[]= [];
  public selectedId =-1;
  public pageMode = 0; //0 for visualize, 1 for modify form;

  constructor(private classesClient:ClassesClient,private subjectClient:SubjectClient) { }

  ngOnInit(): void {
    this.pageMode = 0;
    this.classesClient.refreshClassesData();
    this.subjectClient.refreshSubjectsData();
    this.data = this.classesClient.getAllClassesData()!;
    this.selectedId = this.data[0].id;
  }

  public getDataById(id:number):ClassInterface{
    return this.classesClient.getClassData(id)!;
  }

  public fetchAllRelatedSubjects(id:number):SubjectInterface[]{
    var output:SubjectInterface[] = []
    this.getAllSubjects()!.forEach((key:SubjectInterface)=>{
      key.classesId.forEach((idx:number)=>{
        if(idx == id){
          output.push(key);
        }
      })
    });
    return output!;
  }

  public getAllSubjects():SubjectInterface[]{
    var data = this.subjectClient.getAllSubjectsData()!;
    var output:SubjectInterface[] = [];
    data.then((d)=>{
      output=d!;
    })
    return output;
  }

  public findIfSubjectIsRelated(id:number):boolean{
    var output:boolean = false;
    this.fetchAllRelatedSubjects(this.selectedId!).forEach((sub:SubjectInterface)=>{
      if(id==sub.id){output=true;}
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

  public getSubjectDataById(id:number):SubjectInterface{
    return this.subjectClient.getSubjectData(id)!;
  }

  

}

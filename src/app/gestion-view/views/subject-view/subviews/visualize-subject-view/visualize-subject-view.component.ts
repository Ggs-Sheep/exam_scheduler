import { Component, OnInit } from '@angular/core';
import { SubjectClient } from 'src/app/clients/subject.client';
import { SubjectInterface } from 'src/app/types/subject.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-visualize-subject-view',
  templateUrl: './visualize-subject-view.component.html',
  styleUrls: ['../../../subviews-style.css']
})
export class VisualizeSubjectViewComponent implements OnInit {

  public data:SubjectInterface[]= [];
  public selectedId =0;
  public pageMode = 0; //0 for visualize, 1 for modify form;
  public modifyForm!:FormGroup;
  constructor(
    private subjectClient:SubjectClient,
    private router:Router
    ) { 

  }

  async ngOnInit(): Promise<void> {
    this.subjectClient.refreshSubjectsData();
    
    //this.classesClient.refreshClassesData();
    this.data = await this.subjectClient.getAllSubjectsData();
    this.modifyForm = new FormGroup({
      name: new FormControl('',Validators.required),
      
    });
    this.pageMode = 0;
    
    
    this.selectedId = this.data[0].id;//sélectionne l'id du premier élément
    //console.log(this.selectedId)
    
    
  }

  

  public getDataById(id:number):SubjectInterface{
    //console.log(this.subjectClient.getSubjectData(id)!);
    return this.subjectClient.getSubjectData(id!)!;
  }

  /*
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
*/
  public goToModifyForm(){
    this.pageMode = 1;
    console.log(this.pageMode);
  }

  public goToVisualize(){
    this.pageMode = 0;
    console.log(this.pageMode);
  }
/*
  public getAllClasses():ClassInterface[]{
    return this.classesClient.getAllClassesData()!;
  }
*/
  public onSubmit(){
    this.subjectClient.modifySubject(
      this.selectedId!,
      this.modifyForm.get('name')!.value!
    )
    this.goToVisualize();
    this.router.navigate(["responsable-view/gestion-view/subject-view"]).then(()=>
      this.router.navigate(["responsable-view/gestion-view/subject-view/visualize-subject"])
    )
    
    
  }

  public onDelete(){
    this.subjectClient.deleteSubject(
      this.selectedId!
    )
    this.selectedId = this.data[0].id;
    this.router.navigate(["responsable-view/gestion-view/subject-view"]).then(()=>
      this.router.navigate(["responsable-view/gestion-view/subject-view/visualize-subject"])
    )
    
  }
}

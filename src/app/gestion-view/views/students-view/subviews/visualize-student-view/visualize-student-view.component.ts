import { Component, OnInit } from '@angular/core';
import { StudentsClient } from 'src/app/clients/students.client';
import { StudentInterface } from 'src/app/types/student.interface';

@Component({
  selector: 'app-visualize-student-view',
  templateUrl: './visualize-student-view.component.html',
  styleUrls: ['../../../subviews-style.css']
})
export class VisualizeStudentViewComponent implements OnInit {

  public data:StudentInterface[] = [];
  public selectedId =-1;
   public pageMode = 0; //0 for visualize, 1 for modify form;

  constructor(private studentsClient:StudentsClient) { }

  ngOnInit(): void {
    this.pageMode = 0;
    this.studentsClient.refreshStudentsData();
    this.data = this.studentsClient.getAllStudentsData()!;
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

}

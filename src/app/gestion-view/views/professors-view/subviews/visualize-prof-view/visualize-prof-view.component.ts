import { Component, OnInit } from '@angular/core';
import { ProfessorsClient } from 'src/app/clients/profs.client';
import { ProfessorInterface } from 'src/app/types/professor.interface';

@Component({
  selector: 'app-visualize-prof-view',
  templateUrl: './visualize-prof-view.component.html',
  styleUrls: ['./visualize-prof-view.component.css']
})
export class VisualizeProfViewComponent implements OnInit {

  public data:ProfessorInterface[]= [];
  public selectedId =-1;
  public pageMode = 0; //0 for visualize, 1 for modify form;

  constructor(private ProfsClient:ProfessorsClient) { }

  ngOnInit(): void {
    this.pageMode = 0;
    this.ProfsClient.refreshProfsData();
    this.data = this.ProfsClient.getAllProfsData()!;
    this.selectedId = this.data[0].id;
  }

  public getDataById(id:number):ProfessorInterface{
    return this.ProfsClient.getProfData(id)!;
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

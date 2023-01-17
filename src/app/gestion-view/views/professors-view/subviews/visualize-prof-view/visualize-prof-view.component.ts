import { Component, OnInit } from '@angular/core';
import { ProfessorsClient } from 'src/app/clients/profs.client';
import { ProfessorInterface } from 'src/app/types/professor.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { UnavailableClient } from 'src/app/clients/unavailable.client';
import { UnavailableInterface } from 'src/app/types/unavailable.interface';
import { TimeslotInterface } from 'src/app/types/timeslot.interface';
import { TimeslotsClient } from 'src/app/clients/timeslot.client';
@Component({
  selector: 'app-visualize-prof-view',
  templateUrl: './visualize-prof-view.component.html',
  styleUrls: ['./visualize-prof-view.component.css']
})
export class VisualizeProfViewComponent implements OnInit {

  public data:ProfessorInterface[]= [];
  public unavailabilities:UnavailableInterface[]= [];
  public selectedId =-1;
  public pageMode = 0; //0 for visualize, 1 for modify form;
  public modifyForm!:FormGroup;
  constructor(
    private profsClient:ProfessorsClient,
    private router:Router,
    private unavailableClient:UnavailableClient,
    private timeslotsClient:TimeslotsClient
  ) { }

  async ngOnInit(): Promise<void> {
    
    this.profsClient.refreshProfsData();
    this.timeslotsClient.refreshTimeslotsData();
    this.data = await this.profsClient.getAllProfsData()!;
    console.log(this.data);
    this.modifyForm = new FormGroup({
      email: new FormControl('',Validators.required),
      last_name: new FormControl('',Validators.required),
      first_name: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      
    });
    this.pageMode = 0;
    this.selectedId = this.data[0].id;
    this.unavailabilities = await this.unavailableClient.getAllUnavailablesData();
    console.log(this.unavailabilities);
  }

  public getDataById(id:number):ProfessorInterface{
    return this.profsClient.getProfData(id)!;
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
      "teacher":true,
      "admin":false
    }
    this.profsClient.modifyProf(
      this.selectedId!,
      data
    )
    this.goToVisualize();
    this.router.navigate(["responsable-view/gestion-view/professors-view"]).then(()=>
      this.router.navigate(["responsable-view/gestion-view/professors-view/visualize-prof"])
    )
    
  }

  public getUserUnavailableData(userId:number):UnavailableInterface[]{
    let output:UnavailableInterface[] = [];
    
    this.unavailabilities.forEach((sub:any) =>{
        
        if(sub.teacher.id == userId){
            
            output.push(sub);
        }
    })
    return output;

}

  public onDelete(){
    this.profsClient.deleteProf(
      this.selectedId!
    )
    this.selectedId = this.data[0].id;
    this.router.navigate(["responsable-view/gestion-view/professors-view"]).then(()=>
      this.router.navigate(["responsable-view/gestion-view/professors-view/visualize-prof"])
    )
    
  }

  

  


  public accessTimeslot(obj:any):TimeslotInterface{
    
    return this.unavailableClient.getTimeslotOfUnavailable(obj.id)!
  }

  public dateFormat(str:string):string{
    return this.timeslotsClient.dateFormat(str);
  }
}

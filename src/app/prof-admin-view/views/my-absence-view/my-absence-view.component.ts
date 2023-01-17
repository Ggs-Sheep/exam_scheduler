import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UnavailableClient } from 'src/app/clients/unavailable.client';
import { TimeslotInterface} from 'src/app/types/timeslot.interface';
import { TimeslotsClient } from 'src/app/clients/timeslot.client';
import { UnavailableInterface } from 'src/app/types/unavailable.interface';
import { UserInterface } from 'src/app/types/user.interface';

@Component({
  selector: 'app-my-absence-view',
  templateUrl: './my-absence-view.component.html',
  styleUrls: ['./my-absence-view.component.css']
})
export class MyAbsenceViewComponent implements OnInit {
  public data:UnavailableInterface[] = []
  constructor(
    private timeslotsClient:TimeslotsClient,
    private unavailableClients:UnavailableClient,
    private router:Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.unavailableClients.refreshUnavailablesData();
    this.timeslotsClient.refreshTimeslotsData();
    var myId = JSON.parse(sessionStorage.getItem('user')!).id;

    this.data = await this.unavailableClients.getUserUnavailableData(myId);
    
  }

  public getDataById(id:number):UnavailableInterface{
    var resp = this.unavailableClients.getUnavailableData(id)!;
    
    return resp;
  }

  public accessTimeslot(id:number):TimeslotInterface{
    return this.unavailableClients.getTimeslotOfUnavailable(id)!
  }

  public dateFormat(str:string):string{
    var dateObject = new Date(str);    
    var formated = dateObject.toLocaleDateString()
    return formated;
  }

  public onDelete(event:any){
    this.unavailableClients.deleteUnavailable(Number(event.target.value!))
    this.router.navigate(["prof-view/administratif-view"]).then(()=>
      this.router.navigate(["prof-view/administratif-view/my-absence"])
    )
  }

}

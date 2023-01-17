import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { UnavailableClient } from 'src/app/clients/unavailable.client';
import { TimeslotInterface} from 'src/app/types/timeslot.interface';
import { TimeslotsClient } from 'src/app/clients/timeslot.client';
import { UnavailableInterface } from 'src/app/types/unavailable.interface';
import { UserInterface } from 'src/app/types/user.interface';
@Component({
  selector: 'app-absence-adder-view',
  templateUrl: './absence-adder-view.component.html',
  styleUrls: ['./absence-adder-view.component.css']
})
export class AbsenceAdderViewComponent implements OnInit {
  public addForm!:FormGroup;
  constructor(
    private router:Router,
    private unavailableClient:UnavailableClient,
    private timeslotsClient:TimeslotsClient
  ) { 
    
  }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      start_date: new FormControl('',Validators.required),
      end_date: new FormControl('',Validators.required),
    });
  }

  public onSubmit(){
    console.log('submiting');
    //On transforme les champs dates au bon format YYYY-MM-DD + string
    var start:string = this.addForm!.get('start_date')!.value
    var end:string = this.addForm!.get('end_date')!.value
    if(start==''||end ==''){
      alert('Saisissez toutes les dates avant de valider')
      return;
    }
    console.log(start + " to " + end);
    console.log(JSON.parse(sessionStorage.getItem('user')!).id);
    this.creator(start,end,JSON.parse(sessionStorage.getItem('user')!).id)
    

    
    
    this.router.navigate(["prof-view/administratif-view/my-absence"]);
    
    
  }

  private async creator(start:string,end:string,teacher:number){
    //On commence par créer un nouveau timeslot
    var timeslot:TimeslotInterface = await this.timeslotsClient.createNewTimeslot(start,end)
    //On reçoit la réponse de la requête (donc un nouveau objet timeslot)

    //On injecte l'id de ce timeslot dans la création d'un unavalable.
    //Les deux sont maintenant liés.
    this.unavailableClient.createNewUnavailable(teacher,timeslot.id)
  }

}

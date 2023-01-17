import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { ProfessorsClient } from 'src/app/clients/profs.client';

@Component({
  selector: 'app-add-prof-view',
  templateUrl: './add-prof-view.component.html',
  styleUrls: ['./add-prof-view.component.css']
})
export class AddProfViewComponent implements OnInit {
  public addForm!:FormGroup;
  constructor(private professorClient:ProfessorsClient,private router:Router) { }

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
      "teacher":true,
      "admin":false
    }
    this.professorClient.createNewProf(data)
    console.log("created user");
    this.router.navigate(["responsable-view/gestion-view/professors-view/visualize-prof"]);
    
    
  }

}

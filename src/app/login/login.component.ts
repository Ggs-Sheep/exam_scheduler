import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import fetch from 'node-fetch';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!:FormGroup;


  constructor(private authenticationService:AuthenticationService,private http:HttpClient) { 
    
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    });
    
    
    
  }

  public onSubmit(){
    this.authenticationService.login(
      this.loginForm.get('username')!.value,
      this.loginForm!.get('password')!.value
    )
  }

 

}

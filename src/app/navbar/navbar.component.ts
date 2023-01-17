import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user: any;
  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit(): void {

    this.user = JSON.parse(sessionStorage.getItem('user')!);
    console.log(this.user);
    
    if(this.user == null){return;}

    
    
    
    
  }

  public logout(){
    this.authenticationService.logout();
  }

}

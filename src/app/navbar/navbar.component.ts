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

    var token = this.authenticationService.getToken();
    
    if(token == null){return;}

    this.user = JSON.parse(window.atob(token.split('.')[1]));
    //console.log(this.user.isAdmin);
    console.log(this.user.isProf);
    
    
  }

  public logout(){
    this.authenticationService.logout();
  }

}

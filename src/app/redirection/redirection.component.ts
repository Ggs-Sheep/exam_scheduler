import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserInterface } from '../types/user.interface';

@Component({
  selector: 'app-redirection',
  templateUrl: './redirection.component.html',
  styleUrls: ['./redirection.component.css']
})
export class RedirectionComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }

}

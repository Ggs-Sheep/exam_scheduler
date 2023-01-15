import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-professors-view',
  templateUrl: './professors-view.component.html',
  styleUrls: ['../subviews-style.css']
})
export class ProfessorsViewComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(["responsable-view/gestion-view/professors-view/visualize-prof"]);
  }

}

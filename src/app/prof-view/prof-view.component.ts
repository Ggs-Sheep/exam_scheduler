import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prof-view',
  templateUrl: './prof-view.component.html',
  styleUrls: ['./prof-view.component.css']
})
export class ProfViewComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(["prof-view/calendar-view"])
  }

}

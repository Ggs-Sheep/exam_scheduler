import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-responsable-view',
  templateUrl: './responsable-view.component.html',
  styleUrls: ['./responsable-view.component.css']
})
export class ResponsableViewComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(["responsable-view/calendar-view"]);
  }

}

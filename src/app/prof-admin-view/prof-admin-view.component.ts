import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prof-admin-view',
  templateUrl: './prof-admin-view.component.html',
  styleUrls: ['./prof-admin-view.component.css']
})
export class ProfAdminViewComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(["prof-view/administratif-view/my-absence"])
  }

}

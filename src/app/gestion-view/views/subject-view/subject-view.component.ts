import { Component, OnInit } from '@angular/core';
import { SubjectClient } from 'src/app/clients/subject.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['../subviews-style.css'] //Pour ne pas avoir de multiples css avec les mêmes paramètres
})
export class SubjectViewComponent implements OnInit {

  constructor(private subjectClient:SubjectClient,private router:Router) { 

  }

  ngOnInit(): void {
    this.subjectClient.refreshSubjectsData();
    //console.log(this.subjectClient.getAllSubjectsData());
    
    this.router.navigate(["responsable-view/gestion-view/subject-view/visualize-subject"]);
  }

  

  

}

import { Component, OnInit } from '@angular/core';
import { SubjectClient } from 'src/app/clients/subject.client';
@Component({
  selector: 'app-subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['../subviews-style.css'] //Pour ne pas avoir de multiples css avec les mêmes paramètres
})
export class SubjectViewComponent implements OnInit {

  constructor(private subjectClient:SubjectClient) { 

  }

  ngOnInit(): void {
    console.log(this.subjectClient.getAllSubjectsData())
  }

}

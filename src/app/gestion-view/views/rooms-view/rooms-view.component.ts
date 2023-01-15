import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rooms-view',
  templateUrl: './rooms-view.component.html',
  styleUrls: ['../subviews-style.css']
})
export class RoomsViewComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(["responsable-view/gestion-view/rooms-view/visualize-room"]);
  }

}

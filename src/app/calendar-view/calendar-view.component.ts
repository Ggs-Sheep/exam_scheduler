import { Component, OnInit } from '@angular/core';
import { SessionsClient } from '../clients/sessions.client';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  public data:any[] = []
  public userData:any[] = []
  constructor(
    private sessionClient:SessionsClient
  ) { }

  async ngOnInit(): Promise<void> {
    this.sessionClient.refreshSessionsData();
    this.data = await this.sessionClient.getAllSessionsData();
    console.log(this.data)
    /*
    var user:any = JSON.parse(sessionStorage.getItem('user')!);

    var request = await this.sessionClient.getSessionsByUserId(user.id)
    var text = await request.text();
    this.userData = JSON.parse(text);
    console.log(this.userData)
    */
  }

  public timeToDate(str:string):Date{
    var dateObj = new Date(str)
    return dateObj;
  }

  public getMonthText(str:string):string{
    var n = this.timeToDate(str).getUTCMonth();
    var dico = ['JAN','FEV','MAR','AVR','MAI','JUN','JUI','AOU','SEP','OCT','NOV','DEC']
    return dico[n-1]
  }

}

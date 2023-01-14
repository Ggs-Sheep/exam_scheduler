import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectInterface } from '../types/subject.interface';
import { of,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectClient {

  subjects : SubjectInterface[] = 
    [
        {
            "id":0,
            "name":"Mathématiques",
            "classes":["Mathématiques,SVT"]  
        },
        {
            "id":1,
            "name":"Français Approfondit",
            "classes":["Français"]
        }
    ]

  constructor(private http: HttpClient) {}

  private getObservableData(): Observable<SubjectInterface[]> {
    //Pas oublier de subscribe au retour car de type observable
    //return this.http.get(environment.apiUrl + '/SubjectData');
    return of(this.subjects); //debug purposes
  }

  public getAllSubjectsData() : SubjectInterface | null{
    this.getObservableData().subscribe(val=>{
      console.log(val);
      return val;
    });
    return null;
  }

  getSubjectData(askedId:number) : SubjectInterface | null{
    this.subjects.forEach((sub) =>{
      if(sub.id == askedId){
        return sub;
      }
      return null;
    })
    return null;
  }
}
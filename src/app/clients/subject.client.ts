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
          "classesId":[0]  
      },
      {
          "id":1,
          "name":"Français Approfondit",
          "classesId":[1]
      }
  ]

  private data : SubjectInterface[] = [];


  constructor(private http: HttpClient) {}

  private getObservableData(): Observable<any> {
    //Pas oublier de subscribe au retour car de type observable
    //return this.http.get(environment.apiUrl + '/SubjectData');
    return of(this.subjects); //debug purposes
  }

  //This function returns all data stored in observable as an array of SubjectInterfaces
  public getAllSubjectsData() : SubjectInterface[] | null{
    /*
    let output:SubjectInterface[] = [];
    this.getObservableData().subscribe((val:SubjectInterface[])=>{output = val}).unsubscribe();
    return output;
    */
    //console.log("getting data");
    return this.data;
  }

  public refreshSubjectsData(){
    let output:SubjectInterface[] = [];
    this.getObservableData().subscribe((val:SubjectInterface[])=>{output = val}).unsubscribe();
    this.data=output;
  }

 

  //This function returns data from the subject you are asking for (w/ id)
  getSubjectData(askedId:number) : SubjectInterface | null{
    let output:SubjectInterface | null= null;
    
    this.data.forEach((sub) =>{
      if(sub.id == askedId){
        
        output = sub;
      }
    })
    return output;
    
 
  }
}
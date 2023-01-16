import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassInterface } from '../types/class.interface';
import { of,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassesClient {

  subjects : ClassInterface[] = 
  [
      {
          "id":0,
          "name":"SVT",
      },
      {
          "id":1,
          "name":"Littéraire",
      }
  ]

  private data : ClassInterface[] = [];


  constructor(private http: HttpClient) {}

  private getObservableData(): Observable<any> {
    //Pas oublier de subscribe au retour car de type observable
    //return this.http.get(environment.apiUrl + '/SubjectData');
    return of(this.subjects); //debug purposes
  }

  //This function returns all data stored in observable as an array of SubjectInterfaces
  public getAllClassesData() : ClassInterface[] | null{
    /*
    let output:SubjectInterface[] = [];
    this.getObservableData().subscribe((val:SubjectInterface[])=>{output = val}).unsubscribe();
    return output;
    */
    //console.log("getting data");
    return this.data;
  }

  public refreshClassesData(){
    let output:ClassInterface[] = [];
    this.getObservableData().subscribe((val:ClassInterface[])=>{output = val}).unsubscribe();
    this.data=output;
  }

 

  //This function returns data from the subject you are asking for (w/ id)
  getClassData(askedId:number) : ClassInterface | null{
    let output:ClassInterface | null= null;
    
    this.data.forEach((sub) =>{
      if(sub.id == askedId){
        output = sub;
      }
    })
    return output;
    
 
  }
}
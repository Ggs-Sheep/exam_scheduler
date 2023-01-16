import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentInterface } from '../types/student.interface';
import { of,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsClient {

  subjects : StudentInterface[] = 
  [
      {
          "id":0,
          "familyname":"Sanchez",
          "name":"Pedro",
          "classId":0
      },
      {
          "id":1,
          "familyname":"Ben Couchoud",
          "name":"Maurice",
          "classId":1
      }
  ]

  private data : StudentInterface[] = [];


  constructor(private http: HttpClient) {}

  private getObservableData(): Observable<any> {
    //Pas oublier de subscribe au retour car de type observable
    //return this.http.get(environment.apiUrl + '/SubjectData');
    return of(this.subjects); //debug purposes
  }

  //This function returns all data stored in observable as an array of SubjectInterfaces
  public getAllStudentsData() : StudentInterface[] | null{
    /*
    let output:SubjectInterface[] = [];
    this.getObservableData().subscribe((val:SubjectInterface[])=>{output = val}).unsubscribe();
    return output;
    */
    //console.log("getting data");
    return this.data;
  }

  public refreshStudentsData(){
    let output:StudentInterface[] = [];
    this.getObservableData().subscribe((val:StudentInterface[])=>{output = val}).unsubscribe();
    this.data=output;
  }

 

  //This function returns data from the subject you are asking for (w/ id)
  getStudentData(askedId:number) : StudentInterface | null{
    let output:StudentInterface | null= null;
    
    this.data.forEach((sub) =>{
      if(sub.id == askedId){
        output = sub;
      }
    })
    return output;
    
 
  }
}
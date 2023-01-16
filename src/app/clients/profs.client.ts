import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfessorInterface } from '../types/professor.interface';
import { of,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfessorsClient {

  subjects : ProfessorInterface[] = 
  [
      {
          "id":0,
          "familyname":"Lafraise",
          "name":"Adrien",
          "indispoIds":[]
      },
      {
          "id":1,
          "familyname":"Montabert",
          "name":"Anne",
          "indispoIds":[]
      }
  ]

  private data : ProfessorInterface[] = [];


  constructor(private http: HttpClient) {}

  private getObservableData(): Observable<any> {
    //Pas oublier de subscribe au retour car de type observable
    //return this.http.get(environment.apiUrl + '/SubjectData');
    return of(this.subjects); //debug purposes
  }

  //This function returns all data stored in observable as an array of SubjectInterfaces
  public getAllProfsData() : ProfessorInterface[] | null{
    /*
    let output:SubjectInterface[] = [];
    this.getObservableData().subscribe((val:SubjectInterface[])=>{output = val}).unsubscribe();
    return output;
    */
    //console.log("getting data");
    return this.data;
  }

  public refreshProfsData(){
    let output:ProfessorInterface[] = [];
    this.getObservableData().subscribe((val:ProfessorInterface[])=>{output = val}).unsubscribe();
    this.data=output;
  }

 

  //This function returns data from the subject you are asking for (w/ id)
  getProfData(askedId:number) : ProfessorInterface | null{
    let output:ProfessorInterface | null= null;
    
    this.data.forEach((sub) =>{
      if(sub.id == askedId){
        output = sub;
      }
    })
    return output;
    
 
  }
}
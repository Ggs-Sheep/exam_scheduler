import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectInterface } from '../types/subject.interface';
import { of,Observable } from 'rxjs';
import { ApiHttpService } from '../services/apihttp.service';

@Injectable({
  providedIn: 'root',
})
export class SubjectClient {
  /*
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
  */
  private data : SubjectInterface[] = [];


  constructor(private http: HttpClient,private apiServices:ApiHttpService) {}

  private async getObservableData(): Promise<Observable<any>> {
    var request = this.apiServices.get('/subject')
    var toObs = {"user":(await request).data}
    return of(JSON.stringify(toObs)); //debug purposes
  }

  //This function returns all data stored in observable as an array of SubjectInterfaces
  public async getAllSubjectsData() : Promise<SubjectInterface[] | null>{
    
    let output:SubjectInterface[] = [];
    (await this.getObservableData()).subscribe((val:SubjectInterface[])=>{output = val}).unsubscribe();
    console.log("getting data");
    return output;
    
    
    
  }

  public async refreshSubjectsData(){
    let output:SubjectInterface[] = [];
    (await this.getObservableData()).subscribe((val:SubjectInterface[])=>{output = val}).unsubscribe();
    this.data=output;
  }

 

  //This function returns data from the subject you are asking for (w/ id)
  public getSubjectData(askedId:number) : SubjectInterface | null{
    let output:SubjectInterface | null= null;
    
    this.data.forEach((sub) =>{
      if(sub.id == askedId){
        
        output = sub;
      }
    })
    return output;
    
 
  }

  public createNewSubject(name:string){
    //requête de création
    this.apiServices.post('/subject',{"name":name},{'Access-Control-Allow-Origin': '*',"Access-Control-Allow-Headers":"*",'Accept':'*/*','User-Agent':'PostmanRuntime/7.28.4'})
    console.log("succeffuly created "+name);
  }

  public modifySubject(id:number,name:string){
    //requête de création
    this.apiServices.post('/subject/'+id,{"name":name})
    console.log("successfully modified "+name);
  }
}
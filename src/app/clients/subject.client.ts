import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectInterface } from '../types/subject.interface';
import { of,Observable } from 'rxjs';
import { ApiHttpService } from '../services/apihttp.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubjectClient {
  
  private data : SubjectInterface[] = [];


  constructor(private apiServices:ApiHttpService) {}

  private async getObservableData(): Promise<Response> {
    var resp = await this.apiServices.get('/subject/')
    //var text = await resp.clone().text();
    //console.log('calling getObservableData() : result : '+text)
    return resp; //debug purposes
  }

  public getData():SubjectInterface[]{
    return this.data;
  }

  //This function returns all data stored in observable as an array of SubjectInterfaces
  public async getAllSubjectsData() : Promise<SubjectInterface[]>{
    await this.refreshSubjectsData()
    
    return this.data;
    
    
    
  }

  public async refreshSubjectsData():Promise<void>{
    let output:SubjectInterface[] = [];
    var resp = await this.getObservableData()!;
    var text = await resp.text();
    var decodedData = JSON.parse(text);
    output = <SubjectInterface[]>decodedData;
    this.data=output;
  }

 

  //This function returns data from the subject you are asking for (w/ id)
  public getSubjectData(askedId:number) : SubjectInterface | null{
    let output:SubjectInterface[] = [];
    
    this.data.forEach((sub:SubjectInterface) =>{
      
      if(sub.id == askedId!){
        
        output.push(sub);
      }
    })
    return output[0];
    
 
  }

  public async createNewSubject(name:string){
    //requête de création
    var data = await this.apiServices.post('/subject/',{"name":name})
    console.log("tryed creating "+name);
    console.log(JSON.parse(await data.text()))
    
  }

  public async modifySubject(id:number,name:string){
    //requête de création
    var data = await this.apiServices.put('/subject/'+id,{"name":name})
    console.log("tryed modifying "+name);
    console.log(JSON.parse(await data.text()))
    this.refreshSubjectsData();
  }

  public async deleteSubject(id:number){
    //requête de création
    var data = await this.apiServices.delete('/subject/'+id)
    console.log("tryed deleting");
    console.log(JSON.parse(await data.text()))
    this.refreshSubjectsData();
  }
}
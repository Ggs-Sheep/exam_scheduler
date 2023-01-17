import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfessorInterface } from '../types/professor.interface';
import { of,Observable } from 'rxjs';
import { ApiHttpService } from '../services/apihttp.service';

@Injectable({
  providedIn: 'root',
})
export class ProfessorsClient {

  private data : ProfessorInterface[] = [];


  constructor(private apiServices:ApiHttpService) {}

  private async getObservableData(): Promise<Response> {
    var resp = await this.apiServices.get('/user/teacher')
    var text = await resp.clone().text();
    console.log('calling getObservableData() : result : '+text)
    return resp; //debug purposes
  }

  //This function returns all data stored in observable as an array of SubjectInterfaces
  public async getAllProfsData() : Promise<ProfessorInterface[]>{
    await this.refreshProfsData()
    
    return this.data;
    
    
    
  }

  public async refreshProfsData():Promise<void>{
    let output:ProfessorInterface[] = [];
    var resp = await this.getObservableData()!;
    var text = await resp.text();
    var decodedData = JSON.parse(text);
    output = <ProfessorInterface[]>decodedData;
    this.data=output;
  }

 

  //This function returns data from the subject you are asking for (w/ id)
  public getProfData(askedId:number) : ProfessorInterface | null{
    let output:ProfessorInterface[] = [];
    
    this.data.forEach((sub:ProfessorInterface) =>{
      
      if(sub.id == askedId!){
        
        output.push(sub);
      }
    })
    return output[0];
    
 
  }

  public async createNewProf(data: any){
    //utilise la requête register.
    var resp = await this.apiServices.post('/register',data)
    console.log("tryed creating "+data.name);
    console.log(JSON.parse(await resp.text()))
    
  }

  public async modifyProf(id:number,data:any){
    //requête de création
    var resp = await this.apiServices.put('/user/'+id,data)
    console.log("tryed modifying "+data.last_name + " "+data.first_name);
    console.log(JSON.parse(await resp.text()))
    this.refreshProfsData();
  }

  public async deleteProf(id:number){
    //requête de création
    var data = await this.apiServices.delete('/user/'+id)
    console.log("tryed deleting");
    console.log(JSON.parse(await data.text()))
    this.refreshProfsData();
  }
}
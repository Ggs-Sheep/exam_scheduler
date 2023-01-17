import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentInterface } from '../types/student.interface';
import { of,Observable } from 'rxjs';
import { ApiHttpService } from '../services/apihttp.service';
import { UnavailableClient } from './unavailable.client';
import { UnavailableInterface } from '../types/unavailable.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentsClient {

  private data : StudentInterface[] = [];


  constructor(private apiServices:ApiHttpService,private unavailableClient:UnavailableClient) {}

  private async getObservableData(): Promise<Response> {
    var resp = await this.apiServices.get('/user/student')
    var text = await resp.clone().text();
    console.log('calling getObservableData() : result : '+text)
    return resp; //debug purposes
  }

  //This function returns all data stored in observable as an array of SubjectInterfaces
  public async getAllStudentsData() : Promise<StudentInterface[]>{
    await this.refreshStudentsData()
    
    return this.data;
  }

  public async refreshStudentsData():Promise<void>{
    let output:StudentInterface[] = [];
    var resp = await this.getObservableData()!;
    var text = await resp.text();
    var decodedData = JSON.parse(text);
    output = <StudentInterface[]>decodedData;
    this.data=output;
  }

 

  //This function returns data from the subject you are asking for (w/ id)
  getStudentData(askedId:number) : StudentInterface | null{
    let output:StudentInterface[]=[];
    
    this.data.forEach((sub) =>{
      if(sub.id == askedId){
        output.push(sub);
      }
    })
    return output[0];
    
 
  }

  public async createNewStudent(data: any){
    //utilise la requête register.
    var resp = await this.apiServices.post('/register',data)
    console.log("tryed creating "+data.name);
    console.log(JSON.parse(await resp.text()))
    
  }

  public async modifyStudent(id:number,data:any){
    //requête de création
    var resp = await this.apiServices.put('/user/'+id,data)
    console.log("tryed modifying "+data.last_name + " "+data.first_name);
    console.log(JSON.parse(await resp.text()))
    this.refreshStudentsData();
  }

  public async deleteSubject(id:number){
    //on cherche d'abord à supprimer tous les unavailables liés à cet user
    var myUnavailables:UnavailableInterface[] = await this.unavailableClient.getUserUnavailableData(id);
    //on les supprime
    myUnavailables.forEach((sub:UnavailableInterface)=>{
      console.log('deleting unavailable '+sub.id);
      this.unavailableClient.deleteUnavailable(sub.id);
    })
    //requête de suppression
    var data = await this.apiServices.delete('/user/'+id)
    console.log("tryed deleting");
    console.log(JSON.parse(await data.text()))
    this.refreshStudentsData();
  }
}
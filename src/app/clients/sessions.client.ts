
import { Injectable } from '@angular/core';
import { ApiHttpService } from '../services/apihttp.service';

@Injectable({
  providedIn: 'root',
})
export class SessionsClient {


  public data : any[] = [];


  constructor(private apiServices:ApiHttpService) {}

  private async getObservableData(): Promise<Response> {
    var resp = await this.apiServices.get('/session')
    //var text = await resp.clone().text();
    //console.log('calling getObservableData() : result : '+text)
    return resp; //debug purposes
  }

  public async getSessionsByUserId(id:number): Promise<Response> {
    var resp = await this.apiServices.get('/session/user/'+id)
    //var text = await resp.clone().text();
    //console.log('calling getObservableData() : result : '+text)
    return resp; //debug purposes
  }

  //This function returns all data stored in observable as an array of SubjectInterfaces
  public async getAllSessionsData() : Promise<any[]>{
    await this.refreshSessionsData()
    
    return this.data;

  }

  public async postExamJSON(data:any){
    var request = await this.apiServices.post('/planning/generate',data)
    var text = request.text();
    //console.log(text);
  }

  public getData():any[]{
    return this.data;
  }

  public async refreshSessionsData():Promise<void>{
    let output:any[] = [];
    var resp = await this.getObservableData()!;
    var text = await resp.text();
    var decodedData = JSON.parse(text);
    output = <any[]>decodedData;
    this.data=output;
    //console.log(this.data);
  }

 

  //This function returns data from the subject you are asking for (w/ id)
  getSessionData(askedId:number): any | null{
    let output:any[] = [];
    
    this.data.forEach((sub:any) =>{
      
      if(sub.id == askedId!){
        
        output.push(sub);
      }
    })
    return output[0];
    
 
  }

  
}
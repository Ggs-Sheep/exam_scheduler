
import { Injectable } from '@angular/core';
import { ClassInterface } from '../types/class.interface';

import { ApiHttpService } from '../services/apihttp.service';

@Injectable({
  providedIn: 'root',
})
export class ClassesClient {


  private data : ClassInterface[] = [];


  constructor(private apiServices:ApiHttpService) {}

  private async getObservableData(): Promise<Response> {
    var resp = await this.apiServices.get('/class')
    //var text = await resp.clone().text();
    //console.log('calling getObservableData() : result : '+text)
    return resp; //debug purposes
  }

  //This function returns all data stored in observable as an array of SubjectInterfaces
  public async getAllClassesData() : Promise<ClassInterface[]>{
    await this.refreshClassesData()
    
    return this.data;

  }

  public getData():ClassInterface[]{
    return this.data;
  }

  public async refreshClassesData():Promise<void>{
    let output:ClassInterface[] = [];
    var resp = await this.getObservableData()!;
    var text = await resp.text();
    var decodedData = JSON.parse(text);
    output = <ClassInterface[]>decodedData;
    this.data=output;
  }

 

  //This function returns data from the subject you are asking for (w/ id)
  getClassData(askedId:number): ClassInterface | null{
    let output:ClassInterface[] = [];
    
    this.data.forEach((sub:ClassInterface) =>{
      
      if(sub.id == askedId!){
        
        output.push(sub);
      }
    })
    return output[0];
    
 
  }

  public async createNewClass(name:string){
    //requête de création
    var data = await this.apiServices.post('/class/',{"name":name})
    console.log("tryed creating "+name);
    console.log(JSON.parse(await data.text()))
    
  }

  public async modifyClass(id:number,name:string){
    //requête de création
    var data = await this.apiServices.put('/class/'+id,{"name":name})
    console.log("tryed modifying "+name);
    console.log(JSON.parse(await data.text()))
    this.refreshClassesData();
  }

  public async deleteClass(id:number){
    //requête de création
    var data = await this.apiServices.delete('/class/'+id)
    console.log("tryed deleting");
    console.log(JSON.parse(await data.text()))
    this.refreshClassesData();
  }
}
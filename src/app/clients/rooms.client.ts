import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomInterface } from '../types/room.interface';
import { of,Observable } from 'rxjs';
import { ApiHttpService } from '../services/apihttp.service';

@Injectable({
  providedIn: 'root',
})
export class RoomsClient {



  private data : RoomInterface[] = [];


  constructor(private apiServices:ApiHttpService) {}

  private async getObservableData(): Promise<Response> {
    var resp = await this.apiServices.get('/room/')
    //var text = await resp.clone().text();
    //console.log('calling getObservableData() : result : '+text)
    return resp; //debug purposes
  }

  //This function returns all data stored in observable as an array of SubjectInterfaces
  public async getAllRoomsData() : Promise<RoomInterface[]>{
    await this.refreshRoomsData()
    
    return this.data;

  }

  public getData():RoomInterface[]{
    return this.data;
  }

  public async refreshRoomsData():Promise<void>{
    let output:RoomInterface[] = [];
    var resp = await this.getObservableData()!;
    var text = await resp.text();
    var decodedData = JSON.parse(text);
    output = <RoomInterface[]>decodedData;
    this.data=output;
  }

 

  //This function returns data from the subject you are asking for (w/ id)
  public getRoomData(askedId:number) : RoomInterface | null{
    let output:RoomInterface[] = [];
    
    this.data.forEach((sub:RoomInterface) =>{
      
      if(sub.id == askedId!){
        
        output.push(sub);
      }
    })
    return output[0];
    
 
  }

  public async createNewRoom(name:string,capacity:number){
    //requête de création
    var data = await this.apiServices.post('/room/',{"name":name,"capacity":capacity})
    console.log("tryed creating "+name);
    console.log(JSON.parse(await data.text()))
    
  }

  public async modifySubject(id:number,name:string,capacity:number){
    //requête de création
    var data = await this.apiServices.put('/room/'+id,{"name":name,"capacity":capacity})
    console.log("tryed modifying "+name);
    console.log(JSON.parse(await data.text()))
    this.refreshRoomsData();
  }

  public async deleteSubject(id:number){
    //requête de création
    var data = await this.apiServices.delete('/room/'+id)
    console.log("tryed deleting");
    console.log(JSON.parse(await data.text()))
    this.refreshRoomsData();
  }
}
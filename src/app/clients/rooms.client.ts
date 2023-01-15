import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomInterface } from '../types/room.interface';
import { of,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomsClient {

  subjects : RoomInterface[] = 
  [
      {
          "id":0,
          "name":"Condorcet",
          "capacity":130,
          "isAvalable":false,
      },
      {
          "id":1,
          "name":"Cauchy",
          "capacity":60,
          "isAvalable":true,
      }
  ]

  private data : RoomInterface[] = [];


  constructor(private http: HttpClient) {}

  private getObservableData(): Observable<any> {
    //Pas oublier de subscribe au retour car de type observable
    //return this.http.get(environment.apiUrl + '/SubjectData');
    return of(this.subjects); //debug purposes
  }

  //This function returns all data stored in observable as an array of SubjectInterfaces
  public getAllRoomsData() : RoomInterface[] | null{
    /*
    let output:SubjectInterface[] = [];
    this.getObservableData().subscribe((val:SubjectInterface[])=>{output = val}).unsubscribe();
    return output;
    */
    //console.log("getting data");
    return this.data;
  }

  public refreshRoomsData(){
    let output:RoomInterface[] = [];
    this.getObservableData().subscribe((val:RoomInterface[])=>{output = val}).unsubscribe();
    this.data=output;
  }

 

  //This function returns data from the subject you are asking for (w/ id)
  public getRoomData(askedId:number) : RoomInterface | null{
    let output:RoomInterface | null= null;
    
    this.data.forEach((sub) =>{
      if(sub.id == askedId){
        output = sub;
      }
    })
    return output;
    
 
  }

  public getAvailableRooms():RoomInterface[]{
    var output:RoomInterface[] = [];
    console.log(this.getAllRoomsData());
    this.getAllRoomsData()!.forEach((room:RoomInterface)=>{
      if(room.isAvalable == false){
        
        output.push(room);
      }
    })
    return output;
  }
}
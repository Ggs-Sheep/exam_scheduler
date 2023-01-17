
import { Injectable } from '@angular/core';
import { UnavailableInterface } from '../types/unavailable.interface';
import { ApiHttpService } from '../services/apihttp.service';
import { TimeslotInterface } from '../types/timeslot.interface';
import { TimeslotsClient } from './timeslot.client';
import { UserInterface } from '../types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UnavailableClient {


    private alldata : UnavailableInterface[] = [];
    private teachdata : UnavailableInterface[] = [];

    constructor(private apiServices:ApiHttpService,private timeslotsClient:TimeslotsClient) {}

    private async getObservableData(): Promise<Response> {
        var resp = await this.apiServices.get('/unavailable')
        var text = await resp.clone().text();
        console.log('calling getObservableData() : result : '+text)
        return resp; //debug purposes
    }

    //This function returns all data stored in observable as an array of SubjectInterfaces
    public async getAllUnavailablesData() : Promise<UnavailableInterface[]>{
        await this.refreshUnavailablesData();
        
        return this.alldata;
        
        
        
    }

    public async refreshUnavailablesData():Promise<void>{
        let output:UnavailableInterface[] = [];
        var resp = await this.getObservableData()!;
        var text = await resp.text();
        var decodedData = JSON.parse(text);
        output = <UnavailableInterface[]>decodedData;
        this.alldata=output;
    }

    

    //This function returns data from the subject you are asking for (w/ id)
    public getUnavailableData(askedId:number): UnavailableInterface | null{
        let output:UnavailableInterface[] = [];
        
        this.alldata.forEach((sub:UnavailableInterface) =>{
        
        if(sub.id == askedId!){
            
            output.push(sub);
        }
        })
        return output[0];
        
    
    }

    public async getUserUnavailableData(userId:number):Promise<UnavailableInterface[]>{
        await this.refreshUnavailablesData();
        let output:UnavailableInterface[] = [];
        
        this.alldata.forEach((sub:any) =>{
            
            if(sub.teacher.id == userId){
                
                output.push(sub);
            }
        })
        console.log(output);
        return output;

    }

    public getTimeslotOfUnavailable(askedId:number) : TimeslotInterface | null{
        var resp = this.timeslotsClient.getTimeslotData(this.getUnavailableData(askedId)!.unavailability!)
        return resp;
    }

    //logique de création fait appel à la création d'un timeslot
    public async createNewUnavailable(teacher:number,unavailability:number){
        //requête de création
        var data = await this.apiServices.post('/unavailable/',{"teacher":teacher,"unavailability":unavailability})
        console.log("tryed creating "+name);
        console.log(JSON.parse(await data.text()))
        
    }
    /*
    public async modifyUnavailable(id:number,start:Date,end:Date){
        //requête de création
        var data = await this.apiServices.put('/unavalable/'+id,{"name":name})
        console.log("tryed modifying "+name);
        console.log(JSON.parse(await data.text()))
        this.refreshUnavailablesData();
    }
    */
    public async deleteUnavailable(id:number){
        console.log(id);
        //requête de création
        var data = await this.apiServices.delete('/unavailable/'+id)
        console.log("tryed deleting");
        console.log(JSON.parse(await data.text()))
        this.refreshUnavailablesData();
    }
}
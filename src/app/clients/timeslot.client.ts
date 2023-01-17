
import { Injectable } from '@angular/core';
import { TimeslotInterface } from '../types/timeslot.interface';
import { ApiHttpService } from '../services/apihttp.service';

@Injectable({
  providedIn: 'root',
})
export class TimeslotsClient {


    private data : TimeslotInterface[] = [];
    

    constructor(private apiServices:ApiHttpService) {}

    private async getObservableData(): Promise<Response> {
        var resp = await this.apiServices.get('/timeslot')
        //var text = await resp.clone().text();
        //console.log('calling getObservableData() : result : '+text)
        return resp; //debug purposes
    }

    //This function returns all data stored in observable as an array of SubjectInterfaces
    public async getAllTimeslotsData() : Promise<TimeslotInterface[]>{
        await this.refreshTimeslotsData()
        
        return this.data;
        
        
        
    }

    public async refreshTimeslotsData():Promise<void>{
        let output:TimeslotInterface[] = [];
        var resp = await this.getObservableData()!;
        var text = await resp.text();
        var decodedData = JSON.parse(text);
        output = <TimeslotInterface[]>decodedData;
        this.data=output;
    }

    

    //This function returns data from the subject you are asking for (w/ id)
    public getTimeslotData(askedId:any): TimeslotInterface | null{
        
        let output:TimeslotInterface[] = [];
        
        this.data.forEach((sub:TimeslotInterface) =>{
            
        if(sub.id == askedId.id!){
            
            output.push(sub);
        }
        })

        
        
        return output[0];
        
    
    }

    //logique de création fait appel à la création d'un timeslot
    public async createNewTimeslot(start:string,end:string):Promise<TimeslotInterface>{
        //requête de création
        var resp = await this.apiServices.post('/timeslot/',{"start_date":start,"end_date":end})
        var data = JSON.parse(await resp.text());
        console.log(data);
        return data;
    }

    public dateFormat(str:string):string{
        var dateObject = new Date(str);    
        var formated = dateObject.toLocaleDateString()
        return formated;
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
}
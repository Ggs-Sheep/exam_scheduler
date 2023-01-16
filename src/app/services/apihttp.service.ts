// Angular Modules 
import { Injectable } from '@angular/core'; 
import axios, { AxiosResponse } from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiHttpService { 
    constructor( 
    // Angular Modules 
    ) { } 
    public get(url: string):Promise<AxiosResponse<any>> { 
        const resp =  axios.get('https://examschedulerapi.clarenceclaux.fr'+url);
        console.log(resp);
        return resp; 
    } 
    public async post(url: string, data: any):Promise<AxiosResponse<any>>  { 
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: data,
            url:'https://examschedulerapi.clarenceclaux.fr'+url,
        };
        var resp = axios(options);
        
        //console.log((await resp).data);
        return resp;
    } 

    
    /*
    public put(url: string, data: any, options?: any) { 
    return this.http.put(url, data, options); 
    } 
    public delete(url: string, options?: any) { 
    return this.http.delete(url, options); 
    } 
    */
}
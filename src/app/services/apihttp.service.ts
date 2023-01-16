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
        const resp =  axios.get(environment.apiUrl+url);
        console.log(resp);
        return resp; 
    } 
    public async post(url: string, data: any):Promise<AxiosResponse<any>>  { 
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: data,
            url:environment.apiUrl+url,
        };
        var resp = axios(options);
        //const resp = await axios.post( headers: { 'content-type': 'application/x-www-form-urlencoded' },environment.apiUrl + url,data);
        console.log((await resp).data);
        return (await resp).data;
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
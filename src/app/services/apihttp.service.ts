// Angular Modules 
import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ApiHttpService { 
    constructor( 
    // Angular Modules 
    private _http:HttpClient
    ) { } 
    public async get(url: string):Promise<Response> { 
        //console.log('Trying to get');
        const options = {
            method: 'GET',
            headers: 
            {   'Authorization':'Bearer '+sessionStorage.getItem('token'),
                'content-type': 'application/json' ,
            },
            
        };
        var resp = await fetch('http://examschedulerapi-env.eba-4uj6tzx8.eu-west-1.elasticbeanstalk.com'+url!,options)
        return resp; 
    } 
    public async post(url: string, data: any):Promise<Response> { 
        console.log('Trying to post');
        const options = {
            method: 'POST',
            headers: 
            {
                'Authorization':'Bearer '+sessionStorage.getItem('token'),
                'content-type': 'application/json' ,
            },
            body: JSON.stringify(data)
        };
        var resp = await fetch('http://examschedulerapi-env.eba-4uj6tzx8.eu-west-1.elasticbeanstalk.com'+url,options)
        
        //console.log((await resp).data);
        return resp;
    } 

    public async postNoHeader(url: string, data: any):Promise<Response>  { 
        const options = {
            method: 'POST',
            headers: 
            { 
               
                'content-type': 'application/json' ,
            },
            body: JSON.stringify(data)
        };
        //var resp = axios(options);
        //var resp:Observable<any> = of('');
        
        var resp = await fetch('http://examschedulerapi-env.eba-4uj6tzx8.eu-west-1.elasticbeanstalk.com'+url,options)
        
        //console.log(resp);
        return resp;
    } 

    public async put(url: string, data: any):Promise<Response> { 
        console.log('Trying to put');
        const options = {
            method: 'PUT',
            headers: 
            {
                'Authorization':'Bearer '+sessionStorage.getItem('token'),
                'content-type': 'application/json' ,
            },
            body: JSON.stringify(data)
        };
        var resp = await fetch('http://examschedulerapi-env.eba-4uj6tzx8.eu-west-1.elasticbeanstalk.com'+url,options)
        
        //console.log((await resp).data);
        return resp;
    } 

    public async delete(url: string):Promise<Response> { 
        //console.log('Trying to get');
        const options = {
            method: 'DELETE',
            headers: 
            {   'Authorization':'Bearer '+sessionStorage.getItem('token'),
                'content-type': 'application/json' ,
            },
            
        };
        var resp = await fetch('http://examschedulerapi-env.eba-4uj6tzx8.eu-west-1.elasticbeanstalk.com'+url,options)
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
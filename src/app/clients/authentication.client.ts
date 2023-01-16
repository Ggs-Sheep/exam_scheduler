import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of,Observable } from 'rxjs';
import { UserInterface } from '../types/user.interface'
import { ApiHttpService } from '../services/apihttp.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
    /*
    //Uniquement pour débug
    users : UserInterface[] = 
    [
        {
            "id":0,
            "name":"jason",
            "familyname":"mongeain",
            "isProf":false,
            "isAdmin":false,
            "username":"jason",
            "password":"jason"
        },
        {
            "id":1,
            "name":"admin",
            "familyname":"admin",
            "isProf":false,
            "isAdmin":true,
            "username":"admin",
            "password":"admin"
        }
    ]
    */

    constructor(private apiServices:ApiHttpService) {}

    public async login(username: string, password: string): Promise<Observable<string>> {
        
        //FOR DEBUG PURPOSE ONLY
        /*
        if(this.searchForUser(this.users,username,password)){
            console.log("Connected successfully !");
            return of("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwidXNlcm5hbWUiOiJhZG1pbiIsImlzQWRtaW4iOmZhbHNlLCJpc1Byb2YiOmZhbHNlfQ.msPv1yhQqhc5rAVFi3LrQtNr0uEWDzii2uc4SwRQ0LI");
        }else{
            console.log("User not found !");
            return of('');
        }
        */
        var request = this.apiServices.post('/authenticate',{'email':username,'password':password});
        //console.log((await request)?.data);
        var toObs = {"user":(await request)?.data.user,"token":(await request)?.data.token}
        //console.log(toObs);
        
        return of(JSON.stringify(toObs));
       

        
    }

    


    
    

  
}
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of,Observable } from 'rxjs';
import {UserInterface} from '../types/user.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
    
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


    constructor(private http: HttpClient) {}

    public login(username: string, password: string): Observable<string> {
        
        //FOR DEBUG PURPOSE ONLY
        if(this.searchForUser(this.users,username,password)){
            console.log("Connected successfully !");
            return of("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwidXNlcm5hbWUiOiJhZG1pbiIsImlzQWRtaW4iOmZhbHNlLCJpc1Byb2YiOnRydWV9.MezmLIiHM3xZmVXnWuUyqxrV3u5kU7hmBCB6BAcvtxg");
        }else{
            console.log("User not found !");
            return of('');
        }

        /*
        return this.http.post(
        environment.apiUrl + '/user/login',
        {
            username: username,
            password: password,
        },
        { responseType: 'text' }
        );
        */
        
       

        
    }

    private searchForUser(dataset:UserInterface[],username: string, password:string):boolean{
        for(var user of dataset){
            if(user.username == username && user.password == password){
                return true;
            }
        }
        return false;
    }

  
}
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';
import { UserInterface } from '../types/user.interface';
import { ApiHttpService } from '../services/apihttp.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey='token';
  private userKey='user';
  private user:any = {
    'id':-1,
    'email':'',
    'familyname':'',
    'isAdmin':false,
    'isProf':false,
    'name':'',
    'classroom':1
  }


  constructor(
    private authentificationClient : AuthenticationClient,
    private router: Router,
    private apiServices:ApiHttpService
  ) { }

  public async login(username: string,password: string): Promise<void>{
    var data = await this.apiServices.postNoHeader('/authenticate',{'email':username,'password':password});
    var text = await data.text();
    var decodedData = JSON.parse(text);
    
    sessionStorage.setItem(this.tokenKey,decodedData.token);
    
    //logique de redirection
    
    this.user.email = decodedData.user.email;
    this.user.id = decodedData.user.id;
    this.user.familyname = decodedData.user.last_name;
    this.user.name = decodedData.user.first_name;
    this.user.isAdmin = decodedData.user.admin;
    this.user.isProf = decodedData.user.teacher;
    //this.user.classroom = decodedData.user.classroom;
    console.log(this.user);

    sessionStorage.setItem(this.userKey,JSON.stringify(this.user));
    console.log('pitié');
    console.log("token "+sessionStorage.getItem('token'));
    console.log("user "+sessionStorage.getItem('user'));

    if(this.user != null){
      //console.log(this.user);
      if(this.user.isAdmin){
        this.router.navigate(['/responsable-view']);
      }else if(this.user.isProf){
        this.router.navigate(['/prof-view']);
      }else{
        this.router.navigate(['/student-view']);
      }
      
    }else{
      this.logout();
    }
  };
  

  public logout(){
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    console.log('Logged out.')
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = sessionStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? sessionStorage.getItem(this.tokenKey) : null;
  }

  

}

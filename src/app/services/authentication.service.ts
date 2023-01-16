import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';
import { UserInterface } from '../types/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey='token';
  private userKey='user';
  private user:UserInterface = {
    'id':-1,
    'email':'',
    'familyname':'',
    'isAdmin':false,
    'isProf':false,
    'name':''
  }


  constructor(
    private authentificationClient : AuthenticationClient,
    private router: Router
  ) { }

  public async login(username: string,password: string): Promise<void>{
    (await this.authentificationClient.login(username, password)).subscribe((data)=>{
      var decodedData = JSON.parse(data);
      console.log(decodedData.user);
      localStorage.setItem(this.tokenKey,decodedData.token);
      
      //logique de redirection
      
      this.user.email = decodedData.user.email;
      this.user.id = decodedData.user.id;
      this.user.familyname = decodedData.user.last_name;
      this.user.name = decodedData.user.first_name;
      this.user.isAdmin = decodedData.user.admin;
      this.user.isProf = decodedData.user.teacher;

      localStorage.setItem(this.userKey,JSON.stringify(this.user));

      if(this.user != null){
        console.log(this.user);
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
    });
  }

  public logout(){
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    console.log('Logged out.')
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

  

}

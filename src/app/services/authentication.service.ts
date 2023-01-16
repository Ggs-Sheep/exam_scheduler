import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey='token';


  constructor(
    private authentificationClient : AuthenticationClient,
    private router: Router
  ) { }

  public async login(username: string,password: string): Promise<void>{
    (await this.authentificationClient.login(username, password)).subscribe((token)=>{
      console.log(token);
      localStorage.setItem(this.tokenKey,token);
      //logique de redirection
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      if(decodedJWT != null){
        if(decodedJWT.isAdmin){
          this.router.navigate(['/responsable-view']);
        }else if(decodedJWT.isProf){
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

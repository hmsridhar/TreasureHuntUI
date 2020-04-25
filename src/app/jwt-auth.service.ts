import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({providedIn: 'root'})
export class JWTAuthService{

    constructor(private jwtHelperService: JwtHelperService){}

    public isAuthenticated():boolean{
        const token = JSON.parse(localStorage.getItem("Data")).token;
        console.log(this.jwtHelperService.isTokenExpired(token));
        return !this.jwtHelperService.isTokenExpired(token);
    }
}
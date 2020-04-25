import { JWTAuthService } from '../jwt-auth.service';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({providedIn:'root'})
export class AuthGuardService implements CanActivate {
  constructor(public auth: JWTAuthService, public router: Router) {}
  
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
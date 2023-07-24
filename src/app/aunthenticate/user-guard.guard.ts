import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {} from './../app-routing.module'

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
constructor(
  private cookieService:CookieService,
  private router:Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.cookieService.get('token')
    if(!token){
      this.router.navigate(['/login_usuario']);
      return false;
    }else{
      return true;
    }
      
  }
  
}

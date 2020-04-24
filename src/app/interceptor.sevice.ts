import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class InterceptorService implements HttpInterceptor{

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('Intercepting'+JSON.stringify(request));
        const currentUser = JSON.parse(localStorage.getItem('Data'));
        if (currentUser && currentUser.token) {
          request = request.clone({
            setHeaders: {
              // 'Content-Type': 'application/json',
              Authorization: `${currentUser.token}`
            }
          });
        }
    
        return next.handle(request);
      }
    
    
}
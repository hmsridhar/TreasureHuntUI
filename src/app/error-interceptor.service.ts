
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BackendServices } from './backend-services';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ErrorInterceptorService implements HttpInterceptor{
    constructor(private backendService: BackendServices){} 

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                alert('Invalid Credentials')
                this.backendService.logout();
                // location.reload(true);
            }
            
            const error = err.error.message || err.statusText;
            if(error!=null){
                return throwError(error);
            }
        }))
    }
}

// @Injectable()
// export class ErrorInterceptorService implements HttpInterceptor {
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     // request = request.clone({
//     //   setHeaders: {
//     //     Authorization: 'test'
//     //   }
//     // });
//     return next.handle(request);
//   }
// }
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetails } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Clone the request to add the new header.
    const headersConfig: any = {};

    if (req.url != `${environment.baseUrl}auth/login`) {
      let userDetails: UserDetails = this.authService.getUserDetails();
      headersConfig['authorization'] = userDetails.token;
      
    }
    const authReq = req.clone({
      setHeaders: headersConfig
    })

    //send the newly created request
    return next.handle(authReq).pipe(map((event: any) => {

      /**
       * storing token on login
       */
      if (req.url == `${environment.baseUrl}auth/login`) {
        this.authService.updateUserDetails({...req.body, ...event.body});
      }
      return event;
    }));
  }
}

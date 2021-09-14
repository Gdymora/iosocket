import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenticated()) {
            req = req.clone({
                setHeaders: {
                    Authorization: this.auth.token
                }
            })
        }

        return next.handle(req)
            .pipe(
                catchError(error => {
                    if (error.status === 401) {
                        this.auth.logout()
                        this.router.navigate(['/auth' ])
                    }
                    return throwError(error)
                })
            )
    }
}
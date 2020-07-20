import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenerateTokenVimboService } from '../services/generate-token-vimbo.service';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
    constructor(
        private _generateTokenVimboService: GenerateTokenVimboService
    ) {}

    /**
     * Intercept
     * @param req
     * @param next
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Server
        if (typeof window === 'undefined') {
            return next.handle(req);
        }
        
        let _token = req;
        if (this.hasToken()) {
            _token = this.getAuthRequest(req);
        } else {
            _token = this.getVimboToken(req);
        }
        return next.handle(_token);
    }

    /**
     * Check Token
     */
    hasToken(): boolean {
        return (
            typeof window !== 'undefined' &&
            window.localStorage.getItem('vimbo_token') !== null
        );
    }

    /**
     * Get the token (JWT)
     * @param req
     */
    getAuthRequest(req: HttpRequest<any>): any {
        return req.clone({
            setHeaders: {
                Authorization:
                    'Bearer ' + window.localStorage.getItem('vimbo_token')
            }
        });
    }

    /**
     * Vimbo Token
     * @param req
     */
    getVimboToken(req: HttpRequest<any>): any {
        return req.clone({
            setHeaders: {
                'vimbo-token': this._generateTokenVimboService.generate()
            }
        });
    }
}

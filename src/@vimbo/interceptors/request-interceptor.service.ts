/*
 * Request Interceptor Service
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 14/03/2020 09:56
 */

import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

// Core Vimbo
import { EncryptDecryptRequestService } from '@vimbo/services/encrypt-decrypt-request.service';

// Auxiliary files
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {
    constructor(private _eDRService: EncryptDecryptRequestService) {}

    /**
     * Intercept Request
     *
     * Any necessary manipulation before
     * sending data to the APIs
     *
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
        
        // add necessary transformations here ⤵⤵
        // - encrypt
        const encryptRequest = this.encryptRequisition(req);

        // return here ⤵⤵
        return next.handle(encryptRequest);
    }

    /**
     * Encrypt Requisition
     * @param req
     */
    encryptRequisition(req: HttpRequest<any>): any {
        // apply some production
        // if(!environment.production) {
        //     return req;
        // }

        // Check URL
        if (!this._eDRService.checkIfTheUrlIsAllowed(req.url)) {
            return req;
        }

        // if (req.method === 'GET') {
        //     return req;
        // }

        return req.clone({
            // body: { 'e-t-e-enc': this._eDRService.enc(req.body) }
            body: req.body
        });
    }
}

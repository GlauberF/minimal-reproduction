/*
 * Response Interceptor Service
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
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Core Vimbo
import { EncryptDecryptRequestService } from '@vimbo/services/encrypt-decrypt-request.service';

@Injectable({
    providedIn: 'root'
})
export class ResponseInterceptorService implements HttpInterceptor {
    constructor(private _eDRService: EncryptDecryptRequestService) {}

    /**
     * Intercept Response
     *
     * any manipulation needed for the response
     * of the APIs
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
        
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // add necessary transformations here ⤵⤵
                    // - decrypt
                    const decrypted = this.decryptResponse(event as any);

                    // return here ⤵⤵
                    return decrypted;
                }
            })
        );
    }

    /**
     * Decrypt Response
     * @param event
     */
    decryptResponse(event: HttpResponse<any>): any {
        // Decrypt HTTP
        if (event.body && event.body['e-t-e-enc']) {
            return event.clone({
                body: {
                    ...JSON.parse(this._eDRService.dec(event.body['e-t-e-enc']))
                }
            });
        }

        // Decrypt Graphql
        if (event.body && event.body.data && event.body.data['e-t-e-enc']) {
            return event.clone({
                body: {
                    data: {
                        ...this._eDRService.dec(event.body.data['e-t-e-enc'])
                    }
                }
            });
        }

        // Others
        return event;
    }
}

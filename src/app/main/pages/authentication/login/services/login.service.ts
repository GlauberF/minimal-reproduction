/*
 * @author Glauber Funez
 * @package Vimbo
 * Vimbo Tecnologia Ltda ME
 * Copyright (c) 2019.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Core Vimbo
import { GenerateTokenVimboService } from '@vimbo/services/generate-token-vimbo.service';

// Auxiliary files
import { environment } from '@env/environment';

// Module
import { LazyServiceModuleLogin } from './lazy-service.module';

@Injectable({
    providedIn: LazyServiceModuleLogin
})
export class LoginService {
    constructor(
        private _httpClient: HttpClient,
        private _generateTokenVimboService: GenerateTokenVimboService
    ) {}

    /**
     *  Call to api to login
     * @param data
     */
    send(data: { usu_email: string; usu_senha: string }): Promise<any> {
        if (!data) {
            return;
        }

        data = {
            ...data,
            usu_email: data.usu_email.toLowerCase()
        };

        return new Promise((resolve, reject) => {
            this._httpClient
                .post(environment.CoreAPIV1 + 'auth/login', data, {
                    headers: {
                        'vimbo-token': this._generateTokenVimboService.generate()
                    }
                })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}

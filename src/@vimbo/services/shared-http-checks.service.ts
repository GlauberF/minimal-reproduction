import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EncryptDecryptRc4Service } from './encrypt-decrypt-rc4.service';
import { StorageService } from './storage.service';
import { VirtualDOMService } from './virtual-dom.service';
import { GenerateTokenVimboService } from './generate-token-vimbo.service';
import { environment } from '@env/environment';

import { CallVimboNotificationService } from '@layoutComponent/content/services/call-vimbo-notification.service';

@Injectable({
    providedIn: 'root'
})
export class SharedHttpChecksService {
    httpOptionsVimboToken: {
        headers: HttpHeaders;
    };

    constructor(
        private _encryptDecryptRc4Service: EncryptDecryptRc4Service,
        private _storageService: StorageService,
        private _httpClient: HttpClient,
        private _virtualDOMService: VirtualDOMService,
        private _generateTokenVimboService: GenerateTokenVimboService,
        private _callVimboNotificationService: CallVimboNotificationService
    ) {}

    /**
     *
     * Check if cnpj or cpf already exists
     *
     * 1st use case: if you do not pass vimbo_token, it is understood that it
     * is being used internally, example in the verification of a registration
     * in person (collection People where emp_id)
     *
     * 2nd case: if you pass vimbo_token, it is understood that a cpf or cnpj
     * is being verified externally, example in the initial registration of
     * the platform, in the auth / register (collection Companies)
     *
     * @param CnpjCpf
     * @param useVimboToken
     * @constructor
     */
    CnpjCpfExistsInBD(CnpjCpf, useVimboToken: boolean = false): Promise<any> {
        return new Promise((resolve, reject) => {
            if (typeof window === 'undefined') {
                reject();
                return;
            }

            if (!CnpjCpf) {
                reject('inform the CNPJ or CPF');
                return;
            }

            // No token
            if (!useVimboToken) {
                this._httpClient
                    .get(
                        `${environment.CoreAPIV1}consultas/validar-cpf-cnpj?cpf-cnpj=${CnpjCpf}`
                    )
                    .subscribe((res: any) => {
                        if (!res) {
                            return;
                        }

                        resolve(res);
                    }, reject);
            }

            // use token
            if (useVimboToken) {
                // updated token set
                this.httpOptionsVimboToken = {
                    headers: new HttpHeaders({
                        'vimbo-token': this._generateTokenVimboService.generate()
                    })
                };

                this._httpClient
                    .get(
                        `${environment.CoreAPIV1}consultas/validar-cpf-cnpj?cpf-cnpj=${CnpjCpf}`,
                        this.httpOptionsVimboToken
                    )
                    .subscribe((res: any) => {
                        if (!res) {
                            return;
                        }

                        resolve(res);
                    }, reject);
            }
        });
    }

    /**
     * Checks if email already exists in database
     *
     * @param email
     * @param useVimboToken
     * @constructor
     */
    EmailExistsInBD(
        email: string,
        useVimboToken: boolean = false
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            if (typeof window === 'undefined') {
                reject();
                return;
            }

            // No token
            if (!useVimboToken) {
                this._httpClient
                    .get(
                        `${environment.CoreAPIV1}consultas/validar-email/${email}`
                    )
                    .subscribe((res: any) => {
                        if (!res) {
                            return;
                        }

                        resolve(res);
                    }, reject);
            }

            // Use token
            if (useVimboToken) {
                // updated token set
                this.httpOptionsVimboToken = {
                    headers: new HttpHeaders({
                        'vimbo-token': this._generateTokenVimboService.generate()
                    })
                };

                this._httpClient
                    .get(
                        `${environment.CoreAPIV1}consultas/validar-email/${email}`,
                        this.httpOptionsVimboToken
                    )
                    .subscribe((res: any) => {
                        if (!res) {
                            return;
                        }

                        resolve(res);
                    }, reject);
            }
        });
    }

    /**
     *
     * @param crudField
     * @param showMessage
     * @param text
     * @param image
     * @constructor
     */
    InheritSettingsFromTheAccountant(
        crudField: string,
        showMessage: boolean = false,
        text: string = '',
        image?: string
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!crudField) {
                reject('the crud field was not informed');
                console.error('the crud field was not informed');
                return;
            }

            this._httpClient
                .get(`${environment.CoreAPIV1}consultas/configuracoes-contador`)
                .subscribe((res: any) => {
                    // No data in response
                    if (!res) {
                        return;
                    }

                    // Check if the crud field exists in response
                    if (res.hasOwnProperty(crudField)) {
                        // ForEach in keys of the object
                        Object.keys(res).forEach((key) => {
                            // Check if foreach is in the informed field of crud
                            if (key === crudField) {
                                // Check if the field is set to true
                                if (res[key]) {
                                    if (!showMessage) {
                                        resolve(res[key]);
                                    }

                                    // show notification / message

                                    // <div class="flex-1">
                                    // <img alt="image of accountant"
                                    // src="${image ? image : '/assets/images/modal/background_herdar_dados_contador.svg'}"
                                    //     [ngStyle]="{
                                    //     'max-width': '100%'
                                    //     'width': '150px',
                                    //         'position': 'fixed',
                                    //         'z-index': '100003',
                                    //         'margin-bottom': '0px',
                                    //         'bottom': '-16px',
                                    //         'left': 'none'
                                    // }">
                                    // </div>
                                    if (showMessage) {
                                        this._callVimboNotificationService.onNotification.next(
                                            [
                                                {
                                                    status: 'info',
                                                    message: `
                                                        <div fxFlex="100%" 
                                                            fxLayout="row" 
                                                            fxLayoutAlign="space-evenly center" 
                                                            class="vimbo-display-flex">

                                                            <!-- aqui img -->
                                                            
                                                            <div class="flex-2">
                                                                ${text}
                                                            </div>
                                                        </div>
                                                    `,
                                                    autoClose: true
                                                }
                                            ]
                                        );

                                        resolve(res[key]);
                                    }
                                } else {
                                    resolve(res[key]);
                                }
                            }
                        });
                    }
                }, reject);
        });
    }
}

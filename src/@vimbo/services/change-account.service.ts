import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { VirtualDOMService } from './virtual-dom.service';
import { StorageService } from './storage.service';
import { environment } from '@env/environment';
import { StorageConfigBusinessService } from './storage-config-business.service';

@Injectable({
    providedIn: 'root'
})
export class ChangeAccountService {
    private virtualDOM: any;

    constructor(
        private _httpClient: HttpClient,
        private _virtualDOMService: VirtualDOMService,
        private _storageService: StorageService,
        private router: Router,
        private _storageConfigBusinessService: StorageConfigBusinessService
    ) {
        this.virtualDOM = this._virtualDOMService;
    }

    // tslint:disable-next-line:variable-name
    resolve(emp_id): any {
        return new Promise((resolve, reject) => {
            if (!emp_id) {
                reject();
                return;
            }

            /**
             * Lógica
             */
            const setAndContinued: any = (
                _httpClient,
                _storageService,
                _virtualDOMService
            ) => {
                _httpClient
                    .post(environment.CoreAPIV1 + 'auth/alterar-empresa', {
                        emp_id: emp_id
                    })
                    .subscribe((response: any) => {
                        if (response.erro) {
                            reject(response);
                        }

                        if (!response.erro) {
                            const userDate = {
                                nome: response.data.usu_nome,
                                sobrenome: response.data.usu_sobrenome,
                                empresa: response.data.emp_nome,
                                foto: response.data.usu_foto,
                                email: response.data.usu_email,
                                id: response.data._id,
                                admEmp: response.data.usu_dono_empresa,
                                temParceiro: response.data.par_id_parceiro,
                                fazParteEmpId:
                                    response.data.tem_id_empresa['0']._id,
                                fazParteEmpDesc:
                                    response.data.tem_id_empresa['0']
                                        .tem_descricao,
                                empId: response.data.emp_id,
                                idioma: response.data.usu_linguagem,
                                empresas: response.data.empresas
                            };

                            const respostaToken = response.data.token;

                            _storageService.set.currentUser(
                                userDate,
                                'user',
                                false
                            );
                            _storageService.set.vbm(
                                response.data.modulos,
                                'user',
                                false
                            );
                            _storageService.set.vimbo_token(
                                respostaToken,
                                'user',
                                false
                            );
                            _storageService.set.language(
                                response.data.usu_linguagem,
                                'user',
                                false
                            );
                            _storageService.set.dynamic(
                                'sentry_vb',
                                { email: response.data.usu_email },
                                true,
                                false,
                                'user'
                            );

                            // To make it easier to find company settings, to check at
                            // certain times, let's save to storage
                            this._storageConfigBusinessService.setData(
                                response.data.emp_id,
                                null
                            );

                            /*_virtualDOMService.windowRef().setTimeout(() => {
								_virtualDOMService
									.windowRef()
									.location.reload();
							}, 1500);*/
                            console.log('response server change', response);

                            resolve(response);
                        }
                    }, reject);
            };

            /**
             * User is inside an issue, to avoid error, first redirects to home
             */
            if (
                this._virtualDOMService
                    .windowRef()
                    .location.href.indexOf('editar') !== -1 ||
                this._virtualDOMService
                    .windowRef()
                    .location.href.indexOf('edit') !== -1
            ) {
                this.router
                    .navigate(['/extended/dashboard/company'])
                    .then(() => {
                        this._virtualDOMService.windowRef().setTimeout(() => {
                            setAndContinued(
                                this._httpClient,
                                this._storageService,
                                this._virtualDOMService
                            );
                        }, 100);
                    });
            } else if (
                /**
                 * User is inside a new item, to avoid error,
                 * redirects first to home
                 */
                this._virtualDOMService
                    .windowRef()
                    .location.href.indexOf('novo') !== -1 ||
                this._virtualDOMService
                    .windowRef()
                    .location.href.indexOf('new') !== -1
            ) {
                this.router
                    .navigate(['/extended/dashboard/company'])
                    .then(() => {
                        this._virtualDOMService.windowRef().setTimeout(() => {
                            setAndContinued(
                                this._httpClient,
                                this._storageService,
                                this._virtualDOMService
                            );
                        }, 100);
                    });
            } else if (
                /**
                 * User is inside a detail on a specific item, to avoid error,
                 * redirects first to home
                 */
                this._virtualDOMService
                    .windowRef()
                    .location.href.indexOf('detalhe') !== -1 ||
                this._virtualDOMService
                    .windowRef()
                    .location.href.indexOf('detail') !== -1
            ) {
                this.router
                    .navigate(['/extended/dashboard/company'])
                    .then(() => {
                        this._virtualDOMService.windowRef().setTimeout(() => {
                            setAndContinued(
                                this._httpClient,
                                this._storageService,
                                this._virtualDOMService
                            );
                        }, 100);
                    });
            } else {
                /**
                 * Direct redirects without switching pages
                 */
                setAndContinued(
                    this._httpClient,
                    this._storageService,
                    this._virtualDOMService
                );
            }
        });
    }
}

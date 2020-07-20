/*
 * This file contains calls that are used in more than one
 * place and do not have a specific CRUD for it.
 *
 * @author Glauber Funez
 * @package Vimbo
 * Vimbo Tecnologia Ltda ME
 * Copyright (c) 2019.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Core Vimbo
import { GenerateTokenVimboService } from '@vimbo/services/generate-token-vimbo.service';
import { MaskTypesService } from '@vimbo/services/mask-types.service';

// Auxiliary file
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class OtherSharedApiService {
    constructor(
        private _httpClient: HttpClient,
        private _generateTokenVimboService: GenerateTokenVimboService,
        private _maskTypesService: MaskTypesService
    ) {}

    /**
     * CEP
     * @param data
     */
    getCep(data: { cep: string }): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!data && !data.cep) {
                reject('cep uninformed');
                return;
            }

            this._httpClient
                .get(`${environment.CoreAPIV1}consultas/cep?cep=${data.cep}`, {
                    headers: {
                        'vimbo-token': this._generateTokenVimboService.generate()
                    }
                })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get States
     * @param countryCode
     */
    getStates(countryCode = '01058'): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(
                    `${environment.CoreAPIV1}consultas/get-estados?pai_codigo=${countryCode}`,
                    {
                        headers: {
                            'vimbo-token': this._generateTokenVimboService.generate()
                        }
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get Cities
     * @param data
     */
    getCities(data: { state_code: string }): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!data && data.state_code) {
                reject('state_code uninformed');
                return;
            }

            this._httpClient
                .get(
                    `${environment.CoreAPIV1}consultas/get-cidades?est_codigo=${data.state_code}`,
                    {
                        headers: {
                            'vimbo-token': this._generateTokenVimboService.generate()
                        }
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get CPF/CNPJ
     * @param data
     */
    getCpfCnpj(data: { 'cpf-cnpj': string }): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!data && data['cpf-cnpj']) {
                reject('CPF or CNPJ uninformed');
                return;
            }

            // add delimiters
            data['cpf-cnpj'] = this._maskTypesService.addDelimitersCNPJOrCPF(
                data['cpf-cnpj']
            );

            this._httpClient
                .post(`${environment.CoreAPIV1}consultas/cpf-cnpj`, data, {
                    headers: {
                        'vimbo-token': this._generateTokenVimboService.generate()
                    }
                })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get Cities From UF Brazil and
     * possibility to filter by a city
     * @param uf
     * @param filterCity
     */
    async getCitiesFromUfBrazil(uf: string, filterCity?: string): Promise<any> {
        if (!uf) {
            console.warn('uf not informed');
            return;
        }

        const _uf = uf.toLocaleUpperCase();
        const _filterCity = filterCity;

        const states = await this.getStates()
            .then((res) => res)
            .catch((er) => console.error(er));
        if (!states) {
            console.warn('no state found');
            return;
        }

        const datafromUF = await states.filter((st) => st.est_sigla === _uf);
        if (!datafromUF || !datafromUF.length) {
            console.warn('no state matched the informed');
            return;
        }

        const cities = await this.getCities({
            state_code: datafromUF[0].est_codigo
        })
            .then((ct) => ct)
            .catch((er) => console.error(er));
        if (!cities) {
            console.warn('no cities found');
            return;
        }

        if (_filterCity) {
            return cities.filter((cit) => cit.cid_nome === _filterCity);
        } else {
            return cities;
        }
    }

    /**
     * Get Cities From ZipCode Brazil and
     * possibility to filter by a city
     * @param zipCode
     */
    async getCityFromZipCodeBrazil(zipCode: string): Promise<any> {
        if (!zipCode) {
            console.warn('zipCodef not informed');
            return;
        }

        const resultZipCode = await this.getCep({ cep: zipCode })
            .then((res) => res)
            .catch((er) => console.error(er));
        if (!resultZipCode) {
            console.warn('info for City not found');
            return;
        }

        const result = await this.getCitiesFromUfBrazil(
            resultZipCode.uf,
            resultZipCode.cidade
        )
            .then((res) => res)
            .catch((er) => console.error(er));
        if (!result) {
            console.warn('getCitiesFromUfBrazil not found');
            return;
        }

        if (Array.isArray(result) && result[0]) {
            result[0] = {
                ...result[0],
                ...resultZipCode
            };
        }

        return result;
    }

    /**
     * Get the data from a file through a url returning its
     * contents in a string
     * @param url
     */
    getContentFileURL(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!url) {
                reject('no valid url entered');
                return;
            }

            this._httpClient
                .post(
                    `${environment.CoreAPIV1}consultas/file-to-string`,
                    { url },
                    {
                        headers: {
                            'vimbo-token': this._generateTokenVimboService.generate()
                        }
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Returns a timezone list
     */
    getTimezone(term?: string): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(`${environment.CoreAPIV1}consultas/listar-timezones`, {
                    headers: {
                        'vimbo-token': this._generateTokenVimboService.generate()
                    }
                })
                .subscribe((response: any) => {
                    if (typeof term !== 'string') {
                        return resolve(response);
                    }

                    resolve(
                        response.filter(
                            (zone) =>
                                zone
                                    .toLowerCase()
                                    .indexOf(term.toLowerCase()) === 0
                        )
                    );
                }, reject);
        });
    }

    /**
     * Consult Barcode
     * @param code
     */
    consultBarcode(code: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!code) {
                reject('Barcode uninformed');
                return;
            }

            this._httpClient
                .get(
                    `${environment.CoreAPIV1}consultas/codigo-barras/${code}`,
                    {
                        headers: {
                            'vimbo-token': this._generateTokenVimboService.generate()
                        }
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Consult usu-acc-ext
     * @param code
     */
    consultUsuAccExt(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(`${environment.CoreAPIV1}usuarios/usu-acc-ext`, {
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

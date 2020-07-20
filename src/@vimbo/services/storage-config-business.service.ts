import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AES, CryptoEncUTF8 } from 'crypto-js';

import { EncryptDecryptRc4Service } from './encrypt-decrypt-rc4.service';
import { StorageService } from './storage.service';
import { VirtualDOMService } from './virtual-dom.service';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class StorageConfigBusinessService {
    constructor(
        private _encryptDecryptRc4Service: EncryptDecryptRc4Service,
        private _storageService: StorageService,
        private _httpClient: HttpClient,
        private _virtualDOMService: VirtualDOMService
    ) {}

    /**
     * Saves storage to company settings
     * avoiding http, to check some settings on the front
     * @param empId
     * @param reload
     */
    setData(empId: string = null, reload = false): Promise<any> {
        return new Promise((resolve, reject) => {
            if (typeof window === 'undefined') {
                reject();
                return;
            }

            let _empId = empId;

            if (!_empId) {
                _empId = this._storageService.get.user().empId;
            }

            this._httpClient
                .get(`${environment.CoreAPIV1}empresas/buscar?_id=${_empId}`)
                .subscribe((res: any) => {
                    if (!res) {
                        return;
                    }

                    if (res.erro) {
                        reject(res.mensagem);
                        return;
                    }

                    // sensitive data, do not store
                    res.emp_senha_cer = null;
                    res.emp_senha_ser = null;
                    res.emp_senha_smtp = null;

                    // Encrypt data
                    const encrypt = AES.encrypt(JSON.stringify(res), 'vimbo');

                    // Set LocalStorage
                    this._virtualDOMService
                        .windowRef()
                        .localStorage.setItem('config_emp', encrypt);

                    // If reload true
                    if (reload) {
                        this._virtualDOMService.windowRef().location.reload();
                    }

                    resolve(res);
                }, reject);
        });
    }

    /**
     * Get storage with enterprise settings
     */
    getData(): any {
        if (typeof window === 'undefined') {
            return;
        }

        // Get Storage
        const DataStorage = this._virtualDOMService
            .windowRef()
            .localStorage.getItem('config_emp');

        // has no dataStorage, call the function responsible for writing
        // this information and get in then () the result of the request
        // that would be the same thing that would be in storage
        if (!DataStorage) {
            return this.setData()
                .then((res) => {
                    return res;
                })
                .catch((er) => console.error(er));
        }

        // has dataStorage, so decrypt and return data
        if (DataStorage) {
            // const DecryptDataStorage = DataStorage ? AES.decrypt(DataStorage, 'vimbo') : null;
            // return DecryptDataStorage ? JSON.parse(DecryptDataStorage.toString(CryptoEncUTF8)) : null;
            return JSON.parse(
                AES.decrypt(DataStorage, 'vimbo').toString(CryptoEncUTF8)
            );
        }
    }

    /**
     * Delete storage with company settings
     */
    deleteData(): void {
        if (typeof window === 'undefined') {
            return;
        }

        return this._virtualDOMService
            .windowRef()
            .localStorage.removeItem('config_emp');
    }
}

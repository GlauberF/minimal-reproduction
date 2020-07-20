import { Injectable } from '@angular/core';
import { EncryptDecryptRc4Service } from './encrypt-decrypt-rc4.service';

@Injectable({
    providedIn: 'root'
})
export class GetStorageService {
    /////////////////////////////////////////////////
    // ATENTION
    // discontinued, use the StorageService
    ////////////////////////////////////////////////

    public usuario: any;

    constructor(_encryptDecryptRc4Service: EncryptDecryptRc4Service) {
        if (
            typeof window !== 'undefined' &&
            window.localStorage.getItem('currentUser')
        ) {
            this.usuario = JSON.parse(
                _encryptDecryptRc4Service.Decrypt(
                    window.localStorage.getItem('currentUser')
                )
            );
        }
    }

    getUser(): any {
        console.warn(`
            ---------------------------------------------------------------------------------------
            |  This service has been discontinued, use service storage.service.ts (StorageService) |
            ---------------------------------------------------------------------------------------
        `);
        return this.usuario;
    }
}

import { Injectable } from '@angular/core';
import RC4 from 'rc4-ts';

// declare var RC4: any;

@Injectable({
    providedIn: 'root'
})
export class EncryptDecryptRc4Service {
    private _encryptKey: string;

    constructor() {
        this._encryptKey = 'vimbo';
    }

    /**
     * Encrypt by RC4
     * @param dado
     * @constructor
     */
    Encrypt(dado): any {
        return new RC4(this._encryptKey).encrypt(dado);
    }

    /**
     * Decrypt by RC4
     * @param dado
     * @constructor
     */
    Decrypt(dado): any {
        return new RC4(this._encryptKey).decrypt(dado);
    }
}

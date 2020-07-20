/*
 * Encrypt and Decrypt Request Service
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 14/03/2020 10:23
 */

import { Injectable } from '@angular/core';
import { AES, CryptoEncBase64, CryptoEncHex, CryptoEncUTF8 } from 'crypto-js';
// Auxiliary files
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class EncryptDecryptRequestService {
    constructor() {}

    private _allowedPartialUrl: string[] = ['vimbo.com.br'];

    private _CryptoJSAesJson = {
        stringify: (cipherParams) => {
            const vbJsonString = {
                ct: cipherParams.ciphertext.toString(CryptoEncBase64)
            };
            if (cipherParams.iv) {
                vbJsonString['iv'] = cipherParams.iv.toString();
            }
            if (cipherParams.salt) {
                vbJsonString['s'] = cipherParams.salt.toString();
            }
            return JSON.stringify(vbJsonString);
        },
        parse: (jsonStr) => {
            const vbJsonParse = JSON.parse(jsonStr);
            // const cipherParams = lib.CipherParams.create({
            //     ciphertext: CryptoEncBase64.parse(vbJsonParse.ct)
            // });
            const cipherParams = new Object({
                ciphertext: (CryptoEncBase64 as any).parse(vbJsonParse.ct)
            });
            if (vbJsonParse.iv) {
                cipherParams['iv'] = (CryptoEncHex as any).parse(
                    vbJsonParse.iv
                );
            }
            if (vbJsonParse['s']) {
                cipherParams['salt'] = (CryptoEncHex as any).parse(
                    vbJsonParse.s
                );
            }
            return cipherParams;
        }
    };

    /**
     * Encrypt
     * @param content
     */
    enc(content: any): string {
        return (AES as any)
            .encrypt(JSON.stringify(content), this._pw(), {
                format: this._CryptoJSAesJson
            })
            .toString();
    }

    /**
     * Decrypt
     * @param content
     */
    dec(content: string): any {
        return JSON.parse(
            (AES as any)
                .decrypt(content, this._pw(), { format: this._CryptoJSAesJson })
                .toString(CryptoEncUTF8)
        );
    }

    /**
     * Remaining PW
     */
    private _remainingPW(): string {
        try {
            // 2020-03-14T13:42:51.955Z
            const _date = new Date().toJSON();
            // ["2020-03-14", "13:43:01.684Z"]
            const _dateSplit = _date.split('T');
            // 2020-03-14 -> 2020#03#14
            return _dateSplit[0].replace(new RegExp('-', 'gmi'), '#');
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * PW
     * @private
     */
    private _pw(): any {
        return `${
            environment.endToEndEncryptionPartialKey
        }#${this._remainingPW()}`;
    }

    /**
     * Check If The Url Is Allowed
     * @param url
     * @private
     */
    checkIfTheUrlIsAllowed(url: string): boolean {
        return url.indexOf('vimbo.com.br') !== -1;
    }
}

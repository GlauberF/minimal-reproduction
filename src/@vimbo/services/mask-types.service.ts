import { Injectable } from '@angular/core';
import { IConfig, initialConfig, MaskApplierService } from 'ngx-mask';

// Core Vimbo
import { VimboRegex } from '@vimbo/utils/regex';
import { VimboCheckDataTypes } from '../utils/check-data-types';

// Mask and types interface
export interface MaskTypes {
    [k: string]: MaskTypesItemsInterface;
}
// Mask configuration fields interface
export interface MaskTypesItemsInterface {
    mask: string;
    pattern?: any;
    symbol?: string;
    prefix?: string;
    suffix?: string;
    validation?: boolean;
    dropSpecialCharacters?: boolean;
    showMaskTyped?: boolean;
    clearIfNotMatch?: boolean;
    specialCharacters?: any;
    thousandSeparator?: string;
    hiddenInput?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class MaskTypesService {
    /**
     * Constructor
     */
    constructor() {
        this._init();
    }
    private _maskService: MaskApplierService;

    /**
     * Patterns Only Numbers
     */
    public onlyNumberPatterns = {
        0: {
            pattern: new RegExp('[0-9]', 'igm')
        },
        9: {
            pattern: new RegExp('[0-9]', 'igm')
        }
    };

    /**
     * Hack Init
     * created an init to put variables that you need to instantiate, but
     * you don't want to be declaring every time you call this service with
     * "new" in front
     * @private
     */
    private _init(): void {
        this._maskService = new MaskApplierService(initialConfig);
    }

    /**
     * definitions Mask Types
     * @constructor
     */
    definitions(): MaskTypes {
        return {
            cpf: {
                mask: '00.000.000-00',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            cnpj: {
                mask: '00.000.000/0000-00',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            rg: {
                mask: '00.000.000-A',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            date: {
                mask: '00/00/0000',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            'date-hour': {
                mask: '00/00/00 00:00:00',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            hour: {
                mask: '00:00',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            '24-hour': {
                mask: 'Hh:m0:s0',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            phone4BeforeHyphenBR: {
                mask: '+00 (000) 0000-0000',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            _switchPhone4BeforeHyphenBR: {
                mask: '+00 (000) 0000-00009',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            phone5BeforeHyphenBR: {
                mask: '+00 (000) 00000-0000',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            cep: {
                mask: '00000-000',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            'account-plan': {
                mask: '0.9.99.999.999',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            ncm: {
                mask: '0999.99.99',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            'car-plate': {
                mask: 'AAA-AAAA',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            cest: {
                mask: '00.000.00',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            cfop: {
                mask: '0.000',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            cnae: {
                mask: '0000-0/00',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            _switchCpfCnpj: {
                mask: '000.000.000-009',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            'nfe-key': {
                mask: '00000000000000000000000000000000000000000000',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            'phone-0800': {
                mask: '0000 000 0000',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            'ip': {
                mask: '000.000.000.000',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            'email': {
                mask: 'A*@A*.A*',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            'year': {
                mask: '0000',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: true,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            },
            none: {
                mask: '',
                pattern: null,
                symbol: null,
                prefix: '',
                suffix: '',
                validation: false,
                showMaskTyped: false,
                dropSpecialCharacters: false,
                clearIfNotMatch: false,
                specialCharacters: null,
                thousandSeparator: null,
                hiddenInput: false
            }
        };
    }

    /**
     * Mask Exist
     */
    maskExists(name: string): boolean {
        return !!this.definitions()[name];
    }

    /**
     * Mask Brazil Phone and 0800
     *
     * so as not to have to create two inputs, one with each mask for
     * Brazilian phones, we created the following logic to abstract
     * @param value
     */
    switchPhoneMaskBR(value): string {
        if (!value) {
            return 'none';
        }

        // 0800
        if (value.toString().replace(/\D/g, '').substring(0, 4) === '0800') {
            return 'phone-0800';
        }
        // tel +00 (000) 0000-0000
        else if (value.toString().replace(/\D/g, '').length <= 13) {
            return '_switchPhone4BeforeHyphenBR';
        }
        // tel +00 (000) 00000-0000
        else if (value.toString().replace(/\D/g, '').length > 13) {
            return 'phone5BeforeHyphenBR';
        }
    }

    /**
     * CPF and CNPJ
     *
     * so as not to have to create two inputs, one with cpf mask and one
     * for cnpj, we create a logic where we analyze the number of
     * characters and apply one of them
     * @param value
     */
    switchCpfCnpj(value): string {
        if (!value) {
            return 'none';
        }

        const _value = value.replace(/\D/g, '');

        return _value.toString().length <= 11 ? '_switchCpfCnpj' : 'cnpj';
    }

    /**
     * Add CNPJ delimiters
     * @param value
     */
    addDelimitersCNPJ(value: string): string {
        if (!value) {
            return;
        }

        return VimboRegex.format({ value: value, type: 'cnpj' });
    }

    /**
     * Add CPF delimiters
     * @param value
     */
    addDelimitersCPF(value: string): string {
        if (!value) {
            return;
        }

        return VimboRegex.format({ value: value, type: 'cpf' });
    }

    /**
     * Add CPF Or CNPJ delimiters
     * @param value
     */
    addDelimitersCNPJOrCPF(value: string): string {
        if (!value) {
            return;
        }

        const _value = value.replace(/\D/g, '');

        // CPF
        if (_value.length <= 11) {
            return this.addDelimitersCPF(_value);
        }

        // CNPJ
        else {
            return this.addDelimitersCNPJ(_value);
        }
    }

    /**
     * Apply mask via service call
     * @param value
     * @param maskName
     * @param maskString
     * @param fullMaskObject
     * @constructor
     */
    applierMaskService(
        value: string | number,
        maskName?: string,
        fullMaskObject?: MaskTypesItemsInterface,
        maskString?: string | [string, IConfig['patterns']]
    ): string | number {
        if (!value) {
            return '';
        }

        if (!maskName && !fullMaskObject && !maskString) {
            return value || '';
        }

        /**
         * Note: maskName is a priority, if you have maskName, maskString and config
         */

        /**
         * Mask name based on existing types
         */
        if (maskName) {
            const _mask = this.definitions()[maskName];

            if (typeof _mask.mask === 'string') {
                return this._maskService.applyMask(`${value}`, _mask.mask);
            }

            return this._maskService.applyMaskWithPattern(
                `${value}`,
                _mask.pattern
            );
        }

        /**
         * The mask based on the existing types, taking all its
         * settings and passing it along
         */
        if (fullMaskObject) {
            if (VimboCheckDataTypes.check(fullMaskObject).isObject) {
                if (fullMaskObject.thousandSeparator) {
                    this._maskService.thousandSeparator =
                        fullMaskObject.thousandSeparator;
                }

                if (
                    fullMaskObject.mask &&
                    typeof fullMaskObject.mask === 'string'
                ) {
                    return this._maskService.applyMask(
                        `${value}`,
                        fullMaskObject.mask
                    );
                }

                if (fullMaskObject.pattern) {
                    return this._maskService.applyMaskWithPattern(
                        `${value}`,
                        fullMaskObject.pattern
                    );
                }
            }
        }

        /**
         * The mask itself
         */
        if (maskString) {
            if (typeof maskString === 'string') {
                return this._maskService.applyMask(`${value}`, maskString);
            }

            return this._maskService.applyMaskWithPattern(
                `${value}`,
                maskString
            );
        }

        return value;
    }
}

/*
 * Vimbo Regex
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 23/03/2020 20:31
 *
 * extra library: https://github.com/VerbalExpressions/JSVerbalExpressions
 * test online https://verbalregex.com/
 */

import * as verEx from 'verbal-expressions';

// Core Vimbo
import { VimboUtils } from './index';

/**
 * Interface
 */
export interface DefinitionsInterface {
    [k: string]: DefinitionsItemInterface;
}

export interface DefinitionsItemInterface {
    pattern?: RegExp | null;
    clear?: ((p: any) => string) | null;
    format?: ((p: any) => string) | null;
    test?: ((p: any) => { match: boolean; valid: boolean }) | null;
}

export class VimboRegex {
    /**
     * Clear
     * @param data
     */
    public static clear(data: { value: any; type: string }): string {
        // The type exists
        if (!VimboRegex.exist(data.type)) {
            return data.value;
        }
        // The function exists
        if (!VimboRegex.definitions()[data.type].clear) {
            return data.value;
        }
        // Return value
        return VimboRegex.definitions()[data.type].clear(data.value);
    }

    /**
     * Format
     * @param data
     */
    public static format(data: { value: any; type: string }): string {
        // The type exists
        if (!VimboRegex.exist(data.type)) {
            return data.value;
        }
        // The function exists
        if (!VimboRegex.definitions()[data.type].format) {
            return data.value;
        }
        // Return value
        return VimboRegex.definitions()[data.type].format(data.value);
    }

    /**
     * Test
     * @param data
     */
    public static test(data: {
        value: any;
        type: string;
    }): { match: boolean; valid: boolean } {
        // The type exists
        if (!VimboRegex.exist(data.type)) {
            return data.value;
        }
        // The function exists
        if (!VimboRegex.definitions()[data.type].test) {
            return data.value;
        }
        // Return value
        return VimboRegex.definitions()[data.type].test(data.value);
    }

    /**
     * Pattern
     * @param type
     */
    public static pattern(type: string): RegExp {
        // The type exists
        if (!VimboRegex.exist(type)) {
            return;
        }
        // Return value
        return VimboRegex.definitions()[type].pattern;
    }

    /**
     * Build Dynamically
     * @param data
     * @param buildVerEx
     * @param whatToDo
     */
    public static buildDynamically(
        data: any,
        buildVerEx: any,
        whatToDo: 'format' | 'test'
    ): any {
        // The type exists
        if (!data) {
            return;
        }
        // verEx
        if (!buildVerEx) {
            console.warn('buildVerEx builder not informed');
            return;
        }
        // The type exists
        if (!whatToDo) {
            console.warn(
                'whatToDo variable not reported in vimboRegex\'s Dynamically build function'
            );
            return;
        }

        // The type is valid
        if (whatToDo !== 'format' && whatToDo !== 'test') {
            console.warn(
                `the ${whatToDo} value given in whatToDo, is not valid`
            );
            return;
        }

        // Mount
        const mountRegex = {
            build: () => {
                return buildVerEx as RegExp;
            },
            format: () => {
                return data.replace(mountRegex.build(), '');
            },
            test: () => {
                return {
                    match: mountRegex.build().test(data),
                    valid: true
                };
            }
        };

        // Return
        return mountRegex[whatToDo];
    }

    /**
     * Check Exist Type definition
     * @param type
     */
    public static exist(type: string): boolean {
        return !!VimboRegex.definitions()[type];
    }

    /**
     * Set Definitions
     */
    private static definitions(): DefinitionsInterface {
        return {
            // add necessary regex here, it must be an object,
            // following the defined interface (DefinitionsInterface) ⤵⤵
            'search': {
                clear: (data) => {
                    return data
                        ? data.replace(/[\.]|[\-]|[\/]|[\(]|[\)]/g, '')
                        : data;
                },
                format: null,
                test: null
            },
            'cpf': {
                clear: (data) => (data ? data.replace(/\D/g, '') : data),
                format: (data) => {
                    return data
                        ? VimboRegex.clear({
                              value: data,
                              type: 'cpf'
                          }).replace(
                              verEx()
                                  .startOfLine()
                                  .beginCapture()
                                  .digit()
                                  .repeatPrevious(3)
                                  .endCapture() // block 1
                                  .beginCapture()
                                  .digit()
                                  .repeatPrevious(3)
                                  .endCapture() // block 2
                                  .beginCapture()
                                  .digit()
                                  .repeatPrevious(3)
                                  .endCapture() // block 3
                                  .beginCapture()
                                  .digit()
                                  .repeatPrevious(2)
                                  .endCapture() // block 4
                                  .endOfLine(),
                              '$1.$2.$3-$4'
                          )
                        : data;
                },
                test: (data) => {
                    return {
                        match: data
                            ? verEx()
                                  .startOfLine()
                                  .range('0', '9')
                                  .repeatPrevious(3)
                                  .maybe('.') // 000.
                                  .range('0', '9')
                                  .repeatPrevious(3)
                                  .maybe('.') // 000.
                                  .range('0', '9')
                                  .repeatPrevious(3)
                                  .maybe('-') // 000-
                                  .range('0', '9')
                                  .repeatPrevious(2) // 00
                                  .test(data)
                            : false,
                        valid: VimboUtils.cpfIsValid(data)
                    };
                }
            },
            'cnpj': {
                clear: (data) => (data ? data.replace(/\D/g, '') : data),
                format: (data) => {
                    return data
                        ? VimboRegex.clear({
                              value: data,
                              type: 'cnpj'
                          }).replace(
                              verEx()
                                  .startOfLine()
                                  .beginCapture() // block 1
                                  .digit()
                                  .repeatPrevious(2)
                                  .endCapture()
                                  .beginCapture() // block 2
                                  .digit()
                                  .repeatPrevious(3)
                                  .endCapture()
                                  .beginCapture() // block 3
                                  .digit()
                                  .repeatPrevious(3)
                                  .endCapture()
                                  .beginCapture() // block 4
                                  .digit()
                                  .repeatPrevious(4)
                                  .endCapture()
                                  .beginCapture() // block 5
                                  .digit()
                                  .repeatPrevious(2)
                                  .endCapture()
                                  .endOfLine(),
                              '$1.$2.$3/$4-$5'
                          )
                        : data;
                },
                test: (data) => {
                    return {
                        match: data
                            ? verEx()
                                  .startOfLine()
                                  .range('0', '9') // 00.
                                  .repeatPrevious(2)
                                  .maybe('.')
                                  .range('0', '9') // 000.
                                  .repeatPrevious(3)
                                  .maybe('.')
                                  .range('0', '9') // 000/
                                  .repeatPrevious(3)
                                  .maybe('/')
                                  .range('0', '9') // 0000-
                                  .repeatPrevious(4)
                                  .maybe('-')
                                  .range('0', '9') // 00
                                  .repeatPrevious(2)
                                  .test(data)
                            : false,
                        valid: VimboUtils.CNPJIsValid(data)
                    };
                }
            },
            'cep': {
                clear: (data) => {
                    return data ? data.replace(/\D/g, '') : data;
                },
                format: null,
                test: null
            },
            'phone': {
                clear: (data) => {
                    return data ? data.replace(/\D/g, '') : data;
                },
                format: null,
                test: null
            },
            'email': {
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                clear: null,
                format: null,
                test: null
            },
            'html': {
                pattern: null,
                clear: (value) =>
                    value
                        ? value
                              .replace(/<\/?[^>]+(>|$)/g, '')
                              .replace(/\s\s+/g, ' ')
                              .replace(/&nbsp/g, '')
                        : value,
                format: null,
                test: null
            },
            'htmlNotImage': {
                pattern: null,
                clear: (value) =>
                    value
                        ? value
                              .replace(/(?!<img.*\/>)(<\/?[^>]+(>|$))/gm, '')
                              .replace(/\s\s+/g, ' ')
                              .replace(/&nbsp/g, '')
                        : value,
                format: null,
                test: null
            },
            'onlyNumber': {
                clear: (data) => (data ? data.replace(/\D/g, '') : data),
                format: (data) => (data ? data.replace(/\D/g, '') : data),
                test: null
            },
            'onlyLetters': {
                clear: (data) =>
                    data ? data.replace(/[^a-zA-Z]+/gi, '') : data,
                format: (data) =>
                    data ? data.replace(/[^a-zA-Z]+/gi, '') : data,
                test: null
            }
        };
    }
}

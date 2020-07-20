/*
 * Vimbo Check Data Types
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 25/03/2020 21:40
 */

export interface VimboCheckDataTypesInterface {
    typeof: string;
    constructor: () => any;
    isString: boolean;
    isNumber: boolean;
    isArray: boolean;
    isFunction: boolean;
    isObject: boolean;
    isNull: boolean;
    isUndefined: boolean;
    isBoolean: boolean;
    isRegExp: boolean;
    isError: boolean;
    isDate: boolean;
    isSymbol: boolean;
}

export class VimboCheckDataTypes {
    /**
     * Check
     * @param data
     */
    public static check(data: any): VimboCheckDataTypesInterface {
        return {
            typeof: data ? typeof data : '',
            constructor: data ? data.constructor : () => null,
            isString:
                (data && typeof data === 'string') || data instanceof String,
            isNumber: data && typeof data === 'number' && isFinite(data),
            isArray:
                data && typeof data === 'object' && data.constructor === Array,
            isFunction: data && typeof data === 'function',
            isObject: data && typeof data === 'object',
            // data && typeof data === 'object' && data.constructor === Object,
            isNull: data === null,
            isUndefined: typeof data === 'undefined',
            isBoolean: data && typeof data === 'boolean',
            isRegExp:
                data && typeof data === 'object' && data.constructor === RegExp,
            isError:
                data &&
                data instanceof Error &&
                typeof data.message !== 'undefined',
            isDate: data && data instanceof Date,
            isSymbol: data && typeof data === 'symbol'
        };
    }
}

import { clone, forEach, remove } from 'lodash';
import { ArrayArgumentsReplaceItems } from '@vimbo/types/utils-type';
import { VimboBeautify } from './vimbo-beautify';

export class VimboUtils {
    /**
     * Filter array by string
     *
     * @param mainArr
     * @param searchText
     * @returns {any}
     */
    public static filterArrayByString(mainArr, searchText): any {
        if (searchText === '') {
            return mainArr;
        }

        searchText = searchText.toLowerCase();

        return mainArr.filter((itemObj) => {
            return this.searchInObj(itemObj, searchText);
        });
    }

    /**
     * Search in object
     *
     * @param itemObj
     * @param searchText
     * @returns {boolean}
     */
    public static searchInObj(itemObj, searchText): boolean {
        for (const prop in itemObj) {
            if (!itemObj.hasOwnProperty(prop)) {
                continue;
            }

            const value = itemObj[prop];

            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            } else if (Array.isArray(value)) {
                if (this.searchInArray(value, searchText)) {
                    return true;
                }
            }

            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText)) {
                    return true;
                }
            }
        }
    }

    /**
     * Search in array
     *
     * @param arr
     * @param searchText
     * @returns {boolean}
     */
    public static searchInArray(arr, searchText): boolean {
        for (const value of arr) {
            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            }

            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText)) {
                    return true;
                }
            }
        }
    }

    /**
     * Search in string
     *
     * @param value
     * @param searchText
     * @returns {any}
     */
    public static searchInString(value, searchText): any {
        return value.toLowerCase().includes(searchText);
    }

    /**
     * Generate a unique GUID
     *
     * @returns {string}
     */
    public static generateGUID(): string {
        function S4(): string {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return S4() + S4();
    }

    /**
     * Toggle in array
     *
     * @param item
     * @param array
     */
    public static toggleInArray(item, array): void {
        if (array.indexOf(item) === -1) {
            array.push(item);
        } else {
            array.splice(array.indexOf(item), 1);
        }
    }

    /**
     * Add to array if value does not exist
     *
     * @param item
     * @param array
     */
    public static addInArray(item, array): void {
        if (array.indexOf(item) === -1) {
            array.push(item);
        }
    }

    /**
     * Handleize
     *
     * @param text
     * @returns {string}
     */
    public static handleize(text): string {
        return text
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    }

    /**
     * Slug
     *
     * @param text
     * @returns {string}
     */
    public static slug(text): string {
        return text
            .toString()
            .toLowerCase()
            .replace(/[àáâäå]/g, 'a') // convert to ascii "a"
            .replace(/[çĉ]/g, 'c') // convert to ascii "c"
            .replace(/[éèêë]/g, 'e') // convert to ascii "c"
            .replace(/ĝ/g, 'g') // convert to ascii "g"
            .replace(/ĥ/g, 'h') // convert to ascii "h"
            .replace(/[ïíîì]/g, 'i') // convert to ascii "i"
            .replace(/ĵ/g, 'j') // convert to ascii "j"
            .replace(/ñ/g, 'n') // convert to ascii "n"
            .replace(/[ôöõøöòó]/g, 'o') // convert to ascii "o"
            .replace(/[šŝ]/g, 's') // convert to ascii "s"
            .replace(/[üûùúŭû]/g, 'u') // convert to ascii "u"
            .replace(/[ýÿ]/g, 'u') // convert to ascii "y"
            .replace(/ž/g, 'z') // convert to ascii "z"
            .replace(/&[#A-zA-Z0-9]+;/gi, '') // remove HTML Entities
            .replace(/&/gi, ' and ') // replace standalone ampersands with the word and
            .replace(/\+/g, ' ') // replace all +'s with a space
            .replace(/[^A-Za-z0-9- ]+/gi, '') // remove all Non-AlphaNumeric Characters except for Spaces or Dashes
            .trim() // remove leading and trailing spaces
            .replace(/\s+/g, '-') // replace 1 or more spaces with a single -
            .replace(/-+/g, '-'); // replace 2 or more dashes with a single -
    }

    /**
     *
     * @param value
     * @returns {any}
     */
    public static returnsValueFromComplexVar(value: any): any {
        // Is boolean
        if (typeof value === 'boolean') {
            return value;
        }
        // Is Function
        else if (typeof value === 'function') {
            return value();
        }
        // Is promise
        else if (Promise.resolve(value) === value) {
            return value()
                .then((res) => res)
                .catch((er) => er);
        } else {
            return value;
        }
    }

    /**
     * recursive function to be used when searching for a
     * keyword in multi-level arrays
     * ex: array.filter(VimboUtils.containsDeep('search content'))
     * @param text
     */
    public static containsDeep = (text: string) => (value?: any): any => {
        if (!value) {
            return false;
        }

        const valueType = typeof value;

        if (valueType === 'string') {
            return value.toLowerCase().indexOf(text.toLowerCase()) > -1;
        }
        if (Array.isArray(value)) {
            return value.some(VimboUtils.containsDeep(text));
        }
        if (valueType === 'object') {
            return Object.values(value).some(VimboUtils.containsDeep(text));
        }
        return false;

        // tslint:disable-next-line
    };

    /**
     * Deep search on an array that can have one or more levels
     * @param array
     * @param text
     * @param field
     */
    public static searchDeepInArray(
        array: Array<any>,
        text: string,
        field: string
    ): any {
        if (!array || !text) {
            return;
        }

        return array.filter(this.containsDeep(text)).map((element) => {
            const idx = Object.keys(element).length
                ? Object.keys(element)[0]
                : null;

            if (!idx) {
                return element;
            }

            return Object.assign({}, element, {
                [idx]: element[idx].filter(
                    (subElement) =>
                        subElement[field]
                            .toLowerCase()
                            .indexOf(text.toLowerCase()) > -1
                )
            });
        });
    }

    /**
     * Function that does the initial treatments for percentage mask
     * In the database, we save the converted percentage, (value / 100)
     * To use and show the user, we made the transformation (value * 100)
     */
    public static transformPercentageBDtoUI(value: any): string {
        // not exist
        if (!value) {
            return parseFloat('0').toFixed(2);
        }
        // Is Null || Is undefined
        else if (value === null) {
            return parseFloat('0').toFixed(2);
        }
        // Is Undefined
        else if (typeof value === 'undefined') {
            return parseFloat('0').toFixed(2);
        }
        // Is Number
        else if (typeof value === 'number') {
            return parseFloat(String(value * 100)).toFixed(2);
        }
        // Is String
        else if (typeof value === 'string') {
            return parseFloat(String((value as any) * 100)).toFixed(2);
        }
    }

    /**
     * Function that does the final treatments for the percentage mask
     * before saving to the database.
     * In the database, we must save the converted percentage (value/100)
     */
    public static transformPercentageUItoBD(value: any): number {
        if (!value) {
            return 0;
        }

        return parseFloat(String(value / 100));
    }

    /**
     * Deeply replace in nested objects/arrays
     * @param {ArrayArgumentsReplaceItems} arrayArgumentsReplace
     * @param object
     * @param parse
     */
    public static replacePropertyValueDeep(
        arrayArgumentsReplace: ArrayArgumentsReplaceItems[],
        object,
        parse: boolean = false
    ): any {
        if (!arrayArgumentsReplace) {
            console.error(`field arrayArgumentsReplace was not entered`);
            return;
        }

        if (!object) {
            console.error(`field object was not entered`);
            return;
        }

        // return cloneDeepWith(object, value => value === oldValue ? newValue : undefined);
        // const newObject = clone(object);
        const newObject = parse ? clone(JSON.parse(object)) : clone(object);

        forEach(arrayArgumentsReplace, (valArgs) => {
            forEach(newObject, (val, key) => {
                if (val === valArgs.oldValue) {
                    newObject[key] = valArgs.newValue;
                } else if (
                    (typeof val === 'object' && Object.entries(val).length) ||
                    (Array.isArray(val) && val.length)
                ) {
                    newObject[key] = VimboUtils.replacePropertyValueDeep(
                        [valArgs],
                        val
                    );
                }
            });
        });

        return newObject;
    }

    /**
     * Deeply Evaluate Specific Fields
     * @param fields
     * @param object
     * @param parse
     */
    public static evaluateSpecificFieldsDeep(
        fields: string[],
        object,
        parse: boolean = false
    ): any {
        if (!fields || !fields.length) {
            console.error(`fields was not entered`);
            return;
        }

        if (!object) {
            console.error(`field object was not entered`);
            return;
        }

        const newObject = parse ? clone(JSON.parse(object)) : clone(object);

        forEach(newObject, (val, key) => {
            forEach(fields, (valArgs) => {
                if (key === valArgs) {
                    newObject[key] = new Function('return ' + val);
                } else if (
                    (typeof val === 'object' && Object.entries(val).length) ||
                    (Array.isArray(val) && val.length)
                ) {
                    newObject[key] = VimboUtils.evaluateSpecificFieldsDeep(
                        [valArgs],
                        val
                    );
                }
            });
        });

        return newObject;
    }

    /**
     * Function Analyzes (currentQuery & previousQuery)
     * @param currentQuery
     * @param previousQuery
     */
    public static queryIsEqual(
        currentQuery: string,
        previousQuery: string
    ): boolean {
        if (!currentQuery || !previousQuery) {
            return false;
        }

        const _currentQuery = String(currentQuery).trim();
        const _previousQuery = String(previousQuery).trim();

        return _currentQuery === _previousQuery;
    }

    /**
     * Merge JSON from two strings
     * possibility of passing the key(mergePosition) where you want to merge the second value(value2)
     * the return can be json or string, just change to true / false the value of (returnString)
     * @param value1
     * @param value2
     * @param returnString
     * @param formattedString
     * @param mergePosition
     */
    public static mergeJsonFromString(
        value1: string,
        value2: string,
        returnString: boolean = false,
        formattedString: boolean = false,
        mergePosition: string = null
    ): string | Array<any> | object {
        const _valueJson1 = JSON.parse(value1);
        const _valueJson2 = JSON.parse(value2);
        let _result = null;

        if (mergePosition) {
            _result = {
                ..._valueJson1,
                [mergePosition]: _valueJson2
            };
        } else {
            _result = {
                ..._valueJson1,
                ..._valueJson2
            };
        }

        if (returnString) {
            if (formattedString) {
                return VimboBeautify.formatJsonString(_result);
            }
            return JSON.stringify(_result);
        } else {
            return _result;
        }
    }

    /**
     * Change object value in immutable array
     *
     * @param array
     * @param newValue
     * @param position
     */
    public static changeObjectValueImmutableArray(
        array: Array<any>,
        newValue: object,
        position: number
    ): Array<any> {
        if (position < array.length) {
            // change only one value within the object
            if (Object.keys(newValue) && Object.keys(newValue).length === 1) {
                return [
                    ...array.slice(0, position),
                    {
                        ...array[position],
                        ...newValue
                    },
                    ...array.slice(position + 1)
                ];
            }

            return [
                ...array.slice(0, position),
                newValue,
                ...array.slice(position + 1)
            ];
        }
        // Array empty
        else {
            // change only one value within the object
            if (Object.keys(newValue) && Object.keys(newValue).length === 1) {
                return [
                    ...array,
                    ...Array(position - array.length),
                    {
                        ...array[position],
                        ...newValue
                    }
                ];
            }

            return [...array, ...Array(position - array.length), newValue];
        }
    }

    /**
     * Convert Model Angular To Type Graphql
     * @param model
     * @param children
     * @param excludeFields
     */
    public static convertModelToTypeGraphql(
        model: any,
        children: Array<any> = [],
        excludeFields: Array<string> = []
    ): string {
        // let _parent = without( Object.keys(model), excludeFields ).join(' ');
        let _parent = remove(
            Object.keys(model),
            (item) => !excludeFields.includes(item)
        ).join(' ');

        children.forEach((el) => {
            // String
            if (typeof el === 'string') {
                // Array
                if (Array.isArray(model[el.trim()])) {
                    _parent = _parent.replace(
                        el.trim(),
                        `${el.trim()} { ${Object.keys(model[el.trim()][0]).join(
                            ' '
                        )} }`
                    );
                }

                // Object
                else if (
                    typeof model[el.trim()] === 'object' &&
                    model[el.trim()] !== null
                ) {
                    _parent = _parent.replace(
                        el.trim(),
                        `${el.trim()} { ${Object.keys(model[el.trim()]).join(
                            ' '
                        )} }`
                    );
                }
            }

            // Object
            // Not Implemented
        });

        return _parent;
    }

    /**
     * Is Object
     * @param item
     */
    public static isObject(item: object): boolean {
        return typeof item === 'object' && item !== null;
        // return item != null && item.constructor.name === 'Object';
    }

    /**
     * Check if a scrollbar is visible
     * @param el
     */
    public static isScrollable(el): any {
        if (!el) {
            return {
                horizontallyScrollable: false,
                verticallyScrollable: false
            };
        }

        return {
            horizontallyScrollable: el.scrollWidth > el.clientWidth,
            verticallyScrollable: el.scrollHeight > el.clientHeight
        };
    }

    /**
     * Get File Extension
     * @param fileName
     */
    public static getFileExtension(fileName): string {
        if (!fileName) {
            return undefined;
        }

        return fileName ? fileName.split('.').pop() : undefined;
    }

    /**
     * Extract Object Id
     */
    public static extractObjectId(data: object, key?: string | number): string {
        if (!data || !VimboUtils.isObject(data)) {
            return undefined;
        }

        // custom id
        if (key) {
            return data[key];
        }

        // _id
        if (data['_id']) {
            return data['_id'];
        }

        // id
        if (data['id']) {
            return data['id'];
        }

        return undefined;
    }

    /**
     * Function To String
     * @param value
     * @param regexReplace
     */
    public static functionToString(
        value: any,
        regexReplace: {
            search: string | RegExp;
            replace: string;
        } = null
    ): string {
        if (!value) {
            return;
        }

        let _value = String(value);

        if (regexReplace) {
            _value = _value
                .trim()
                .replace(regexReplace.search, regexReplace.replace);
        }

        if (!regexReplace) {
            _value = _value.trim().replace(/\s\s+/g, ' ');
        }

        return _value;
    }

    /**
     * Sanitize String
     * - returns string.
     * - removes space at the beginning and end of the sentence/word
     * - removes line breaks.
     * - It only maintains a space where it has more than one
     * @param value
     */
    public static sanitizeString(value: any): string {
        if (!value) {
            return '';
        }

        return String(value)
            .trim()
            .replace(/(\r\n|\n|\r)/gm, '')
            .replace(/\s\s+/g, ' ');
    }

    /**
     * CPF Is Valid
     * validates cpf, based on calculation
     * @param cpf
     */
    public static cpfIsValid(cpf: string): boolean {
        if (!cpf || cpf === '') {
            return false;
        }

        // Clear
        cpf = cpf.replace(/\D/g, '');

        // like diverse customers is registered with everything 9
        if (cpf === '99999999999') {
            return true;
        }

        // Validates the number of characters and Eliminates invalid, all characters equal
        if (cpf.toString().length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        let result = true;

        // Validation calculation
        [9, 10].forEach((j) => {
            let sum = 0;
            let r = null;
            cpf.split(/(?=)/)
                .splice(0, j)
                .forEach((e, i) => {
                    sum += parseInt(e, 10) * (j + 2 - (i + 1));
                });
            r = sum % 11;
            r = r < 2 ? 0 : 11 - r;
            if (r !== cpf.substring(j, j + 1)) {
                result = false;
            }
        });

        return result;
    }

    /**
     * CNPJ Is Valid
     * validates cpf, based on calculation
     * @param cnpj
     * @constructor
     */
    public static CNPJIsValid(cnpj: string): boolean {
        if (!cnpj || cnpj === '') {
            return false;
        }

        // Clear
        const _cnpj = cnpj.replace(/[^\d]+/g, '');

        // Validates the number of characters
        if (_cnpj.length !== 14) {
            return false;
        }

        // like diverse customers is registered with everything 9
        if (_cnpj === '99999999999999') {
            return true;
        }

        // Eliminates invalid, all characters equal
        if (/^(\d)\1+$/.test(_cnpj)) {
            return false;
        }

        // Validation calculation
        const t = _cnpj.length - 2;
        const d = _cnpj.substring(t);
        const d1 = parseInt(d.charAt(0), 10);
        const d2 = parseInt(d.charAt(1), 10);
        const calc = (x) => {
            const n = _cnpj.substring(0, x);
            let y = x - 7;
            let s = 0;
            let r = 0;

            for (let i = x; i >= 1; i--) {
                s += (n.charAt(((x as any) - i) as any) as any) * (y-- as any);
                if (y < 2) {
                    y = 9;
                }
            }

            r = 11 - (s % 11);
            return r > 9 ? 0 : r;
        };

        return calc(t) === d1 && calc(t + 1) === d2;
    }
}

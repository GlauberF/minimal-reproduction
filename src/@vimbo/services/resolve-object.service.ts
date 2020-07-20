/*
 * Vimbo Resolve Object
 *
 * why:
 * - Get: When trying to access a position of an object and it does not
 * exist, the same as the error, with the get method implemented here it
 * will return null or the default value you enter, when the position
 * does not exist. *
 * - Set: When trying to assign a value in a position of an object and it does
 * not exist, the same as the error, with the set method implemented here
 * it will create the position when the position does not exist.
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 27/03/2020 18:22
 */

import { Injectable } from '@angular/core';
import { get, set } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class VimboResolveObjectService {
    constructor() {}

    /**
     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
     * it's created. Arrays are created for missing index properties while objects
     * are created for all other missing properties. Use `_.setWith` to customize
     * `path` creation.
     *
     * **Note:** This method mutates `object`.
     *
     * @param object
     * @param path
     * @param value
     * @param forceWriting
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, ['x', '0', 'y', 'z'], 5);
     * console.log(object.x[0].y.z);
     * // => 5
     * @param forceWriting
     */
    set(
        object: any,
        path: Array<any> | string,
        value: any,
        forceWriting: boolean = false
    ): object {
        // Check
        if (!this.check(object, path) && !forceWriting) {
            console.warn(`
                Attention: This path (${path}) does not exist in the informed object.
                \n
                Note: If you want to force it to create the path / position, send the forceWriting field as true!
            `);
            return object;
        }

        return set(object, path, value);
    }

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @param object
     * @param path
     * @param defaultValue
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    get(object: any, path: Array<any> | string, defaultValue: any = null): any {
        return get(object, path, defaultValue);
    }

    /**
     * Check
     * @param object
     * @param path
     */
    check(object: any, path: Array<any> | string): boolean {
        return !!this.get(object, path);
    }

    /**
     * Checks if the key exists in the object
     * @param object
     * @param key
     */
    checksKeyObjectExists(object: object, key: any): any {
        return Object.keys(object).find((keyP) => keyP === key);
    }
}

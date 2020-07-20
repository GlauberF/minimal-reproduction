/*
 * Sort
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 24/02/2020 10:17
 *
 */

import { Pipe, PipeTransform } from '@angular/core';

// Core Vimbo
import { VimboUtils } from '@vimbo/utils';

@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform {
    transform(
        array: Array<any>,
        orderField?: string,
        orderType?: 'desc' | 'asc'
    ): Array<any> {
        let hasObject = {
            value: false,
            checked: false
        };
        let orderTypeBool = false;

        /**
         * Get Order Type
         */
        orderTypeBool = !(!orderType || orderType === 'asc');

        /**
         * Check is Array
         */
        if (!Array.isArray(array)) {
            console.warn('it\'s not an array');
            return array;
        }

        /**
         * Check Is Object
         */
        for (const checkItemArray of array) {
            if (hasObject.checked) {
                break;
            }

            hasObject = {
                value: VimboUtils.isObject(checkItemArray),
                checked: true
            };
        }

        /**
         * Array of Objects
         */
        if (hasObject && hasObject.value) {
            array.sort((a: any, b: any) => {
                const ae = a[orderField];
                const be = b[orderField];
                if (ae === undefined && be === undefined) {
                    return 0;
                }
                if (ae === undefined && be !== undefined) {
                    return orderTypeBool ? 1 : -1;
                }
                if (ae !== undefined && be === undefined) {
                    return orderTypeBool ? -1 : 1;
                }
                if (ae === be) {
                    return 0;
                }
                return orderTypeBool
                    ? ae.toString().toLowerCase() > be.toString().toLowerCase()
                        ? -1
                        : 1
                    : be.toString().toLowerCase() > ae.toString().toLowerCase()
                    ? -1
                    : 1;
            });
            return array;
        } else {
            /**
             * Array of String
             */
            array.sort((a: any, b: any) => {
                if (a < b) {
                    return orderTypeBool ? 1 : -1;
                } else if (a > b) {
                    return orderTypeBool ? -1 : 1;
                } else {
                    return 0;
                }
            });
            return array;
        }
    }
}

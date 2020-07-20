/*
 * Upper Case Pipe
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 21/04/2020 11:02
 *
 * Example:
 * {{'abc' | upperCase}}
 */

import { Pipe, PipeTransform } from '@angular/core';
import { VimboCheckDataTypes } from '../utils/check-data-types';

@Pipe({ name: 'toString' })
export class ToStringPipe implements PipeTransform {
    /**
     * Transform
     *
     * @param {any} value
     * @returns {string}
     */
    transform(value: any): string {
        if (VimboCheckDataTypes.check(value).isString) {
            return value;
        }

        return JSON.stringify(value);
    }
}

/*
 *
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 26/03/2020 10:16
 *
 * Example:
 * {{'  algo  '| trim}}
 */

import { Pipe, PipeTransform } from '@angular/core';
import { VimboCheckDataTypes } from '../utils/check-data-types';

@Pipe({
    name: 'trim'
})
export class TrimPipe implements PipeTransform {
    transform(value: string): string {
        if (!VimboCheckDataTypes.check(value).isString) {
            return value;
        }

        return value.trim();
    }
}

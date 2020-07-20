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

@Pipe({ name: 'upperCase' })
export class UpperCasePipe implements PipeTransform {
    /**
     * Transform
     *
     * @param {string} value
     * @returns {string}
     */
    transform(value: string): string {
        return value ? value.toLocaleUpperCase() : '';
    }
}

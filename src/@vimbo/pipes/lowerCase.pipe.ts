/*
 * Lower Case Pipe
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 21/04/2020 11:04
 *
 * Example:
 * {{'abc' | lowerCase}}
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'lowerCase' })
export class LowerCasePipe implements PipeTransform {
    /**
     * Transform
     *
     * @param {string} value
     * @returns {string}
     */
    transform(value: string): string {
        return value ? value.toLocaleLowerCase() : '';
    }
}

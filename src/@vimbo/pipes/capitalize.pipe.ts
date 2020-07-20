/*
 * First letter of each capital sentence,
 * Allows you to pass a delimiter, so that he knows
 * that after him, he wants to put the first letter
 * also in uppercase
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 11/02/2020 10:43
 *
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
    /**
     * Transform
     *
     * @param {string} value
     * @param {delimiter: string} args
     * @returns {string}
     */
    transform(value: string, args?: { delimiter: string }): string {
        if (args && args.delimiter) {
            return value
                .replace(`${args.delimiter}`, ` ${args.delimiter} `)
                .toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')
                .replace(` ${args.delimiter} `, `${args.delimiter}`);
        }

        return value
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }
}

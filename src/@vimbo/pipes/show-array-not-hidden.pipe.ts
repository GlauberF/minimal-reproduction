/*
 * Shows only arrays that have no hidden as true.
 * Enables you to pass a custom path, where you have the hidden field
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 10/02/2020 09:31
 *
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'showArrayNotHidden'
})
export class ShowArrayNotHiddenPipe implements PipeTransform {
    transform(arr: Array<any>, path?: string): Array<any> {
        if (path) {
            return Array.isArray(arr) ? arr.filter((t) => !t[path].hidden) : [];
        }

        return Array.isArray(arr) ? arr.filter((t) => !t.hidden) : [];
    }
}

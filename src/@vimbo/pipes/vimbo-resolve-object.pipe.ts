/*
 * Vimbo Resolve Object Pipe
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 27/03/2020 18:32
 */

import { Pipe, PipeTransform } from '@angular/core';
import { VimboResolveObjectService } from '../services/resolve-object.service';

export interface VimboResolveObjectPipeInterface {
    path: Array<any> | string;
    action: 'get' | 'set' | 'check';
    value?: any;
    defaultValue?: any;
    forceWriting?: boolean;
}

@Pipe({
    name: 'resolveObject'
})
export class VimboResolveObjectPipe implements PipeTransform {
    constructor(
        private _vimboResolveObjectService: VimboResolveObjectService
    ) {}

    /**
     * Transform
     * @param value
     * @param args
     */
    transform(value: any, args: VimboResolveObjectPipeInterface): any {
        /**
         * Get
         */
        if (args.action === 'get') {
            return this._vimboResolveObjectService.get(
                value,
                args.path,
                args.defaultValue
            );
        } else if (args.action === 'set') {
            /**
             * Set
             */
            return this._vimboResolveObjectService.set(
                value,
                args.path,
                args.value,
                args.forceWriting
            );
        } else if (args.action === 'check') {
            /**
             * Check
             */
            return this._vimboResolveObjectService.check(value, args.path);
        }

        return;
    }
}

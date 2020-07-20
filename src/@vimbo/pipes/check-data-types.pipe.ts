/*
 * Check Data Types Pipe
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 25/03/2020 22:17
 *
 * Example
 *
 * *ngIf=(item | CheckDataTypes).typeof === 'number'"
 * *ngIf=(item | CheckDataTypes).isString"
 */

import { Pipe, PipeTransform } from '@angular/core';

// Core Vimbo
import {
    VimboCheckDataTypes,
    VimboCheckDataTypesInterface
} from '../utils/check-data-types';

@Pipe({
    name: 'CheckDataTypes'
})
export class CheckDataTypesPipe implements PipeTransform {
    /**
     * Transform
     * @param value
     */
    transform(value: any): VimboCheckDataTypesInterface {
        return VimboCheckDataTypes.check(value);
    }
}

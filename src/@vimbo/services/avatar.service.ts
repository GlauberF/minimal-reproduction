/*
 * Vimbo Avatar Service
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 23/05/2020 14:54
 */

import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

interface AvatarConfigInterface {
    'name'?: string;
    'gravatar'?: string;
    'background'?: string;
    'color'?: string;
    'size'?: number;
    'font-size'?: number;
    'rounded'?: boolean;
    'format'?: 'png' | 'svg';
    'bold'?: boolean;
    'border-color'?: string;
    'border-size'?: number;
    'uppercase'?: boolean;
    'length'?: number;
}

@Injectable({
    providedIn: 'root'
})
export class VimboAvatarService {
    /**
     * Generate URL
     * @param data
     */
    generateURL(data: AvatarConfigInterface): string {
        // Mount Query
        const query = Object.keys(data).reduce(
            (accumulator, item, index, config) => {
                return `${accumulator}${index !== 0 ? '&' : ''}${item}=${
                    data[item]
                }`;
            },
            '?'
        );

        return `${environment.CoreAPIV1}gerar/avatar${query}`;
    }
}

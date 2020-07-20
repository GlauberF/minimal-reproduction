/*
 * Highlight
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 12/02/2020 15:03
 *
 */

import { Pipe, PipeTransform } from '@angular/core';

// Core Vimbo
import { VimboRegex } from '@vimbo/utils/regex';

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
    transform(text: any, search: any, searchKeyword?: any): any {
        if (!search) {
            return text;
        }

        text = VimboRegex.clear({
            value: text,
            type: 'html'
        });

        let pattern = search.replace(
            /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
            '\\$&'
        );

        pattern = pattern
            .split(' ')
            .filter((t) => {
                return t.length > 0;
            })
            .join('|');

        const regex = new RegExp(pattern, 'gi');

        if (searchKeyword) {
            const name = text[searchKeyword].replace(
                regex,
                (match) => `<mark>${match}</mark>`
            );
            // copy original object
            const text2 = { ...text };
            // set bold value into searchKeyword of copied object
            text2[searchKeyword] = name;
            return text2;
        } else {
            return search
                ? text.replace(regex, (match) => `<mark>${match}</mark>`)
                : text;
        }
    }
}

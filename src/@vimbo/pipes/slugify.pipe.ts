import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'slugify' })
export class SlugifyPipe implements PipeTransform {
    transform(input: string): string {
        return input
            .toString()
            .toLowerCase()
            .replace(/[àáâäå]/g, 'a') // convert to ascii "a"
            .replace(/[çĉ]/g, 'c') // convert to ascii "c"
            .replace(/[éèêë]/g, 'e') // convert to ascii "c"
            .replace(/ĝ/g, 'g') // convert to ascii "g"
            .replace(/ĥ/g, 'h') // convert to ascii "h"
            .replace(/[ïíîì]/g, 'i') // convert to ascii "i"
            .replace(/ĵ/g, 'j') // convert to ascii "j"
            .replace(/ñ/g, 'n') // convert to ascii "n"
            .replace(/[ôöõøöòó]/g, 'o') // convert to ascii "o"
            .replace(/[šŝ]/g, 's') // convert to ascii "s"
            .replace(/[üûùúŭû]/g, 'u') // convert to ascii "u"
            .replace(/[ýÿ]/g, 'u') // convert to ascii "y"
            .replace(/ž/g, 'z') // convert to ascii "z"
            .replace(/&[#A-zA-Z0-9]+;/gi, '') // remove HTML Entities
            .replace(/&/gi, ' and ') // replace standalone ampersands with the word and
            .replace(/\+/g, ' ') // replace all +'s with a space
            .replace(/[^A-Za-z0-9- ]+/gi, '') // remove all Non-AlphaNumeric Characters except for Spaces or Dashes
            .trim() // remove leading and trailing spaces
            .replace(/\s+/g, '-') // replace 1 or more spaces with a single -
            .replace(/-+/g, '-'); // replace 2 or more dashes with a single -
    }
}

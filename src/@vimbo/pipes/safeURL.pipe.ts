import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({ name: 'safeURL' })
export class SafeURLPipe implements PipeTransform {
    constructor(private domSanitizer: DomSanitizer) {}

    transform(url: string): SafeUrl {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

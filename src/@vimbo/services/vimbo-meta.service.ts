import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { isPlainObject } from 'lodash';
import { TranslateService } from '@ngx-translate/core';

export class VimboMetaTagsModel {
    'name': string;
    'content': string;
    constructor(tag) {
        {
            this.name = tag.name;
            this.content = tag.content;
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class VimboMetaService {
    private language: string;

    constructor(
        private titleService: Title,
        private meta: Meta,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private _translateService: TranslateService
    ) {
        this.language = this._translateService.currentLang
            ? this._translateService.currentLang
            : 'pt_BR';
    }

    updateTag(content: VimboMetaTagsModel): void {
        // this.meta.updateTag({ name: 'description', content: content });
    }

    updateTags(content: [VimboMetaTagsModel]): void {
        // this.meta.updateTag({ name: 'description', content: content });
    }

    /**
     * Update manual Title
     * @param title
     */
    updateTitle(title: string): void {
        this.titleService.setTitle(title + ' | Vimbo');
    }

    /**
     * listen routes event and search title field to update
     */
    subscribeRouterTitle(): void {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map((route) => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                mergeMap((route) => route.data)
            )
            .subscribe((event) => {
                // update language
                this.language = this._translateService.currentLang
                    ? this._translateService.currentLang
                    : 'pt_BR';

                if (event['title']) {
                    // object
                    if (isPlainObject(event['title'])) {
                        this.titleService.setTitle(
                            event['title'][this.language] + ' | Vimbo'
                        );
                    }
                    // string
                    else if (typeof event['title'] === 'string') {
                        this.titleService.setTitle(event['title'] + ' | Vimbo');
                    }
                    // others
                    else {
                        this.titleService.setTitle('Vimbo');
                    }
                }

                if (!event['title']) {
                    this.titleService.setTitle('Vimbo');
                }
            });
    }
}

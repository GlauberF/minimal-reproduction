import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[transl], [transl-placeholder], [transl-title]'
})
export class VimboTranslDirective implements AfterViewInit, OnDestroy {
    private _unsubscribeAll$: Subject<any>;

    @Input('transl-param') translParam: object;

    constructor(
        private el: ElementRef,
        private translateService: TranslateService
    ) {
        this._unsubscribeAll$ = new Subject();
    }

    ngAfterViewInit(): void {
        this.translate();
    }

    private translate(): any {
        const el = this.el.nativeElement;

        // translate placeholder
        if (el.getAttribute('placeholder')) {
            const key = el.getAttribute('placeholder');
            this.translateService
                .get(key.trim())
                .pipe(takeUntil(this._unsubscribeAll$))
                .subscribe((res: string) => {
                    el.setAttribute('placeholder', res);
                });
        }
        // translate html5 title
        else if (el.getAttribute('title')) {
            const key = el.getAttribute('title');
            this.translateService
                .get(key.trim())
                .pipe(takeUntil(this._unsubscribeAll$))
                .subscribe((res: string) => {
                    el.setAttribute('title', res);
                });
        }
        // translate label content
        else if (el.getAttribute('label')) {
            const key = el.getAttribute('label');
            this.translateService
                .get(key.trim())
                .pipe(takeUntil(this._unsubscribeAll$))
                .subscribe((res: string) => {
                    el.setAttribute('label', res);
                });
        }
        // translate tooltip content
        else if (el.getAttribute('tooltip')) {
            const key = el.getAttribute('tooltip');
            this.translateService
                .get(key.trim())
                .pipe(takeUntil(this._unsubscribeAll$))
                .subscribe((res: string) => {
                    el.setAttribute('tooltip', res);
                });
        }
        // translate node text content
        else {
            this.translateTextContent(el);
        }
    }

    private translateTextContent(el: HTMLElement): any {
        const children = Array.from(el.childNodes);

        // make sure text nodes are first
        children.sort((a, b) => (a.nodeType === Node.TEXT_NODE ? -1 : 1));

        for (const value of children) {
            const child = value as HTMLElement;

            if (child.nodeType === Node.TEXT_NODE) {
                this.translateService
                    .get(child.textContent.trim() || ' ', this.translParam)
                    .pipe(takeUntil(this._unsubscribeAll$))
                    .subscribe((res: string) => {
                        return (child.nodeValue = res);
                    });
            } else {
                if (this.translateTextContent(child)) {
                    return;
                }
            }
        }
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }
}

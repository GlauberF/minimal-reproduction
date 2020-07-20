import {
    AfterContentChecked,
    Directive,
    ElementRef,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { VirtualDOMService } from '../../services/virtual-dom.service';

@Directive({
    selector: '[vimboIfOnDom]'
})
export class VimboIfOnDomDirective implements AfterContentChecked {
    isCreated: boolean;

    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {TemplateRef<any>} _templateRef
     * @param {ViewContainerRef} _viewContainerRef
     * @param _virtualDOMService
     */
    constructor(
        private _elementRef: ElementRef,
        private _templateRef: TemplateRef<any>,
        private _viewContainerRef: ViewContainerRef,
        private _virtualDOMService: VirtualDOMService
    ) {
        // Set the defaults
        this.isCreated = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * After content checked
     */
    ngAfterContentChecked(): void {
        if (typeof window === 'undefined') {
            return;
        }

        if (
            document.body.contains(this._elementRef.nativeElement) &&
            !this.isCreated
        ) {
            this._virtualDOMService.windowRef().setTimeout(() => {
                this._viewContainerRef.createEmbeddedView(this._templateRef);
            }, 300);
            this.isCreated = true;
        } else if (
            this.isCreated &&
            !document.body.contains(this._elementRef.nativeElement)
        ) {
            this._viewContainerRef.clear();
            this.isCreated = false;
        }
    }
}

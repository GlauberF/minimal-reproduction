/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 02/04/2020 09:00
 *
 * Ref: https://netbasal.com/welcome-to-the-ivy-league-lazy-loading-components-in-angular-v9-e76f0ee2854a
 *      https://gist.github.com/GlauberF/db16859cfdbd9ddeb6cde314a4900f71
 */

import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    Type,
    ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[lazyComp]'
})
export class DynamicComponentDirective implements OnDestroy {
    private _inputs;
    private _outputs;
    private compRef: ComponentRef<any>;
    private _unsubscribeAll$: Subject<any>;

    // lazyComp
    @Input('lazyComp') set comp(type: Type<any>) {
        if (type) {
            if (!type) {
                return;
            }

            const factory = this.resolver.resolveComponentFactory(type);
            this.compRef = this.vcr.createComponent(factory);
            this.refreshInputs(this._inputs);
            if (this._outputs) {
                Object.keys(this._outputs).forEach((output) => {
                    (this.compRef.instance[output] as EventEmitter<any>)
                        .pipe(takeUntil(this._unsubscribeAll$))
                        .subscribe(this._outputs[output]);
                });
            }
        }
    }
    // Inputs
    @Input() set inputs(data) {
        if (this.compRef) {
            this.refreshInputs(data);
            this.compRef.hostView.detectChanges();
        } else {
            this._inputs = data;
        }
    }
    // Outputs
    @Input() set outputs(data) {
        this._outputs = data;
    }

    /**
     * Constructor
     * @param vcr
     * @param resolver
     */
    constructor(
        private vcr: ViewContainerRef,
        private resolver: ComponentFactoryResolver
    ) {
        // Set the private defaults
        this._unsubscribeAll$ = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On Destroy
     */
    ngOnDestroy(): void {
        this.compRef = null;
        // Unsubscribe from all subscriptions
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods (_method)
    // -----------------------------------------------------------------------------------------------------

    /**
     * Refresh Inputs
     * @param inputs
     */
    private refreshInputs(inputs): void {
        if (!inputs) {
            return;
        }
        // Reassign values to inputs
        Object.keys(inputs).forEach(
            (inputName) =>
                (this.compRef.instance[inputName] = inputs[inputName])
        );
    }
}

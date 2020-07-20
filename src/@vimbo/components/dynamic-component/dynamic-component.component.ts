/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 02/04/2020 09:00
 */

import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

// Core Vimbo
import { VirtualDOMService } from '@vimbo/services/virtual-dom.service';
import { VimboCheckDataTypes } from '@vimbo/utils/check-data-types';
import { DynamicExpressionService } from '@vimbo/services/dynamic-expression.service';

// Component
import { DynamicComponentService } from './dynamic-component.service';
import { DynamicComponentInterface } from './dynamic-component-type';

@Component({
    selector: 'vimbo-dynamic-component',
    templateUrl: './dynamic-component.html',
    styleUrls: ['./dynamic-component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VimboDynamicComponentComponent implements OnInit, OnDestroy {
    _components: DynamicComponentInterface[];

    @Input()
    components: DynamicComponentInterface[];

    @Input()
    context?: any;

    /**
     * Constructor
     */
    constructor(
        private _dynamicComponentService: DynamicComponentService,
        private _virtualDOMService: VirtualDOMService,
        private _dynamicExpressionService: DynamicExpressionService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On Init
     */
    ngOnInit(): void {
        // this._components = [];
        this._init();
    }

    /**
     * On Destroy
     */
    ngOnDestroy(): void {
        this._components = null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods (_method)
    // -----------------------------------------------------------------------------------------------------

    /**
     * Initial function with the logics
     * @private
     */
    private _init(): void {
        // Components
        if (this.components) {
            // Check if it's an array
            if (VimboCheckDataTypes.check(this.components).isArray) {
                // Mount
                this._components = this._dynamicComponentService.mountDynamicComponent(
                    this.components,
                    this.context
                );
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ public methods
    // -----------------------------------------------------------------------------------------------------
}

/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 07/02/2020 17:46
 */

import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';

// Core Vimbo
import { VirtualDOMService } from '@vimbo/services/virtual-dom.service';
import { VimboCheckDataTypes } from '@vimbo/utils/check-data-types';
import { DynamicExpressionService } from '@vimbo/services/dynamic-expression.service';

// Module
import { DynamicComponentInterface } from './dynamic-component-type';

@Injectable({
    providedIn: 'root'
})
export class DynamicComponentService {
    /**
     * Constructor
     */
    constructor(
        private _virtualDOMService: VirtualDOMService,
        private _dynamicExpressionService: DynamicExpressionService
    ) {}

    /**
     * Mount Dynamic Component
     * @param components
     * @param data
     * @param config
     */
    mountDynamicComponent(
        components: DynamicComponentInterface[],
        data: any = null,
        config: any = null
    ): DynamicComponentInterface[] {
        if (!components) {
            return;
        }

        let tempComponents = null;

        // Context
        const context = {
            ...(data || {}),
            'config': {
                ...(config || {})
            }
        };

        // Components
        if (components) {
            // Check if it's an array
            if (VimboCheckDataTypes.check(components).isArray) {
                // Add/Clone Values
                tempComponents = cloneDeep(components) as Array<
                    DynamicComponentInterface
                >;

                // Reassign values and do evaluate if it is a function
                tempComponents.forEach((value, idx) => {
                    // _id
                    value['_id'] = idx;

                    // Transform component
                    value['cpn'] = this.resolveComponent(value.component);

                    // Evaluate
                    if (value.evaluate) {
                        // Inputs
                        if (
                            value.inputs &&
                            VimboCheckDataTypes.check(value.inputs).isObject
                        ) {
                            Object.keys(value.inputs).forEach((valueInput) => {
                                value.inputs[
                                    valueInput
                                ] = this._dynamicExpressionService.evaluate(
                                    value.inputs[valueInput],
                                    context
                                );
                            });
                        }

                        // Outputs
                        if (
                            value.outputs &&
                            VimboCheckDataTypes.check(value.outputs).isObject
                        ) {
                            Object.keys(value.outputs).forEach(
                                (valueOutputs) => {
                                    value.outputs[
                                        valueOutputs
                                    ] = this._dynamicExpressionService.evaluate(
                                        value.outputs[valueOutputs],
                                        context
                                    );
                                }
                            );
                        }
                    }
                });
            }
        }

        return tempComponents;
    }

    /**
     * Resolve Component
     * @param comp
     */
    async resolveComponent(comp: {
        path: string;
        name: string;
        declaration: any;
    }): Promise<any> {
        if (!comp) {
            console.error(
                '[Vimbo resolveComponent] - the declaration field and one of the fields (path or name) must be informed.'
            );
            return;
        }

        if (!comp.declaration) {
            console.error(
                '[Vimbo resolveComponent] - The declaration field needs to be informed.'
            );
            return;
        }

        if (!comp.path && !comp.name) {
            console.error(
                '[Vimbo resolveComponent] - One of the fields must be informed (path or name).'
            );
            return;
        }

        let _comp = null;

        // Component resolution priority order
        try {
            // 1 - Path
            if (comp?.path) {
                _comp = await import(`${this.sanitizeWords(comp.path)}`).then(
                    (resImport) => {
                        _comp = resImport[comp.declaration];
                    }
                );
            }

            // 2 - Name
            if (comp?.name) {
                // ../../../${comp.name}/${comp.name}.component
                await import(
                    `@vimbo/components/${this.sanitizeWords(
                        comp.name
                    )}/${this.sanitizeWords(comp.name)}.component`
                ).then((resImport) => {
                    _comp = resImport[comp.declaration];
                });
            }
        } catch (e) {
            console.error('[Error resolveComponent] ->', e);
        }

        return await _comp;
    }

    /**
     * Treats the words that will be used in
     * name and path
     * @param text
     */
    sanitizeWords(text: string): string {
        if (this._virtualDOMService.isPlatformServerRef()) {
            return;
        }

        if (!text) {
            return;
        }

        return text.toLocaleLowerCase().trim().replace(/\s/g, '');
    }
}

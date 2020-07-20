/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 01/05/2020 16:14
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Core Vimbo
import { VimboPipesModule } from '@vimbo/pipes/pipes.module';

// Component
import { VimboDynamicComponentComponent } from './dynamic-component.component';
import { DynamicComponentDirective } from './dynamic-component.directive';

@NgModule({
    imports: [CommonModule, VimboPipesModule],
    declarations: [VimboDynamicComponentComponent, DynamicComponentDirective],
    exports: [VimboDynamicComponentComponent, DynamicComponentDirective]
})
export class VimboDynamicComponentModule {}

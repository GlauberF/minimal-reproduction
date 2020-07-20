/*
 *  Module for loading services with LazyLoad
 *
 *  services that will be used only within this module, provedein, will be set
 *  with the name of this module, preventing it from being injected out.
 *  medium.com/@tomastrajan/total-guide-to-angular-6-dependency-injection-providedin-vs-providers-85b7a347b59f
 *
 * @author Glauber Funez
 * @package Vimbo
 * Vimbo Tecnologia Ltda ME
 * Copyright (c) 2019.
 */

import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [],
    providers: [],
    entryComponents: []
})
export class LazyServiceModuleDashboardEmpresa {}

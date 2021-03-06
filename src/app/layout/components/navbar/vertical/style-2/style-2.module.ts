import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { VimboNavigationModule } from '@vimbo/components';
import { VimboSharedModule } from '@vimbo/shared.module';

import { NavbarVerticalStyle2Component } from 'app/layout/components/navbar/vertical/style-2/style-2.component';

@NgModule({
    declarations: [NavbarVerticalStyle2Component],
    imports: [
        MatButtonModule,
        MatIconModule,
        VimboSharedModule,
        VimboNavigationModule
    ],
    exports: [NavbarVerticalStyle2Component]
})
export class NavbarVerticalStyle2Module {}

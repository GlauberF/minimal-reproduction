import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { VimboNavigationModule } from '@vimbo/components';
import { VimboSharedModule } from '@vimbo/shared.module';

import { NavbarVerticalStyle1Component } from 'app/layout/components/navbar/vertical/style-1/style-1.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [NavbarVerticalStyle1Component],
    imports: [
        MatButtonModule,
        MatIconModule,

        VimboSharedModule,
        VimboNavigationModule,
        MatTooltipModule,
        TranslateModule
    ],
    exports: [NavbarVerticalStyle1Component]
})
export class NavbarVerticalStyle1Module {}

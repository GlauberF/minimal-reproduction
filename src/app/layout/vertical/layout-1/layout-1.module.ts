import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { VimboSidebarModule } from '@vimbo/components';
import { VimboSharedModule } from '@vimbo/shared.module';

import { ContentModule } from 'app/layout/components/content/content.module';
import { FooterModule } from 'app/layout/components/footer/footer.module';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { QuickPanelModule } from 'app/layout/components/quick-panel/quick-panel.module';
import { ToolbarModule } from 'app/layout/components/toolbar/toolbar.module';
import { VerticalLayout1Component } from 'app/layout/vertical/layout-1/layout-1.component';

@NgModule({
    declarations: [VerticalLayout1Component],
    imports: [
        RouterModule,

        VimboSharedModule,
        VimboSidebarModule,

        ContentModule,
        FooterModule,
        NavbarModule,
        QuickPanelModule,
        ToolbarModule,

        DeviceDetectorModule.forRoot()
    ],
    exports: [VerticalLayout1Component]
})
export class VerticalLayout1Module {}

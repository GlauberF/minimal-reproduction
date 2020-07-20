import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { VimboSharedModule } from '@vimbo/shared.module';

import { QuickPanelComponent } from 'app/layout/components/quick-panel/quick-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [QuickPanelComponent],
    imports: [
        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,

        VimboSharedModule,
        MatIconModule,
        RouterModule,
        TranslateModule
    ],
    exports: [QuickPanelComponent]
})
export class QuickPanelModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VimboSharedModule } from '@vimbo/shared.module';
import { NotificationModule } from '@vimbo/components';

import { ContentComponent } from 'app/layout/components/content/content.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    declarations: [ContentComponent],
    imports: [
        RouterModule,
        VimboSharedModule,
        NotificationModule,
        MatChipsModule
    ],
    exports: [ContentComponent]
})
export class ContentModule {}

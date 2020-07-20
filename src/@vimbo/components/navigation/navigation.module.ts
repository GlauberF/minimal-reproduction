import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { TranslateModule } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { VimboNavigationComponent } from './navigation.component';
import { VimboNavVerticalItemComponent } from './vertical/item/item.component';
import { VimboNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { VimboNavVerticalGroupComponent } from './vertical/group/group.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,
        NgxSkeletonLoaderModule,

        TranslateModule.forChild()
    ],
    exports: [VimboNavigationComponent],
    declarations: [
        VimboNavigationComponent,
        VimboNavVerticalGroupComponent,
        VimboNavVerticalItemComponent,
        VimboNavVerticalCollapsableComponent
    ]
})
export class VimboNavigationModule {}

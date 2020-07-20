import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { VimboProgressBarComponent } from './progress-bar.component';

@NgModule({
    declarations: [VimboProgressBarComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule
    ],
    exports: [VimboProgressBarComponent]
})
export class VimboProgressBarModule {}

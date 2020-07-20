import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

// Core Vimbo
import {
    VimboConfirmDialogModule,
    VimboSearchBarModule,
} from '@vimbo/components';
import { VimboSharedModule } from '@vimbo/shared.module';
import { SortPipe } from '@vimbo/pipes/sort.pipe';

// Module
import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';

@NgModule({
    declarations: [ToolbarComponent],
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatTooltipModule,
        MatDialogModule,
        VimboConfirmDialogModule,
        VimboSharedModule,
        VimboSearchBarModule
    ],
    exports: [ToolbarComponent],
    providers: [SortPipe]
})
export class ToolbarModule {}

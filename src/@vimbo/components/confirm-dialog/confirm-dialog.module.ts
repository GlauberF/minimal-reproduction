import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { VimboConfirmDialogComponent } from '@vimbo/components/confirm-dialog/confirm-dialog.component';
import { VimboPipesModule } from '../../pipes/pipes.module';
import { ExtendedModule } from '@angular/flex-layout';

@NgModule({
    declarations: [VimboConfirmDialogComponent],
    imports: [
        MatDialogModule,
        MatButtonModule,
        VimboPipesModule,
        CommonModule,
        ExtendedModule
    ],
    entryComponents: [VimboConfirmDialogComponent]
})
export class VimboConfirmDialogModule {}

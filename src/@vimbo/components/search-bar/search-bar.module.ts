import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { VimboSearchBarComponent } from './search-bar.component';

@NgModule({
    declarations: [VimboSearchBarComponent],
    imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
    exports: [VimboSearchBarComponent]
})
export class VimboSearchBarModule {}

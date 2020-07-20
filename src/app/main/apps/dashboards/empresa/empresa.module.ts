import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

// Core Vimbo
import { VimboSharedModule } from '@vimbo/shared.module';
import { VimboSidebarModule } from '@vimbo/components';

// Auxiliary files
import { AuthGuard } from '@guards/auth.guard';

// Module
import { EmpresaDashboardComponent } from 'app/main/apps/dashboards/empresa/empresa.component';
import { ProjectDashboardService } from 'app/main/apps/dashboards/empresa/services/empresa.service';
import { LazyServiceModuleDashboardEmpresa } from './services/lazy-service.module';
import { TranslateModule } from '@ngx-translate/core';

const MODULE_NAME_VIMBO_STORE = 'dashboard';

const routes: Routes = [
    {
        path: '',
        component: EmpresaDashboardComponent,
        canActivate: [AuthGuard],
        data: {
            moduleVimbo: [MODULE_NAME_VIMBO_STORE],
            roles: [{ operation: 'canView' }]
        },
        resolve: {
            data: ProjectDashboardService
        }
    }
];

@NgModule({
    declarations: [EmpresaDashboardComponent],
    imports: [
        RouterModule.forChild(routes),
        LazyServiceModuleDashboardEmpresa,

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        MatInputModule,
        FormsModule,
        MatBadgeModule,
        MatPaginatorModule,
        VimboSharedModule,
        VimboSidebarModule,
        TranslateModule
    ],
    providers: []
})
export class EmpresaDashboardModule {}

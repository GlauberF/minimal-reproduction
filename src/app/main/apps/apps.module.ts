import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';

const routes = [
    {
        path: 'dashboard/company',
        canLoad: [AuthGuard],
        data: {
            title: 'Dashboard'
        },
        loadChildren: () =>
            import('./dashboards/empresa/empresa.module').then(
                (m) => m.EmpresaDashboardModule
            )
    },

    { path: '', redirectTo: '/apps/dashboard/company', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
        // VimboSharedModule
    ]
})
export class AppsModule {}

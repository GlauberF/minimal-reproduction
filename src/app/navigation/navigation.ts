import { VimboNavigation } from '@vimbo/types';
import { RolesService } from '@vimbo/services/roles.service';

export const navigation: VimboNavigation[] = [
    {
        id: 'menu',
        title: 'Menu',
        type: 'group',
        hidden: () => false,
        children: [
            {
                id: 'dashboards',
                title: 'Dashboard',
                type: 'item',
                icon: 'vb-menu-dashboard',
                tagRenderIcon: 'mat-icon-svg',
                url: '/apps/dashboard/company',
                hidden: () => false
            }
        ]
    }
];

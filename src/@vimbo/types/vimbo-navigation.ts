// tslint:disable-next-line:class-name
export interface _vimboNavigationItem {
    id: string;
    title: string;
    type: 'item' | 'group' | 'collapsable';
    translate?: string;
    icon?: string;
    tagRenderIcon?: 'i' | 'mat-icon' | 'mat-icon-svg';
    // hidden: any;
    hidden: () => Promise<boolean> | boolean;
    url?: string;
    classes?: string;
    exactMatch?: boolean;
    externalUrl?: boolean;
    openInNewTab?: boolean;
    // function?: any;
    function?: () => any;
    badge?: {
        title?: string;
        translate?: string;
        bg?: string;
        fg?: string;
    };
    children?: _vimboNavigationItem[];
    hash?: string;
}

export interface VimboNavigation extends _vimboNavigationItem {
    children?: _vimboNavigationItem[];
}

// tslint:disable-next-line:class-name
export interface VimboHTTP {
    callInProgress: boolean;
    data: any[];
    cursor?: {
        currentPage?: number;
        perPage?: number;
        total?: number;
    };
    action?: 'edit' | 'new' | string;
}

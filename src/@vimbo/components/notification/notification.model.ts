export class NotificationModel {
    message?: any;
    status?:
        | 'info'
        | 'warning'
        | 'warningLight'
        | 'danger'
        | 'ads'
        | 'success'
        | null;
    showButtonConfirm?: boolean;
    textButton?: string;
    timeToClose?: number;
    buttonType?: 'basic' | 'primary' | 'accent' | 'warn' | 'link';
    autoClose?: boolean;
    hiddenClose?: boolean;

    /**
     * Constructor
     *
     * @param notification
     */
    constructor(notification = null) {
        {
            this.message =
                notification && notification.message
                    ? notification.message
                    : null;
            this.status =
                notification && notification.status
                    ? notification.status
                    : null;
            this.showButtonConfirm =
                notification && notification.showButtonConfirm
                    ? notification.showButtonConfirm
                    : null;
            this.textButton =
                notification && notification.textButton
                    ? notification.textButton
                    : null;
            this.timeToClose =
                notification && notification.timeToClose
                    ? notification.timeToClose
                    : null;
            this.buttonType =
                notification && notification.buttonType
                    ? notification.buttonType
                    : null;
            this.autoClose =
                notification && notification.autoClose
                    ? notification.autoClose
                    : null;
            this.hiddenClose =
                notification && notification.hiddenClose
                    ? notification.hiddenClose
                    : null;
        }
    }
}

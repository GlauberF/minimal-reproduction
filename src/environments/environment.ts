// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * Const's
 */
const APIBaseUrl = `api-homolog.vimbo.com.br`;

/**
 * Export
 */
export const environment = {
    production: false,
    hmr: false,
    CoreAPI: `https://${APIBaseUrl}/store/`,
    CoreAPIV1: `https://${APIBaseUrl}/v1/`,
    GraphQLCoreAPI: `https://${APIBaseUrl}/graphql`,
    AuxiliaryNodeAPI: `https://notificacao-homolog.vimbo.com.br/`,
    NodeQueriesAPI: `https://consultas.vimbo.com.br/`,
    GoogleRecaptchaKey: '6Lc7EscUAAAAABPLkpO3CcNVmg9JN1L5FTErRnpg',
    ListItemLimit: 15,
    idCompanyTypeVimbo: '592c09e00028ce218b37c4b1',
    endToEndEncryptionPartialKey: 'v#1#m#b#0',
    echoConfig: {
        userModel: 'user',
        notificationNamespace: null,
        options: {
            broadcaster: 'socket.io',
            // host: `http://52.67.220.133:6001`,
            host: `https://${APIBaseUrl}:8443`,
            authEndpoint: `https://${APIBaseUrl}/broadcasting/auth`,
            disableStats: true,
            debugRawConnectionState: false,
            rememberUpgrade: true,
            transports: ['websocket'],
            secure: true, // SSL
            rejectUnauthorized: false
        }
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

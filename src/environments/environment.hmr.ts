/**
 * Const's
 */
const APIBaseUrl = `api-homolog.vimbo.com.br`;

/**
 * Export
 */
export const environment = {
    production: false,
    hmr: true,
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

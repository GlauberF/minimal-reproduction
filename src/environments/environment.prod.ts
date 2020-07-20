/**
 * Const's
 */
const APIBaseUrl = `api-production.vimbo.com.br`;

/**
 * Export
 */
export const environment = {
    production: true,
    hmr: false,
    CoreAPI: `https://${APIBaseUrl}/store/`,
    CoreAPIV1: `https://${APIBaseUrl}/v1/`,
    GraphQLCoreAPI: `https://${APIBaseUrl}/graphql`,
    AuxiliaryNodeAPI: 'https://notificacao-production.vimbo.com.br/',
    NodeQueriesAPI: 'https://consultas.vimbo.com.br/',
    GoogleRecaptchaKey: '6Lf63Z8UAAAAAMqL_qvrFdlhY-sN978Pt4i4Qx4X',
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

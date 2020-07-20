// isPlataformBrowser
if ( (typeof window !== "undefined") ) {

    // solicita sempre o storage atualizado
    window.parent.postMessage(JSON.stringify({ "storage": "getStorage" }), '*');

    // escuta os eventos
    window.addEventListener("message", function(event) {

        var origemPermitida = event.origin == 'https://app-homologacao.vimbo.com.br' || event.origin == 'https://app.vimbo.com.br' || event.origin == 'http://localhost:3000';

        if (origemPermitida) {
            var dataParsePostMesage = JSON.parse(event.data);

            // seta storage
            if (dataParsePostMesage.finalidade && dataParsePostMesage.finalidade == "login") {
                window.localStorage.currentUser = dataParsePostMesage.currentUser;
                window.localStorage.vbm = dataParsePostMesage.vbm;
                window.localStorage.vimbo_token = dataParsePostMesage.vimbo_token;
                window.localStorage.language = dataParsePostMesage.language;

                // setTimeout(function () {
                //     window.location.reload();
                // }, 200)
            }

            // console.log(dataParsePostMesage)
        }


    });
}
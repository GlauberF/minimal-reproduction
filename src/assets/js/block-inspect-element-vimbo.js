// isPlataformBrowser
if ( (typeof window !== "undefined") ) {

    /* eslint-disable spaced-comment */
    /*!
        devtools-detect
        Detect if DevTools is open
        https://github.com/sindresorhus/devtools-detect
        by Sindre Sorhus
        MIT License
    */
    (function() {
        'use strict';
        var devtools = {
            open: false,
            orientation: null
        };
        var threshold = 160;
        var emitEvent = function(state, orientation) {
            window.dispatchEvent(new CustomEvent('devtoolschange', {
                detail: {
                    open: state,
                    orientation: orientation
                }
            }));
        };

        setInterval(function() {
            var widthThreshold = window.outerWidth - window.innerWidth > threshold;
            var heightThreshold = window.outerHeight - window.innerHeight > threshold;
            var orientation = widthThreshold ? 'vertical' : 'horizontal';

            if (!(heightThreshold && widthThreshold) &&
                ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
                if (!devtools.open || devtools.orientation !== orientation) {
                    emitEvent(true, orientation);
                }

                devtools.open = true;
                devtools.orientation = orientation;
            } else {
                if (devtools.open) {
                    emitEvent(false, null);
                }

                devtools.open = false;
                devtools.orientation = null;
            }
        }, 500);

        if (typeof module !== 'undefined' && module.exports) {
            module.exports = devtools;
        } else {
            window.devtools = devtools;
        }
    })();

    if (window.console) {
        // window.console.log("%c Este é um recurso do navegador destinado aos desenvolvedores, não cole qualquer código aqui fornecido por outra pessoa. Você pode comprometer sua conta, como ser banido da plataforma ou ter outros efeitos colaterais negativos.", "font-weight: bold; font-size: 14px;color: #d9534f;");
        window.console.warn("%c This is a browser feature intended for developers, do not paste any code provided here by someone else. You can compromise your account, such as being banned from the platform or having other negative side effects.", "font-weight: bold; font-size: 14px;color: #d9534f;");
    }

    /**
     * Check is mobile
     * @type {{BlackBerry: (function(): RegExpMatchArray), Windows: (function(): RegExpMatchArray), iOS: (function(): RegExpMatchArray), any: (function(): (*|RegExpMatchArray)), Opera: (function(): RegExpMatchArray), Android: (function(): RegExpMatchArray)}}
     */
    var isMobileConsole = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobileConsole.Android() || isMobileConsole.BlackBerry() || isMobileConsole.iOS() || isMobileConsole.Opera() || isMobileConsole.Windows());
        }
    };

// Devtools
// função que imprime, limpa storage e faz reload
    function actionOnOpenDevtool() {
        // var txtBlockInspect = '\n' +
        // 	'Feche o console do desenvolvedor e atualize a página!' +
        // 	'<br><br>' +
        // 	'Close developer console and refresh page!'
        // var span = $('<span id="closeredictvimbo" style="text-align: center; padding-top: 60px;">'+ txtBlockInspect +'</span>');
        // $("html").replaceWith(span);
        var txtBlockInspect = '' +
            '<body oncontextmenu="return false;" style="text-align: center;padding-top: 60px;">\n' +
            '    <span id="closeredictvimbo" style="text-align: center; padding-top: 60px;">\n' +
            '      Feche o console do desenvolvedor e atualize a página!\n' +
            '      <br><br>\n' +
            '      Close developer console and refresh page!\n' +
            '      <br><br><br><br>\n' +
            '      <span style="color: red;">Por questões de segurança, seu IP consta em nossa base de dados como suspeito.</span> \n' +
            '    </span>\n' +
            '  </body>';
        document.write(txtBlockInspect);

        // limpa storage
        window.localStorage.clear();

        setTimeout(function() {
            window.location.reload();
        }, 2000);
    }

    /**
     * Get Function
     */
    if (window.location.host != 'localhost:4200' && !isMobileConsole.any()) {

        if (window.devtools.open) {
            if (!parent.window.parent.length || parent.window.parent.length == 0) {
                actionOnOpenDevtool();
            }
        }

        window.addEventListener('devtoolschange', function(e) {
            if (e.detail.open) {
                if (!parent.window.parent.length || parent.window.parent.length == 0) {
                    actionOnOpenDevtool();
                }
            }
        });

        document.addEventListener('keydown', function(event) {
            // console.log('event: ',event)
        });

        window.onload = function() {
            document.addEventListener("contextmenu", function(e) {
                e.preventDefault();
            }, false);
            document.addEventListener("keydown", function(e) {
                //document.onkeydown = function(e) {
                // "I" key
                if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
                    disabledEvent(e);
                }
                // "J" key
                if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
                    disabledEvent(e);
                }
                // "S" key + macOS
                if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                    disabledEvent(e);
                }
                // "U" key
                if (e.ctrlKey && e.keyCode == 85) {
                    disabledEvent(e);
                }
                // "F12" key
                if (event.keyCode == 123) {
                    disabledEvent(e);
                }
            }, false);

            function disabledEvent(e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                } else if (window.event) {
                    window.event.cancelBubble = true;
                }
                e.preventDefault();
                return false;
            }
        }

        // $(document).keydown(function (e) {
        //     if (e.which === 123) {
        //         return false;
        //     }
        //     if (e.ctrlKey && (e.keyCode === 85)) {
        //         return false;
        //     }
        //     if (e.ctrlKey && e.shiftKey && (e.keyCode === 74 || e.keyCode === 73)) {
        //         return false;
        //     }
        //
        // });

    }

}
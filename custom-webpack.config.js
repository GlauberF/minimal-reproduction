const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
// const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
// const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    plugins: [
        new MomentLocalesPlugin({
            localesToKeep: ['en', 'pt']
        })
        // new ImageminWebpWebpackPlugin({
        //     config: [
        //         {
        //             test: /\.(jpe?g|png)/,
        //             options: {
        //                 quality: 75
        //             }
        //         }
        //     ],
        //     overrideExtension: true,
        //     detailedLogs: false,
        //     silent: false,
        //     strict: true
        // })
        /*new JavaScriptObfuscator ({
            rotateUnicodeArray: true
        }, ['vendor.*'])*/
    ]
};

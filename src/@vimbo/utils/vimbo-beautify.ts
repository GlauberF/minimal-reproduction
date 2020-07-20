/**
 * Utility class to make Beautify of strings
 */
export class VimboBeautify {
    /**
     * Format String XML
     * @param stringXML
     * @param tab
     */
    public static xml(stringXML: string, tab: string = '\t'): string {
        let formatted = '';
        let indent = '';

        stringXML.split(/>\s*</).forEach((node) => {
            // decrease indent by one 'tab'
            if (node.match(/^\/\w/)) {
                indent = indent.substring(tab.length);
            }
            formatted += indent + '<' + node + '>\r\n';
            // increase indent
            if (node.match(/^<?\w[^>]*[^\/]$/)) {
                indent += tab;
            }
        });

        return formatted.substring(1, formatted.length - 3);
    }

    /**
     * Format Json String
     * @param value
     * @param space
     * eg space:
     * - Space 4
     * - Tab '\t'
     */
    public static formatJsonString(
        value: object | Array<any>,
        space: string | number = 4
    ): string {
        return JSON.stringify(
            value,
            (key, val): any => {
                return typeof val === 'function' ? val.toString() : val;
            },
            space
        );
    }
}

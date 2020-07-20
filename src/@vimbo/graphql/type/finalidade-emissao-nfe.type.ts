/*
 *
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 14:42
 */

export class FinalidadeEmissaoNfeType {
    public static fields(): string[] {
        return [
            '_id',
            'fen_codigo',
            'fen_descricao',
            'data_criacao',
            'data_alteracao'
        ];
    }
}

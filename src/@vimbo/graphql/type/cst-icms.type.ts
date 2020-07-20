/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 14:36
 */

export class CstIcmsType {
    public static fields(): string[] {
        return [
            '_id',
            'cic_codigo',
            'cic_descricao',
            'data_criacao',
            'data_alteracao'
        ];
    }
}

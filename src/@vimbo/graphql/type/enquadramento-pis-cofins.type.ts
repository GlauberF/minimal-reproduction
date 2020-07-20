/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 14:50
 */

export class EnquadramentoPisCofinsType {
    public static fields(): string[] {
        return [
            '_id',
            'epc_codigo',
            'epc_descricao',
            'epc_tipo',
            'epc_rpis',
            'epc_rcof',
            'data_criacao',
            'data_alteracao'
        ];
    }
}

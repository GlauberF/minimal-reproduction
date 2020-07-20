/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 14:29
 */

export class CstIpiType {
    public static fields(): string[] {
        return [
            '_id',
            'cip_codigo',
            'cip_descricao',
            'cip_tipo',
            'eni_id_enquadramento',
            'cip_ripi',
            'data_criacao',
            'data_alteracao'
        ];
    }
}

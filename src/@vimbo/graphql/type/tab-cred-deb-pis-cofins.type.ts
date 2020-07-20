/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 14:53
 */

export class TabCredDebPisCofinsType {
    public static fields(): string[] {
        return [
            '_id',
            'tcd_grupo',
            'tcd_codigo',
            'tcd_descricao',
            'tcd_ncm',
            'tcd_tipo',
            'data_criacao',
            'data_alteracao'
        ];
    }
}

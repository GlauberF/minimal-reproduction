/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 15:08
 */

export class NbsType {
    public static fields(): string[] {
        return [
            '_id',
            'nbs_codigo',
            'nbs_descricao',
            'data_criacao',
            'data_alteracao'
        ];
    }
}

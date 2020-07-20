/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 14:26
 */

export class CsosnType {
    public static fields(): string[] {
        return [
            '_id',
            'cso_codigo',
            'cso_descricao',
            'cso_classificacao',
            'data_criacao',
            'data_alteracao'
        ];
    }
}

/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 14:32
 */

export class EnquadramentoIpiType {
    public static fields(): string[] {
        return [
            '_id',
            'eni_codigo',
            'eni_descricao',
            'data_criacao',
            'data_alteracao'
        ];
    }
}

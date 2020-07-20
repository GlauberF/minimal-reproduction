/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 15:03
 */

export class UnidadesMedidasCteType {
    public static fields(): string[] {
        return [
            '_id',
            'umc_codigo',
            'umc_sigla',
            'umc_descricao',
            'data_criacao',
            'data_alteracao'
        ];
    }
}

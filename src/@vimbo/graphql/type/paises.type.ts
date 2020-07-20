/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 15:18
 */

export class PaisesType {
    public static fields(): string[] {
        return [
            '_id',
            'pai_codigo',
            'pai_nome',
            'pai_sigla',
            'data_criacao',
            'data_alteracao'
        ];
    }
}

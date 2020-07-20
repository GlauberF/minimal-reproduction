/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 14:23
 */

// export const cfopType = `
//   {
//     _id
//     cfo_codigo
//     cfo_descricao
//     cfo_aplicacao
//     cfo_tipo
//     data_criacao
//     data_alteracao
//   }
// `;

export class CfopType {
    public static fields(): string[] {
        return [
            '_id',
            'cfo_codigo',
            'cfo_descricao',
            'cfo_aplicacao',
            'cfo_tipo',
            'data_criacao',
            'data_alteracao'
        ];
    }
}

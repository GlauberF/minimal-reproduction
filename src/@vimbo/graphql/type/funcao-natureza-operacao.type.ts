/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 14:40
 */

import { FinalidadeEmissaoNfeType } from './finalidade-emissao-nfe.type';

export const funcaoNaturezaOperacaoType = `
    _id
    fno_descricao
    fno_tipo
    fen_id_finalidade_emissao {
        ${FinalidadeEmissaoNfeType.fields().join(' ')}
    }
    data_criacao
    data_alteracao
`;

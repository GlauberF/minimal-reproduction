/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 14:12
 */

import { naturezaOperacaoType } from './natureza-operacao.type';

export const tipoItemType = `
    _id
    tpi_codigo
    tpi_descricao
    nat_id_entrada {
        ${naturezaOperacaoType}
    }
    nat_id_saida {
        ${naturezaOperacaoType}
    }
    tpi_conta
    tpi_util
    data_criacao
    data_alteracao
`;

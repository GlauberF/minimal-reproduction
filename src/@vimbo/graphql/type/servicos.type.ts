/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 14:11
 */

import { naturezaOperacaoType } from './natureza-operacao.type';
import { tipoItemType } from './tipo-item.type';
import { unidadesMedidasType } from './unidades-medidas.type';
import { tipoServicoType } from './tipo-servico.type';
import { cidadesType } from './cidades.type';

/**
 * All data
 */
export const servicosType = `
    _id
    emp_id
    ser_codigo_interno
    ser_descricao
    uni_id_medida {
        ${unidadesMedidasType}
    }
    cid_id_prestacao {
        ${cidadesType}
    }
    tpi_id_tipo {
        ${tipoItemType}
    }
    tps_id_tipser {
        ${tipoServicoType}
    }
    ser_vl_venda
    ser_comissao
    ser_obs
    ser_img
    ser_lucro
    nat_id {
        ${naturezaOperacaoType}
    }
    data_criacao
    data_alteracao
`;

/**
 * Data only required for CRUD listing
 */
export const listServicosType = `
   _id
    ser_codigo_interno
    ser_img
    ser_descricao
    data_alteracao
`;

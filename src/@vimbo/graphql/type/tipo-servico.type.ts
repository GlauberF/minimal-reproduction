/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 15:06
 */

import { NbsType } from './nbs.type';

export const tipoServicoType = `
    _id
    tps_codigo
    tps_descricao
    tps_prestacao
    nbs_id {
        ${NbsType.fields().join(' ')}
    }
    tps_ret_iss
    tps_ret_irrf
    tps_ret_inss
    tps_ret_cofins
    tps_ret_pis
    tps_ret_csll
    tps_iss
    data_criacao
    data_alteracao
`;

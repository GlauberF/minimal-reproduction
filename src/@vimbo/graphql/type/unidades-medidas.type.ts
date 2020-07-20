/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 15:02
 */

import { UnidadesMedidasCteType } from './unidades-medidas-cte.type';

export const unidadesMedidasType = `
    _id
    emp_id
    uni_codigo
    uni_descricao
    umc_id_cte {
        ${UnidadesMedidasCteType.fields().join(' ')}
    }
    uni_conversao
    uni_observacao
    data_criacao
    data_alteracao
`;

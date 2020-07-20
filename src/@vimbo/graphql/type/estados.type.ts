/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 15:17
 */

import { PaisesType } from './paises.type';

export const estadosType = `
    _id
    est_codigo
    est_nome
    est_sigla
    pai_id_pais {
        ${PaisesType.fields().join(' ')}
    }
    est_masc
    est_qual
    est_aliq_int
    est_aliq_intt
    est_cpobr
    data_criacao
    data_alteracao
`;

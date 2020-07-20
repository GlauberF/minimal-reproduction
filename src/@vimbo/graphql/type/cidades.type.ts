/*
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 15:15
 */

import { estadosType } from './estados.type';

export const cidadesType = `
    _id
    cid_nome
    cid_codigo_ibge
    est_id_estado {
        ${estadosType}
    }
    data_criacao
    data_alteracao
`;

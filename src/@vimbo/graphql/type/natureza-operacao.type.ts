/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 14:17
 */

import { CfopType } from './cfop.type';
import { CsosnType } from './csosn.type';
import { CstIpiType } from './cstIpi.type';
import { EnquadramentoIpiType } from './enquadramento-ipi.type';
import { InformacoesComplementaresType } from './Informacoes-complementares.type';
import { CstIcmsType } from './cst-icms.type';
import { funcaoNaturezaOperacaoType } from './funcao-natureza-operacao.type';
import { ModalidadeDeterminacaoBcIcmsStType } from './modalidade-determinacao-bc-icms-st.type';
import { ModalidadeDeterminacaoBcIcmsType } from './modalidade-determinacao-bc-icms.type';
import { EnquadramentoPisCofinsType } from './enquadramento-pis-cofins.type';
import { TabCredDebPisCofinsType } from './tab-cred-deb-pis-cofins.type';
import { IncidenciaTributariaEfdContribuicaoType } from './incidencia-tributaria-efd-contribuicao.type';

export const naturezaOperacaoType = `
   _id
    emp_id
    nat_codigo
    nat_descricao
    nat_datafim
    cfo_id_scfop {
        ${CfopType.fields().join(' ')}
    }
    nat_mov_est
    cfo_id_dufn {
        ${CfopType.fields().join(' ')}
    }
    cfo_id_fufn {
        ${CfopType.fields().join(' ')}
    }
    cfo_id_dufc {
        ${CfopType.fields().join(' ')}
    }
    cfo_id_fufc {
        ${CfopType.fields().join(' ')}
    }
    cfo_id_dufce {
        ${CfopType.fields().join(' ')}
    }
    cfo_id_fufce {
        ${CfopType.fields().join(' ')}
    }
    cfo_id_dufne {
        ${CfopType.fields().join(' ')}
    }
    cfo_id_fufne {
        ${CfopType.fields().join(' ')}
    }
    cso_id_csosn_e {
        ${CsosnType.fields().join(' ')}
    }
    cso_id_csosn_s {
        ${CsosnType.fields().join(' ')}
    } 
    cip_id_ss {
        ${CstIpiType.fields().join(' ')}
    }
    eni_id_ipis {
        ${EnquadramentoIpiType.fields().join(' ')}
    }
    cip_id_cst_ipi_ne {
        ${CstIpiType.fields().join(' ')}
    }
    cip_id_cst_ipi_ns {
        ${CstIpiType.fields().join(' ')}
    }
    eni_id_ipin {
        ${EnquadramentoIpiType.fields().join(' ')}
    }
    nat_aliq_ipi
    inc_id_ipi_inf {
        ${InformacoesComplementaresType.fields().join(' ')}
    }
    cic_id_icms_cst {
        ${CstIcmsType.fields().join(' ')}
    }
    nat_icms_rbase
    nat_icms_aliq
    nat_icms_mvan
    nat_icms_mvas
    inc_id_icms_inf {
        ${InformacoesComplementaresType.fields().join(' ')}
    }
    nat_fcp
    mis_id_mbcst {
        ${ModalidadeDeterminacaoBcIcmsStType.fields().join(' ')}
    }
    mic_id_mbc {
        ${ModalidadeDeterminacaoBcIcmsType.fields().join(' ')}
    }
    nat_ppauta
    nat_ptab
    nat_ppauta_st
    nat_ptab_st
    epc_id_cst_ss {
        ${EnquadramentoPisCofinsType.fields().join(' ')}
    }
    epc_id_cst_snc {
        ${EnquadramentoPisCofinsType.fields().join(' ')}
    }
    tcd_id_debc {
        ${TabCredDebPisCofinsType.fields().join(' ')}
    }
    epc_id_cst_enn {
        ${EnquadramentoPisCofinsType.fields().join(' ')}
    }
    tcd_id_cren {
        ${TabCredDebPisCofinsType.fields().join(' ')}
    }
    tcd_id_debn {
        ${TabCredDebPisCofinsType.fields().join(' ')}
    }
    itr_id_indcum {
        ${IncidenciaTributariaEfdContribuicaoType.fields().join(' ')}
    }
    inc_id_pc_inf {
        ${InformacoesComplementaresType.fields().join(' ')}
    }
    nat_pc_al_valor_pis
    nat_pc_al_valor_cof
    nat_pc_al_porc_pis
    nat_pc_al_porc_cof
    nat_mov_fin
    nat_replica_empresas
    data_criacao
    data_alteracao
    fno_id_funcao {
        ${funcaoNaturezaOperacaoType}
    }
`;

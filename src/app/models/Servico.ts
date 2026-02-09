

//npm i text-mask-addons --save
//https://github.com/text-mask/text-mask/tree/master/addons/#readme

import { ArquivoProcad, ArtefatoCras, RecadastramentoCamaragibe, VisitaRecadastramento } from "./Modelo";

export class servico {

    static codigo = null;
    static pessoaSelecionada: any = null;
    static sexos: any[] = null;
    static escolas: any[] = null;
    static estadoCivil: any[] = null;
    static racas: any[] = null;
    static recadastramento: RecadastramentoCamaragibe = null;
    static visita: VisitaRecadastramento = null;
    static arquivos: ArquivoProcad[] = [];
    static arquivo: ArquivoProcad = null;
    static visitas: VisitaRecadastramento[] = [];
    static recadastramentos: RecadastramentoCamaragibe[] = [];
    static enviaDados: boolean = false;
    static usuarioLogado: any = null;
    static image: any = null;
    static nome: String = null;

    static dataUltimoAcessoApp : Date = null;

    static cras = null;

    static municipio: String = null;

    static temMensagemNova: boolean = false;

    static historico: any = null;

    static unidades: any[] = null;

    static unidade: any = null;

    static mensagens: any = null;

    // padrao

    static raiz : any;

    static tipoDocumento: number;
    
    static contexto: any = new Object();

    static mascaras: any = {
        cpf: [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/],
        data: [/\d/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/],
        cep: [/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/],
        celular: ['(',/\d/,/\d/,')',/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/],
        
    }
    
}
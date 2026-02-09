import { Mentor } from "src/app/models/Mentor";

const fotoAbordagem = async (image: any, atendimento: any) => {
    const base64 = await fetch(image);    
    const blob = await base64.blob();
    let formData = new FormData();
    formData.append('arquivo', blob);
    formData.append('varCodigo', atendimento.codigo + '');
    formData.append('extensaoFoto', atendimento.extensaoFoto + '');

    var oReq = new XMLHttpRequest();
    oReq.open(
      'POST',
      Mentor.UrlRequest + 'jsp/salvarFotoAbordagem.jsp',
      true
    );
    oReq.send(formData);
}

const arquivoAbordagem = async (arquivo: any, retorno: any) => {
    const base64Response = await fetch(arquivo.base64);

    const blob = await base64Response.blob();

    const formData = new FormData();

    formData.append("arquivo", blob);
    formData.append("varCodigo", retorno.codigo);
    formData.append("extensao", retorno.extensao);
    var oReq = new XMLHttpRequest();
    oReq.open(
      'POST',
      Mentor.UrlRequest + 'jsp/salvarArquivosBuscaAtiva.jsp',
      true
    );

    oReq.send(formData);
}

export const envioAbordagem = {
    fotoAbordagem,
    arquivoAbordagem
};
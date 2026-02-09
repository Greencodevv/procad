
<%@page import="br.com.acesso.beans.Funcionarios"%>
<%@page import="mentor.transaction.util.MTG"%><%@page import="mentor.MeuRequest"%><%@page import="mentor.repositorioArquivo.Controlador2"%><%

response.addHeader("Access-Control-Allow-Origin", "*");

try{
MeuRequest meuRequest = new MeuRequest(request);
Object fileObj = meuRequest.getAttribute("arquivo");

System.out.println("arquivo attr = " + fileObj);

if (fileObj == null) {
    throw new RuntimeException("Arquivo não chegou no JSP");
}
System.out.println("estou no upload");


String tm = meuRequest.getParameter("transacaoMentor");
System.out.println("up -- " + tm + "-");

 {
	
	out.println("id" + meuRequest.getParameter("id"));

	// codigo do usuário logado no app
	
	Controlador2.salvaArquivoApacheUpload(meuRequest.getParameter("classe"), meuRequest.getParameter("tipo"), Integer.parseInt(meuRequest.getParameter("id")), meuRequest.getParameter("codigo"), (org.apache.commons.fileupload.FileItem) meuRequest.getAttribute("arquivo"), meuRequest.getParameter("parametrosExtra"));
} 
}catch(Exception e){
	e.printStackTrace();
	
}


%>
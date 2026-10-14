<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%><%
// Gera o numeroOrdem da visita salva pelo app.
// Publicar no servidor em jsp/appProcad/numeroOrdemVisita.jsp
// Parâmetro: codigoVisita. Retorno: {"numeroOrdem": N} ou {"erro": "..."}
//
// Pré-requisito no banco (uma vez só):
//   CREATE SEQUENCE seq_numero_ordem_visita;
//   ALTER TABLE visita_recadastramento ADD COLUMN numero_ordem integer UNIQUE;

response.addHeader("Access-Control-Allow-Origin", "*");

java.sql.Connection conexao = null;
java.util.Map<String, Object> saida = new java.util.HashMap<String, Object>();

try {
    int codigoVisita = Integer.parseInt(request.getParameter("codigoVisita"));

    javax.naming.Context ct = new javax.naming.InitialContext();
    mentor.banco.DbManager dbm = (mentor.banco.DbManager) ct.getEnvironment().get("dbm");
    if (dbm == null) {
        throw new Exception("O servico do pool nao foi inicializado");
    }
    conexao = dbm.getConnection();

    // nextval é atômico: duas visitas salvas ao mesmo tempo nunca recebem o mesmo número.
    // "numero_ordem IS NULL" deixa a chamada repetível: a visita não ganha um segundo número.
    java.sql.PreparedStatement ps = conexao.prepareStatement(
        "UPDATE visita_recadastramento SET numero_ordem = nextval('seq_numero_ordem_visita') " +
        "WHERE codigo = ? AND numero_ordem IS NULL RETURNING numero_ordem");
    ps.setInt(1, codigoVisita);
    java.sql.ResultSet rs = ps.executeQuery();

    if (rs.next()) {
        saida.put("numeroOrdem", rs.getInt(1));
    } else {
        // Já tinha número (ou a visita não existe): devolve o que está gravado
        java.sql.PreparedStatement psAtual = conexao.prepareStatement(
            "SELECT numero_ordem FROM visita_recadastramento WHERE codigo = ?");
        psAtual.setInt(1, codigoVisita);
        java.sql.ResultSet rsAtual = psAtual.executeQuery();
        if (rsAtual.next()) {
            saida.put("numeroOrdem", rsAtual.getInt(1));
        } else {
            saida.put("erro", "Visita " + codigoVisita + " nao encontrada");
        }
        rsAtual.close();
        psAtual.close();
    }
    rs.close();
    ps.close();

    if (!conexao.getAutoCommit()) {
        conexao.commit();
    }
} catch (Exception e) {
    e.printStackTrace();
    if (conexao != null && !conexao.getAutoCommit()) {
        conexao.rollback();
    }
    saida.put("erro", String.valueOf(e.getMessage()));
} finally {
    if (conexao != null) {
        conexao.close();
    }
}

out.print(com.alibaba.fastjson.JSON.toJSONString(saida));
%>

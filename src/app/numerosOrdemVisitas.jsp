<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%><%
// Lista os números de ordem gerados nas visitas do entrevistador.
// Publicar no servidor em jsp/appProcad/numerosOrdemVisitas.jsp
// Parâmetro: codigoEntrevistador. Retorno: {"ordens": [{codigoVisita, numeroOrdem, dataVisita, nome, endereco}]} ou {"erro": "..."}
//
// Conferir no banco os nomes das colunas de chave estrangeira usados abaixo:
//   visita_recadastramento.responsavel_visita -> funcionarios.codigo
//   visita_recadastramento.visitado           -> recadastramento_camaragibe.codigo

response.addHeader("Access-Control-Allow-Origin", "*");

java.sql.Connection conexao = null;
java.util.Map<String, Object> saida = new java.util.HashMap<String, Object>();

try {
    int codigoEntrevistador = Integer.parseInt(request.getParameter("codigoEntrevistador"));

    javax.naming.Context ct = new javax.naming.InitialContext();
    mentor.banco.DbManager dbm = (mentor.banco.DbManager) ct.getEnvironment().get("dbm");
    if (dbm == null) {
        throw new Exception("O servico do pool nao foi inicializado");
    }
    conexao = dbm.getConnection();

    java.sql.PreparedStatement ps = conexao.prepareStatement(
        "SELECT v.codigo, v.numero_ordem, to_char(v.data_visita, 'DD/MM/YYYY') AS data_visita, r.nome, r.endereco " +
        "FROM visita_recadastramento v " +
        "LEFT JOIN recadastramento_camaragibe r ON r.codigo = v.visitado " +
        "WHERE v.responsavel_visita = ? AND v.numero_ordem IS NOT NULL " +
        "ORDER BY v.numero_ordem DESC");
    ps.setInt(1, codigoEntrevistador);
    java.sql.ResultSet rs = ps.executeQuery();

    java.util.List<java.util.Map<String, Object>> ordens = new java.util.ArrayList<java.util.Map<String, Object>>();
    while (rs.next()) {
        java.util.Map<String, Object> ordem = new java.util.HashMap<String, Object>();
        ordem.put("codigoVisita", rs.getInt("codigo"));
        ordem.put("numeroOrdem", rs.getInt("numero_ordem"));
        ordem.put("dataVisita", rs.getString("data_visita"));
        ordem.put("nome", rs.getString("nome"));
        ordem.put("endereco", rs.getString("endereco"));
        ordens.add(ordem);
    }
    rs.close();
    ps.close();

    saida.put("ordens", ordens);
} catch (Exception e) {
    e.printStackTrace();
    saida.put("erro", String.valueOf(e.getMessage()));
} finally {
    if (conexao != null) {
        conexao.close();
    }
}

out.print(com.alibaba.fastjson.JSON.toJSONString(saida));
%>

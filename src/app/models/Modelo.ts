

// codigo gerado automaticamente pelo mentor transacao 1881

import { Mentor } from '../models/Mentor'
import { servico } from '../models/Servico';


function replaceAll(palavra, de, para) {
	var str = palavra;
	var pos = str.indexOf(de);
	while (pos > -1) {
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
	return (str);
}

export class formatadoLista {
	public de: number;
	public para: String;
	constructor(de: number, para: String) {
		this.de = de;
		this.para = para;
	}
}
export class ionicClasseBase {
	public ionicIndiceRepositorio: number;
	public ionicFlagConcluido: boolean
	public ionicFlagNovo: boolean
	public base64: string
	public idApp: string
	public nomeApp: string
	public temValorB(nome: String) {
		if (this[nome + ""] == null || this[nome + ""] == '') return false;
		if (this[nome + 'FormatadoLista'] != null && this[nome + 'FormatadoLista'][this[nome + ''] - 0] != null) return true;
		if (this[nome + ''] == 0) return false;
		return true;
	}
	public temValor(nome: String) {
		if (this.temValorB(nome)) return '&#9989;';
		else return '&#10060;';
	}
}

export class Sexo extends ionicClasseBase {
	public static mentorNomeClasse = 'br.com.acesso.beans.Sexo';

	static criaColecao(lista: any) {
		if (lista != null) {
			var retorno = new Array();
			for (let x = 0; x < lista.length; x++)
				retorno.push(new Sexo(lista[x]));
			return retorno;
		}
	}

	public codigo: number = 0;
	public codigo_: String;
	get codigoSimNao() { if (this.codigo == 1) return true; else return false; }
	set codigoSimNao(flag) { if (flag) this.codigo = 1; else this.codigo = 0; }
	get codigoFormatado(): String {
		return (this.codigo_)
	}
	set codigoFormatado(valor: String) {
		this.codigo_ = (valor);
		if (replaceAll(valor, " ", "") != "")
			this.codigo = Mentor.stringToMoeda(valor);
	}

	public descricao: String = '';
	public descricao_: String;

	public listaAtributosKodefy: Array<string> = 'codigo#descricao#'.split('#');
	constructor(objeto: any) {
		super();
		if (objeto != null && objeto != 'null') {
			if (typeof (objeto.ionicFlagNovo) == 'undefined') this.ionicFlagNovo = false; else this.ionicFlagNovo = objeto.ionicFlagNovo;
			this.idApp = objeto.idApp;
			this.nomeApp = objeto.nomeApp;
			this.codigo = objeto.codigo;
			this.codigo_ = Mentor.intToString(this.codigo);
			this.descricao = objeto.descricao;

		}
		else {
			if ((objeto) == 'null') {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';

			} else {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';

			}
		}


	}

}


export class Funcionarios extends ionicClasseBase {
	public static mentorNomeClasse = 'br.com.acesso.beans.Funcionarios';

	static criaColecao(lista: any) {
		if (lista != null) {
			var retorno = new Array();
			for (let x = 0; x < lista.length; x++)
				retorno.push(new Funcionarios(lista[x]));
			return retorno;
		}
	}
	public unidadesAdministrativas: RlcFuncionarioUnidade[];

	public listaAtributosKodefy: Array<string> = ''.split('#');
	constructor(objeto: any) {
		super();
		if (objeto != null && objeto != 'null') {
			if (typeof (objeto.ionicFlagNovo) == 'undefined') this.ionicFlagNovo = false; else this.ionicFlagNovo = objeto.ionicFlagNovo;
			this.idApp = objeto.idApp;
			this.nomeApp = objeto.nomeApp;
			this.unidadesAdministrativas = new Array();

			if (objeto.unidadesAdministrativas != null) {
				for (let x: number = 0; x < objeto.unidadesAdministrativas.length; x++)
					this.unidadesAdministrativas.push(new RlcFuncionarioUnidade(objeto.unidadesAdministrativas[x]))
			}

		}
		else {
			if ((objeto) == 'null') {
				this.ionicFlagNovo = true;

			} else {
				this.ionicFlagNovo = true;

			}
		}


	}

}


export class UnidadeAdministrativa extends ionicClasseBase {
	public static mentorNomeClasse = 'br.com.acesso.beans.UnidadeAdministrativa';

	static criaColecao(lista: any) {
		if (lista != null) {
			var retorno = new Array();
			for (let x = 0; x < lista.length; x++)
				retorno.push(new UnidadeAdministrativa(lista[x]));
			return retorno;
		}
	}

	public codigo: number = 0;
	public codigo_: String;
	get codigoSimNao() { if (this.codigo == 1) return true; else return false; }
	set codigoSimNao(flag) { if (flag) this.codigo = 1; else this.codigo = 0; }
	get codigoFormatado(): String {
		return (this.codigo_)
	}
	set codigoFormatado(valor: String) {
		this.codigo_ = (valor);
		if (replaceAll(valor, " ", "") != "")
			this.codigo = Mentor.stringToMoeda(valor);
	}

	public nome: String = '';
	public nome_: String;

	public listaAtributosKodefy: Array<string> = 'codigo#nome#'.split('#');
	constructor(objeto: any) {
		super();
		if (objeto != null && objeto != 'null') {
			if (typeof (objeto.ionicFlagNovo) == 'undefined') this.ionicFlagNovo = false; else this.ionicFlagNovo = objeto.ionicFlagNovo;
			this.idApp = objeto.idApp;
			this.nomeApp = objeto.nomeApp;
			this.codigo = objeto.codigo;
			this.codigo_ = Mentor.intToString(this.codigo);
			this.nome = objeto.nome;

		}
		else {
			if ((objeto) == 'null') {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';

			} else {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';

			}
		}


	}

}


export class ArtefatoCras extends ionicClasseBase {
	public static mentorNomeClasse = 'br.com.assistenciaSocial.beans.ArtefatoCras';

	static criaColecao(lista: any) {
		if (lista != null) {
			var retorno = new Array();
			for (let x = 0; x < lista.length; x++)
				retorno.push(new ArtefatoCras(lista[x]));
			return retorno;
		}
	}

	public codigo: number = 0;
	public codigo_: String;
	get codigoSimNao() { if (this.codigo == 1) return true; else return false; }
	set codigoSimNao(flag) { if (flag) this.codigo = 1; else this.codigo = 0; }
	get codigoFormatado(): String {
		return (this.codigo_)
	}
	set codigoFormatado(valor: String) {
		this.codigo_ = (valor);
		if (replaceAll(valor, " ", "") != "")
			this.codigo = Mentor.stringToMoeda(valor);
	}

	public descricao: String = '';
	public descricao_: String;

	public flagUpload: number = 0;
	public flagUpload_: String;
	get flagUploadSimNao() { if (this.flagUpload == 1) return true; else return false; }
	set flagUploadSimNao(flag) { if (flag) this.flagUpload = 1; else this.flagUpload = 0; }
	get flagUploadFormatado(): String {
		return (this.flagUpload_)
	}
	set flagUploadFormatado(valor: String) {
		this.flagUpload_ = (valor);
		if (replaceAll(valor, " ", "") != "")
			this.flagUpload = Mentor.stringToMoeda(valor);
	}

	public extensao: String = '';
	public extensao_: String;

	public dataUpload: Date = null;
	public dataUpload_: String;
	get dataUploadFormatado(): String {
		if (typeof (this.dataUpload) != 'undefined' && this.dataUpload != null)
			return Mentor.dateToString(this.dataUpload);
		else
			return '';
	}
	set dataUploadFormatado(valor: String) {
		this.dataUpload_ = valor;
		if (replaceAll(this.dataUpload_, "_", "").length == 10)
			this.dataUpload = Mentor.stringToDate(valor);
	}
	get dataUploadFormatadoIso(): String {
		return Mentor.dateToStringIso(this.dataUpload)
	}
	set dataUploadFormatadoIso(valor: String) {
		this.dataUpload = Mentor.stringToDateIso(valor);
		this.dataUpload_ = Mentor.dateToString(this.dataUpload);
	}

	public flagApp: number = 0;
	public flagApp_: String;
	get flagAppSimNao() { if (this.flagApp == 1) return true; else return false; }
	set flagAppSimNao(flag) { if (flag) this.flagApp = 1; else this.flagApp = 0; }
	get flagAppFormatado(): String {
		return (this.flagApp_)
	}
	set flagAppFormatado(valor: String) {
		this.flagApp_ = (valor);
		if (replaceAll(valor, " ", "") != "")
			this.flagApp = Mentor.stringToMoeda(valor);
	}

	public listaAtributosKodefy: Array<string> = 'codigo#descricao#flagUpload#extensao#dataUpload#flagApp#'.split('#');
	constructor(objeto: any) {
		super();
		if (objeto != null && objeto != 'null') {
			if (typeof (objeto.ionicFlagNovo) == 'undefined') this.ionicFlagNovo = false; else this.ionicFlagNovo = objeto.ionicFlagNovo;
			this.idApp = objeto.idApp;
			this.nomeApp = objeto.nomeApp;
			this.codigo = objeto.codigo;
			this.codigo_ = Mentor.intToString(this.codigo);
			this.descricao = objeto.descricao;
			this.flagUpload = objeto.flagUpload;
			this.flagUpload_ = Mentor.intToString(this.flagUpload);
			this.extensao = objeto.extensao;
			if (typeof (objeto.dataUpload_) != 'undefined') {
				try {
					this.dataUpload_ = objeto.dataUpload_;
					this.dataUpload = Mentor.stringToDate(objeto.dataUpload_);
					this.dataUploadFormatado = (objeto.dataUpload_);
				} catch (err) {
					alert(err);
					throw err;
				}
			}
			else {
				this.dataUpload = Mentor.stringToDate(objeto.dataUploadFormatado);
				this.dataUpload_ = (objeto.dataUploadFormatado);
			}
			this.flagApp = objeto.flagApp;
			this.flagApp_ = Mentor.intToString(this.flagApp);

		}
		else {
			if ((objeto) == 'null') {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';
				this.flagUpload = 0;
				this.flagUpload_ = '0,00';
				this.dataUpload = new Date();
				this.dataUpload_ = (this.dataUploadFormatado);
				this.flagApp = 0;
				this.flagApp_ = '0';

			} else {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';
				this.flagUpload = 0;
				this.flagUpload_ = '0,00';
				this.dataUpload = new Date();
				this.dataUpload_ = (this.dataUploadFormatado);
				this.flagApp = 0;
				this.flagApp_ = '0';

			}
		}


	}

}


export class Raca extends ionicClasseBase {
	public static mentorNomeClasse = 'br.com.acesso.util.Raca';

	static criaColecao(lista: any) {
		if (lista != null) {
			var retorno = new Array();
			for (let x = 0; x < lista.length; x++)
				retorno.push(new Raca(lista[x]));
			return retorno;
		}
	}

	public codigo: number = 0;
	public codigo_: String;
	get codigoSimNao() { if (this.codigo == 1) return true; else return false; }
	set codigoSimNao(flag) { if (flag) this.codigo = 1; else this.codigo = 0; }
	get codigoFormatado(): String {
		return (this.codigo_)
	}
	set codigoFormatado(valor: String) {
		this.codigo_ = (valor);
		if (replaceAll(valor, " ", "") != "")
			this.codigo = Mentor.stringToMoeda(valor);
	}

	public nome: String = '';
	public nome_: String;

	public listaAtributosKodefy: Array<string> = 'codigo#nome#'.split('#');
	constructor(objeto: any) {
		super();
		if (objeto != null && objeto != 'null') {
			if (typeof (objeto.ionicFlagNovo) == 'undefined') this.ionicFlagNovo = false; else this.ionicFlagNovo = objeto.ionicFlagNovo;
			this.idApp = objeto.idApp;
			this.nomeApp = objeto.nomeApp;
			this.codigo = objeto.codigo;
			this.codigo_ = Mentor.intToString(this.codigo);
			this.nome = objeto.nome;

		}
		else {
			if ((objeto) == 'null') {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';

			} else {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';

			}
		}


	}

}


export class Escola extends ionicClasseBase {
	public static mentorNomeClasse = 'br.com.educacao.beans.Escola';

	static criaColecao(lista: any) {
		if (lista != null) {
			var retorno = new Array();
			for (let x = 0; x < lista.length; x++)
				retorno.push(new Escola(lista[x]));
			return retorno;
		}
	}

	public codigo: number = 0;
	public codigo_: String;
	get codigoSimNao() { if (this.codigo == 1) return true; else return false; }
	set codigoSimNao(flag) { if (flag) this.codigo = 1; else this.codigo = 0; }
	get codigoFormatado(): String {
		return (this.codigo_)
	}
	set codigoFormatado(valor: String) {
		this.codigo_ = (valor);
		if (replaceAll(valor, " ", "") != "")
			this.codigo = Mentor.stringToMoeda(valor);
	}

	public nome: String = '';
	public nome_: String;

	public listaAtributosKodefy: Array<string> = 'codigo#nome#'.split('#');
	constructor(objeto: any) {
		super();
		if (objeto != null && objeto != 'null') {
			if (typeof (objeto.ionicFlagNovo) == 'undefined') this.ionicFlagNovo = false; else this.ionicFlagNovo = objeto.ionicFlagNovo;
			this.idApp = objeto.idApp;
			this.nomeApp = objeto.nomeApp;
			this.codigo = objeto.codigo;
			this.codigo_ = Mentor.intToString(this.codigo);
			this.nome = objeto.nome;

		}
		else {
			if ((objeto) == 'null') {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';

			} else {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';

			}
		}


	}

}


export class EstadoCivil extends ionicClasseBase {
	public static mentorNomeClasse = 'br.com.acesso.beans.EstadoCivil';

	static criaColecao(lista: any) {
		if (lista != null) {
			var retorno = new Array();
			for (let x = 0; x < lista.length; x++)
				retorno.push(new EstadoCivil(lista[x]));
			return retorno;
		}
	}

	public codigo: number = 0;
	public codigo_: String;
	get codigoSimNao() { if (this.codigo == 1) return true; else return false; }
	set codigoSimNao(flag) { if (flag) this.codigo = 1; else this.codigo = 0; }
	get codigoFormatado(): String {
		return (this.codigo_)
	}
	set codigoFormatado(valor: String) {
		this.codigo_ = (valor);
		if (replaceAll(valor, " ", "") != "")
			this.codigo = Mentor.stringToMoeda(valor);
	}

	public descricao: String = '';
	public descricao_: String;

	public listaAtributosKodefy: Array<string> = 'codigo#descricao#'.split('#');
	constructor(objeto: any) {
		super();
		if (objeto != null && objeto != 'null') {
			if (typeof (objeto.ionicFlagNovo) == 'undefined') this.ionicFlagNovo = false; else this.ionicFlagNovo = objeto.ionicFlagNovo;
			this.idApp = objeto.idApp;
			this.nomeApp = objeto.nomeApp;
			this.codigo = objeto.codigo;
			this.codigo_ = Mentor.intToString(this.codigo);
			this.descricao = objeto.descricao;

		}
		else {
			if ((objeto) == 'null') {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';

			} else {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';

			}
		}


	}

}

export class IndividuoNetgas extends ionicClasseBase {
	public static mentorNomeClasse = 'br.com.acesso.beans.IndividuoNetgas';

	static criaColecao(lista: any) {
		if (lista != null) {
			var retorno = new Array();
			for (let x = 0; x < lista.length; x++)
				retorno.push(new IndividuoNetgas(lista[x]));
			return retorno;
		}
	}

	public bairro: String = '';
	public bairro_: String;

	public cpf: String = '';
	public cpf_: String;

	public endereco: String = '';
	public endereco_: String;

	public nome: String = '';
	public nome_: String;
	public associado: Associado;

	public listaAtributosKodefy: Array<string> = 'bairro#cpf#endereco#nome#'.split('#');
	constructor(objeto: any) {
		super();
		if (objeto != null && objeto != 'null') {
			if (typeof (objeto.ionicFlagNovo) == 'undefined') this.ionicFlagNovo = false; else this.ionicFlagNovo = objeto.ionicFlagNovo;
			this.idApp = objeto.idApp;
			this.nomeApp = objeto.nomeApp;
			this.bairro = objeto.bairro;
			this.cpf = objeto.cpf;
			this.endereco = objeto.endereco;
			this.nome = objeto.nome;

			if (objeto.associado != null)
				this.associado = new Associado(objeto.associado);

		}
		else {
			if ((objeto) == 'null') {
				this.ionicFlagNovo = true;

			} else {
				this.ionicFlagNovo = true;
				this.associado = new Associado('null');

			}
		}


	}

}


export class Associado extends ionicClasseBase {
	public static mentorNomeClasse = 'br.com.assistenciaSocial.beans.Associado';

	static criaColecao(lista: any) {
		if (lista != null) {
			var retorno = new Array();
			for (let x = 0; x < lista.length; x++)
				retorno.push(new Associado(lista[x]));
			return retorno;
		}
	}

	public nome_pai: String = '';
	public nome_pai_: String;

	public nome_mae: String = '';
	public nome_mae_: String;

	public num_nis_pessoa_atual: number = 0;
	public num_nis_pessoa_atual_: String;
	get num_nis_pessoa_atualSimNao() { if (this.num_nis_pessoa_atual == 1) return true; else return false; }
	set num_nis_pessoa_atualSimNao(flag) { if (flag) this.num_nis_pessoa_atual = 1; else this.num_nis_pessoa_atual = 0; }
	get num_nis_pessoa_atualFormatado(): String {
		return (this.num_nis_pessoa_atual_)
	}
	set num_nis_pessoa_atualFormatado(valor: String) {
		this.num_nis_pessoa_atual_ = (valor);
		if (replaceAll(valor, " ", "") != "")
			this.num_nis_pessoa_atual = Mentor.stringToMoeda(valor);
	}
	public sexo: Sexo;
	public estadoCivil: EstadoCivil;

	public listaAtributosKodefy: Array<string> = 'nome_pai#nome_mae#num_nis_pessoa_atual#'.split('#');
	constructor(objeto: any) {
		super();
		if (objeto != null && objeto != 'null') {
			if (typeof (objeto.ionicFlagNovo) == 'undefined') this.ionicFlagNovo = false; else this.ionicFlagNovo = objeto.ionicFlagNovo;
			this.idApp = objeto.idApp;
			this.nomeApp = objeto.nomeApp;
			this.nome_pai = objeto.nome_pai;
			this.nome_mae = objeto.nome_mae;
			this.num_nis_pessoa_atual = objeto.num_nis_pessoa_atual;

			if (objeto.sexo != null)
				this.sexo = new Sexo(objeto.sexo);

			if (objeto.estadoCivil != null)
				this.estadoCivil = new EstadoCivil(objeto.estadoCivil);

		}
		else {
			if ((objeto) == 'null') {
				this.ionicFlagNovo = true;

			} else {
				this.ionicFlagNovo = true;
				this.sexo = new Sexo('null');
				this.estadoCivil = new EstadoCivil('null');

			}
		}


	}

}

export class licencaMunicipioSistema extends ionicClasseBase {
	public static mentorNomeClasse =
		'br.com.assistenciaSocial.app.licencaMunicipioSistema';

	static criaColecao(lista: any) {
		if (lista != null) {
			var retorno = new Array();
			for (let x = 0; x < lista.length; x++)
				retorno.push(new licencaMunicipioSistema(lista[x]));
			return retorno;
		}
	}

	public codigo: number;
	public codigo_: String;
	get codigoSimNao() {
		if (this.codigo == 1) return true;
		else return false;
	}
	set codigoSimNao(flag) {
		if (flag) this.codigo = 1;
		else this.codigo = 0;
	}
	get codigoFormatado(): String {
		return this.codigo_;
	}
	set codigoFormatado(valor: String) {
		this.codigo_ = valor;
		if (replaceAll(valor, ' ', '') != '')
			this.codigo = Mentor.stringToMoeda(valor);
	}

	public nomeMunicipio: String;
	public nomeMunicipio_: String;

	public sistema: number;
	public sistema_: String;
	get sistemaSimNao() {
		if (this.sistema == 1) return true;
		else return false;
	}
	set sistemaSimNao(flag) {
		if (flag) this.sistema = 1;
		else this.sistema = 0;
	}
	public sistemaFormatadoLista: formatadoLista[] = new Array();
	get sistemaFormatado() {
		return Mentor.formatadoLista(this.sistemaFormatadoLista, this.sistema);
	}

	public nomeCliente: String;
	public nomeCliente_: String;

	public logo: String;
	public logo_: String;

	public dataUltimaVersao: Date;
	public dataUltimaVersao_: String;
	get dataUltimaVersaoFormatado(): String {
		if (
			typeof this.dataUltimaVersao != 'undefined' &&
			this.dataUltimaVersao != null
		)
			return Mentor.dateToString(this.dataUltimaVersao);
		else return '';
	}
	set dataUltimaVersaoFormatado(valor: String) {
		this.dataUltimaVersao_ = valor;
		if (replaceAll(this.dataUltimaVersao_, '_', '').length == 10)
			this.dataUltimaVersao = Mentor.stringToDate(valor);
	}
	get dataUltimaVersaoFormatadoIso(): String {
		return Mentor.dateToStringIso(this.dataUltimaVersao);
	}
	set dataUltimaVersaoFormatadoIso(valor: String) {
		this.dataUltimaVersao = Mentor.stringToDateIso(valor);
		this.dataUltimaVersao_ = Mentor.dateToString(this.dataUltimaVersao);
	}

	public url: String;
	public url_: String;

	public urlUltimaAlteracao: String;
	public urlUltimaAlteracao_: String;

	public urlServidor: String;
	public urlServidor_: String;
	public estado: Estado;

	constructor(objeto: any) {
		super();
		if (objeto != null) Mentor.mostraSql = objeto.flagExibeSql;
		if (objeto != null && objeto != 'null') {
			if (typeof objeto.ionicFlagNovo == 'undefined')
				this.ionicFlagNovo = false;
			else this.ionicFlagNovo = objeto.ionicFlagNovo;
			this.codigo = objeto.codigo;
			this.codigo_ = Mentor.intToString(this.codigo);
			this.nomeMunicipio = objeto.nomeMunicipio;
			this.sistema = objeto.sistema;
			this.sistema_ = Mentor.intToString(this.sistema);
			this.nomeCliente = objeto.nomeCliente;
			this.logo = objeto.logo;
			if (typeof objeto.dataUltimaVersao_ != 'undefined') {
				try {
					this.dataUltimaVersao_ = objeto.dataUltimaVersao_;
					this.dataUltimaVersao = Mentor.stringToDate(objeto.dataUltimaVersao_);
					this.dataUltimaVersaoFormatado = objeto.dataUltimaVersao_;
				} catch (err) {
					alert(err);
					throw err;
				}
			} else {
				this.dataUltimaVersao = Mentor.stringToDate(
					objeto.dataUltimaVersaoFormatado
				);
				this.dataUltimaVersao_ = objeto.dataUltimaVersaoFormatado;
			}
			this.url = objeto.url;
			this.urlUltimaAlteracao = objeto.urlUltimaAlteracao;
			this.urlServidor = objeto.urlServidor;

			if (objeto.estado != null) this.estado = new Estado(objeto.estado);
		} else {
			if (objeto == 'null') {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';
				this.sistema = 0;
				this.sistema_ = '0';
				this.dataUltimaVersao = new Date();
				this.dataUltimaVersao_ =
					this.dataUltimaVersaoFormatado;
			} else {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';
				this.sistema = 0;
				this.sistema_ = '0';
				this.dataUltimaVersao = new Date();
				this.dataUltimaVersao_ = this.dataUltimaVersaoFormatado;
				this.estado = new Estado('null');
			}
		}

		this.sistemaFormatadoLista.push(new formatadoLista(1, 'assistenciaSocial'));
		this.sistemaFormatadoLista.push(new formatadoLista(2, 'tfd'));
		this.sistemaFormatadoLista.push(
			new formatadoLista(3, 'transporte escolar')
		);
		this.sistemaFormatadoLista.push(new formatadoLista(4, 'ouvidoria'));
		this.sistemaFormatadoLista.push(new formatadoLista(5, 'gestao escolar'));
		this.sistemaFormatadoLista.push(new formatadoLista(6, 'sic'));
		this.sistemaFormatadoLista.push(new formatadoLista(7, 'transparencia'));
		this.sistemaFormatadoLista.push(new formatadoLista(8, 'netDoc'));
		this.sistemaFormatadoLista.push(new formatadoLista(9, 'diarioOficial'));
	}
}

export class Estado extends ionicClasseBase {
	static criaColecao(lista: any) {
		if (lista != null) {
			var retorno = new Array();
			for (let x = 0; x < lista.length; x++) retorno.push(new Estado(lista[x]));
			return retorno;
		}
	}

	public codigo: number;
	public codigo_: String;
	get codigoSimNao() {
		if (this.codigo == 1) return true;
		else return false;
	}
	set codigoSimNao(flag) {
		if (flag) this.codigo = 1;
		else this.codigo = 0;
	}
	get codigoFormatado(): String {
		return this.codigo_;
	}
	set codigoFormatado(valor: String) {
		this.codigo_ = valor;
		if (replaceAll(valor, ' ', '') != '')
			this.codigo = Mentor.stringToMoeda(valor);
	}

	public descricao: String;
	public descricao_: String;

	constructor(objeto: any) {
		super();
		if (objeto != null) {
			if (typeof objeto.ionicFlagNovo == 'undefined')
				this.ionicFlagNovo = false;
			else this.ionicFlagNovo = objeto.ionicFlagNovo;
			this.codigo = objeto.codigo;
			this.codigo_ = Mentor.intToString(this.codigo);
			this.descricao = objeto.descricao;
		} else {
			if (typeof objeto == 'undefined') {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';
			} else {
				this.ionicFlagNovo = true;
				this.codigo = 0;
				this.codigo_ = '0';
			}
		}
	}
}

export class RlcFuncionarioUnidade extends ionicClasseBase {
	public static mentorNomeClasse = 'br.com.acesso.beans.RlcFuncionarioUnidade';

	static criaColecao(lista: any) {
		if (lista != null) {
			var retorno = new Array();
			for (let x = 0; x < lista.length; x++)
				retorno.push(new RlcFuncionarioUnidade(lista[x]));
			return retorno;
		}
	}
	public unidadeAdministrativa: UnidadeAdministrativa;

	public listaAtributosKodefy: Array<string> = ''.split('#');
	constructor(objeto: any) {
		super();
		if (objeto != null && objeto != 'null') {
			if (typeof (objeto.ionicFlagNovo) == 'undefined') this.ionicFlagNovo = false; else this.ionicFlagNovo = objeto.ionicFlagNovo;
			this.idApp = objeto.idApp;
			this.nomeApp = objeto.nomeApp;

			if (objeto.unidadeAdministrativa != null)
				this.unidadeAdministrativa = new UnidadeAdministrativa(objeto.unidadeAdministrativa);

		}
		else {
			if ((objeto) == 'null') {
				this.ionicFlagNovo = true;

			} else {
				this.ionicFlagNovo = true;
				//this.unidadeAdministrativa = null;

			}
		}


	}

}


export class RecadastramentoCamaragibe extends ionicClasseBase {
public static mentorNomeClasse = 'br.com.assistenciaSocial.beans.RecadastramentoCamaragibe';

	static criaColecao(lista: any){
		if(lista!=null){
			var retorno = new Array();
			for(let x = 0;x<lista.length;x++)
				retorno.push(new RecadastramentoCamaragibe(lista[x]));
			return retorno;
		}
	}

		public codigo : number = 0 ;
		public codigo_ : String ;
		get codigoSimNao(){ if (this.codigo == 1) return true; else return false;}
		set codigoSimNao(flag){ if (flag) this.codigo = 1; else this.codigo = 0;}
		get codigoFormatado(): String {
			return (this.codigo_)
		}
		set codigoFormatado(valor: String) {
			this.codigo_ =  (valor);
			if(replaceAll(valor," ","") != "")
				this.codigo =  Mentor.stringToMoeda(valor);
		}

		public nome : String = '' ;
		public nome_ : String ;

		public cpf : String = '' ;
		public cpf_ : String ;

		public endereco : String = '' ;
		public endereco_ : String ;

		public bairro : String = '' ;
		public bairro_ : String ;

		public pontoReferencia : String = '' ;
		public pontoReferencia_ : String ;

		public telefone : String = '' ;
		public telefone_ : String ;

		public obs : String = '' ;
		public obs_ : String ;

		public cras : number = 0 ;
		public cras_ : String ;
		get crasSimNao(){ if (this.cras == 1) return true; else return false;}
		set crasSimNao(flag){ if (flag) this.cras = 1; else this.cras = 0;}
		public crasFormatadoLista : formatadoLista[] = new Array();
		get crasFormatado(){  return Mentor.formatadoLista(this.crasFormatadoLista,this.cras);}


		public flagRecadastrado : number = 0 ;
		public flagRecadastrado_ : String ;
		get flagRecadastradoSimNao(){ if (this.flagRecadastrado == 1) return true; else return false;}
		set flagRecadastradoSimNao(flag){ if (flag) this.flagRecadastrado = 1; else this.flagRecadastrado = 0;}
		public flagRecadastradoFormatadoLista : formatadoLista[] = new Array();
		get flagRecadastradoFormatado(){  return Mentor.formatadoLista(this.flagRecadastradoFormatadoLista,this.flagRecadastrado);}

		public visitas : VisitaRecadastramento[] ;

public listaAtributosKodefy: Array<string> ='codigo#nome#cpf#endereco#bairro#pontoReferencia#telefone#obs#cras#flagRecadastrado#'.split('#');
		constructor(objeto:any){
		super();
		if(objeto != null && objeto != 'null'){
if(typeof(objeto.ionicFlagNovo) == 'undefined') this.ionicFlagNovo = false; else this.ionicFlagNovo = objeto.ionicFlagNovo;
this.idApp = objeto.idApp;
this.nomeApp = objeto.nomeApp;
			 this.codigo = objeto.codigo;
			 this.codigo_ = Mentor.intToString(this.codigo);
			 this.nome = objeto.nome;
			 this.cpf = objeto.cpf;
			 this.endereco = objeto.endereco;
			 this.bairro = objeto.bairro;
			 this.pontoReferencia = objeto.pontoReferencia;
			 this.telefone = objeto.telefone;
			 this.obs = objeto.obs;
			 this.cras = objeto.cras;
			 this.cras_ = Mentor.intToString(this.cras);
			 this.flagRecadastrado = objeto.flagRecadastrado;
			 this.flagRecadastrado_ = Mentor.intToString(this.flagRecadastrado);
				this.visitas = new Array();

			if(objeto.visitas != null){
				for(let x:number = 0;x<objeto.visitas.length;x++)
				this.visitas.push(new VisitaRecadastramento(objeto.visitas[x]))
			}

		}
		else{
		if((objeto) == 'null'){
this.ionicFlagNovo = true;
			 this.codigo = 0;
			 this.codigo_ = '0';
			 this.cras = 0;
			 this.cras_ = '0';
			 this.flagRecadastrado = 0;
			 this.flagRecadastrado_ = '0';

			}else{
this.ionicFlagNovo = true;
			 this.codigo = 0;
			 this.codigo_ = '0';
			 this.cras = 0;
			 this.cras_ = '0';
			 this.flagRecadastrado = 0;
			 this.flagRecadastrado_ = '0';

		}
			}

			this.crasFormatadoLista.push(new formatadoLista(1,"CRAS 1"));
			this.crasFormatadoLista.push(new formatadoLista(2,"CRAS 2"));
			this.crasFormatadoLista.push(new formatadoLista(3,"CRAS 3"));
			this.flagRecadastradoFormatadoLista.push(new formatadoLista(0,"Não"));
			this.flagRecadastradoFormatadoLista.push(new formatadoLista(1,"Sim"));

		}

}

export class VisitaRecadastramento extends ionicClasseBase {
public static mentorNomeClasse = 'br.com.assistenciaSocial.beans.VisitaRecadastramento';

	static criaColecao(lista: any){
		if(lista!=null){
			var retorno = new Array();
			for(let x = 0;x<lista.length;x++)
				retorno.push(new VisitaRecadastramento(lista[x]));
			return retorno;
		}
	}

		public codigo : number = 0 ;
		public codigo_ : String ;
		get codigoSimNao(){ if (this.codigo == 1) return true; else return false;}
		set codigoSimNao(flag){ if (flag) this.codigo = 1; else this.codigo = 0;}
		get codigoFormatado(): String {
			return (this.codigo_)
		}
		set codigoFormatado(valor: String) {
			this.codigo_ =  (valor);
			if(replaceAll(valor," ","") != "")
				this.codigo =  Mentor.stringToMoeda(valor);
		}

		public flagConcluido : number = 0 ;
		public flagConcluido_ : String ;
		get flagConcluidoSimNao(){ if (this.flagConcluido == 1) return true; else return false;}
		set flagConcluidoSimNao(flag){ if (flag) this.flagConcluido = 1; else this.flagConcluido = 0;}
		public flagConcluidoFormatadoLista : formatadoLista[] = new Array();
		get flagConcluidoFormatado(){  return Mentor.formatadoLista(this.flagConcluidoFormatadoLista,this.flagConcluido);}


		public dataVisita : Date = null ;
		public dataVisita_ : String ;
		get dataVisitaFormatado(): String {
			if(typeof(this.dataVisita) != 'undefined' && this.dataVisita != null  )
			return Mentor.dateToString(this.dataVisita);
			else
				return  '' ;
		}
		set dataVisitaFormatado(valor: String) {
			this.dataVisita_ =  valor;
			if(replaceAll(this.dataVisita_,"_","").length ==10)
				this.dataVisita =  Mentor.stringToDate(valor);
		}
		get dataVisitaFormatadoIso(): String {
			return  Mentor.dateToStringIso(this.dataVisita)
		}
		set dataVisitaFormatadoIso(valor: String) {
			this.dataVisita =  Mentor.stringToDateIso(valor);
			this.dataVisita_ =  Mentor.dateToString(this.dataVisita);
		}

		public obs : String = '' ;
		public obs_ : String ;

		public latitude : String = '' ;
		public latitude_ : String ;

		public longitude : String = '' ;
		public longitude_ : String ;
		public responsavelVisita : Funcionarios ;
		public arquivos : ArquivoProcad[] ;
		public visitado : RecadastramentoCamaragibe ;

public listaAtributosKodefy: Array<string> ='codigo#flagConcluido#dataVisita#obs#latitude#longitude#'.split('#');
		constructor(objeto:any){
		super();
		if(objeto != null && objeto != 'null'){
if(typeof(objeto.ionicFlagNovo) == 'undefined') this.ionicFlagNovo = false; else this.ionicFlagNovo = objeto.ionicFlagNovo;
this.idApp = objeto.idApp;
this.nomeApp = objeto.nomeApp;
			 this.codigo = objeto.codigo;
			 this.codigo_ = Mentor.intToString(this.codigo);
			 this.flagConcluido = objeto.flagConcluido;
			 this.flagConcluido_ = Mentor.intToString(this.flagConcluido);
				 if(typeof(objeto.dataVisita_) != 'undefined') { try{ 
 this.dataVisita_ = objeto.dataVisita_ ;
			 this.dataVisita = Mentor.stringToDate(objeto.dataVisita_) ;
			 this.dataVisitaFormatado = (objeto.dataVisita_) ;
} catch(err){alert(err); 
 throw err;} 
 }
else{
			 this.dataVisita = Mentor.stringToDate(objeto.dataVisitaFormatado) ;
			 this.dataVisita_ = (objeto.dataVisitaFormatado) ;}
			 this.obs = objeto.obs;
			 this.latitude = objeto.latitude;
			 this.longitude = objeto.longitude;

			if(objeto.responsavelVisita != null)
				this.responsavelVisita = new Funcionarios(objeto.responsavelVisita);
				this.arquivos = new Array();

			if(objeto.arquivos != null){
				for(let x:number = 0;x<objeto.arquivos.length;x++)
				this.arquivos.push(new ArquivoProcad(objeto.arquivos[x]))
			}

			if(objeto.visitado != null)
				this.visitado = new RecadastramentoCamaragibe(objeto.visitado);

		}
		else{
		if((objeto) == 'null'){
this.ionicFlagNovo = true;
			 this.codigo = 0;
			 this.codigo_ = '0';
			 this.flagConcluido = 0;
			 this.flagConcluido_ = '0';
			 this.dataVisita = new Date();
			 this.dataVisita_ = (this.dataVisitaFormatado) ;

			}else{
this.ionicFlagNovo = true;
			 this.codigo = 0;
			 this.codigo_ = '0';
			 this.flagConcluido = 0;
			 this.flagConcluido_ = '0';
			 this.dataVisita = new Date();
			 this.dataVisita_ = (this.dataVisitaFormatado) ;
				this.responsavelVisita = new Funcionarios('null');
				this.visitado = new RecadastramentoCamaragibe('null');

		}
			}

			this.flagConcluidoFormatadoLista.push(new formatadoLista(0,"Não"));
			this.flagConcluidoFormatadoLista.push(new formatadoLista(1,"Sim"));

		}

}

export class ArquivoProcad extends ionicClasseBase {
public static mentorNomeClasse = 'br.com.assistenciaSocial.beans.ArquivoProcad';

	static criaColecao(lista: any){
		if(lista!=null){
			var retorno = new Array();
			for(let x = 0;x<lista.length;x++)
				retorno.push(new ArquivoProcad(lista[x]));
			return retorno;
		}
	}

		public codigo : number = 0 ;
		public codigo_ : String ;
		get codigoSimNao(){ if (this.codigo == 1) return true; else return false;}
		set codigoSimNao(flag){ if (flag) this.codigo = 1; else this.codigo = 0;}
		get codigoFormatado(): String {
			return (this.codigo_)
		}
		set codigoFormatado(valor: String) {
			this.codigo_ =  (valor);
			if(replaceAll(valor," ","") != "")
				this.codigo =  Mentor.stringToMoeda(valor);
		}

		public flagUploadArquivo : number = 0 ;
		public flagUploadArquivo_ : String ;
		get flagUploadArquivoSimNao(){ if (this.flagUploadArquivo == 1) return true; else return false;}
		set flagUploadArquivoSimNao(flag){ if (flag) this.flagUploadArquivo = 1; else this.flagUploadArquivo = 0;}
		public flagUploadArquivoFormatadoLista : formatadoLista[] = new Array();
		get flagUploadArquivoFormatado(){  return Mentor.formatadoLista(this.flagUploadArquivoFormatadoLista,this.flagUploadArquivo);}


		public nome : String = '' ;
		public nome_ : String ;

public listaAtributosKodefy: Array<string> ='codigo#flagUploadArquivo#nome#'.split('#');
		constructor(objeto:any){
		super();
		if(objeto != null && objeto != 'null'){
if(typeof(objeto.ionicFlagNovo) == 'undefined') this.ionicFlagNovo = false; else this.ionicFlagNovo = objeto.ionicFlagNovo;
this.idApp = objeto.idApp;
this.nomeApp = objeto.nomeApp;
			 this.codigo = objeto.codigo;
			 this.codigo_ = Mentor.intToString(this.codigo);
			 this.flagUploadArquivo = objeto.flagUploadArquivo;
			 this.flagUploadArquivo_ = Mentor.intToString(this.flagUploadArquivo);
			 this.nome = objeto.nome;

		}
		else{
		if((objeto) == 'null'){
this.ionicFlagNovo = true;
			 this.codigo = 0;
			 this.codigo_ = '0';
			 this.flagUploadArquivo = 0;
			 this.flagUploadArquivo_ = '0';

			}else{
this.ionicFlagNovo = true;
			 this.codigo = 0;
			 this.codigo_ = '0';
			 this.flagUploadArquivo = 0;
			 this.flagUploadArquivo_ = '0';

		}
			}

			this.flagUploadArquivoFormatadoLista.push(new formatadoLista(0,"Não"));
			this.flagUploadArquivoFormatadoLista.push(new formatadoLista(1,"Sim"));

		}

}



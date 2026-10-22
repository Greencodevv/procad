import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import * as L from 'leaflet';
import { filter } from 'rxjs';
import { StorageKeysEnums } from 'src/app/enums/StorageKeys.enums';
import { Mentor } from 'src/app/models/Mentor';
import { licencaMunicipioSistema } from 'src/app/models/Modelo';
import { servico } from 'src/app/models/Servico';
import { Coordenada, MapaService } from 'src/app/shared/services/mapa/mapa.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

// Visita já numerada: a ordem é a mesma no marcador do mapa e na listagem
interface VisitaNaListagem {
  ordem: number;
  visita: any;
  coordenada: Coordenada | null;
  distanciaKm: number | null;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') mapaEl!: ElementRef<HTMLElement>;

  visitas: any[] = servico.visitas;
  itens: VisitaNaListagem[] = [];
  posicaoUsuario: Coordenada | null = null;
  statusLocalizacao = 'Obtendo sua localização...';

  private mapa: L.Map | null = null;
  private camada = L.layerGroup();

  constructor(
    private router: Router,
    private mapaService: MapaService,
    private storageService: StorageService,
    private actionSheetCtrl: ActionSheetController,
    private toastService: ToastService
  ) {
    // Dentro das tabs o ionViewDidEnter não dispara ao voltar do detalhe, então recarrega a cada navegação para /inicio
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd && e.urlAfterRedirects.startsWith('/inicio')),
      takeUntilDestroyed()
    ).subscribe(() => this.aoEntrarNaTela());
  }

  ngAfterViewInit() {
    this.mapa = this.mapaService.criarMapa(this.mapaEl.nativeElement);
    this.camada.addTo(this.mapa);
    this.desenharMapa();
  }

  ngOnDestroy() {
    this.mapa?.remove();
    this.mapa = null;
  }

  // Atualiza visitas e localização sempre que a tela é exibida
  async aoEntrarNaTela() {
    this.carregarVisitas();
    await this.atualizarLocalizacao();
  }

  carregarVisitas() {
    const retornoJsp: any = Mentor.bind(
      'codigoEntrevistador=' + servico.usuarioLogado.codigo,
      'jsp/appProcad/ctrl.jsp',
      'POST'
    );
    const objJsp = JSON.parse(retornoJsp);
    this.visitas = JSON.parse(objJsp['visitas']);
    console.log('Visitas:', this.visitas);
    this.montarItens();
    this.desenharMapa();
  }

  async atualizarLocalizacao() {
    this.statusLocalizacao = 'Obtendo sua localização...';
    this.posicaoUsuario = await this.mapaService.posicaoAtual();
    this.statusLocalizacao = this.posicaoUsuario
      ? 'Lista ordenada pela sua localização'
      : 'Localização indisponível. Verifique o GPS e a permissão do app.';
    this.montarItens();
    this.desenharMapa();
  }

  // Ordena pela proximidade do usuário; sem localização ou sem coordenadas, mantém a ordem do servidor
  private montarItens() {
    const itens = (this.visitas ?? []).map((visita) => {
      const coordenada = this.mapaService.coordenadasDaVisita(visita);
      return {
        visita,
        coordenada,
        distanciaKm:
          coordenada && this.posicaoUsuario
            ? this.mapaService.distanciaKm(this.posicaoUsuario, coordenada)
            : null,
      };
    });

    // Array.sort é estável: pessoas à mesma distância (e sem distância) mantêm a ordem recebida
    itens.sort((a, b) => {
      if (a.distanciaKm === null || b.distanciaKm === null) {
        return (a.distanciaKm === null ? 1 : 0) - (b.distanciaKm === null ? 1 : 0);
      }
      return a.distanciaKm - b.distanciaKm;
    });

    // A ordem do número acompanha a listagem, então marcador no mapa e item na lista continuam iguais
    this.itens = itens.map((item, index) => ({ ...item, ordem: index + 1 }));
  }

  private desenharMapa() {
    if (!this.mapa) {
      return;
    }

    this.camada.clearLayers();
    const pontos: L.LatLngTuple[] = [];

    if (this.posicaoUsuario) {
      const { lat, lng } = this.posicaoUsuario;
      this.mapaService.marcadorUsuario(this.posicaoUsuario).bindPopup('Você está aqui').addTo(this.camada);
      pontos.push([lat, lng]);
    }

    this.itens.forEach((item) => {
      if (!item.coordenada) {
        return;
      }
      const { lat, lng } = item.coordenada;
      const popup = `<strong>${item.ordem}. ${this.textoSeguro(item.visita.visitado?.nome)}</strong><br>${this.textoSeguro(item.visita.visitado?.endereco)}`;
      this.mapaService.marcadorNumerado(item.coordenada, item.ordem).bindPopup(popup).addTo(this.camada);
      pontos.push([lat, lng]);
    });

    if (pontos.length === 1) {
      this.mapa.setView(pontos[0], 15);
    } else if (pontos.length > 1) {
      this.mapa.fitBounds(L.latLngBounds(pontos).pad(0.2));
    }
    // A tela pode ter acabado de sair de display:none (tabs); recalcula o tamanho
    setTimeout(() => this.mapa?.invalidateSize());
  }

  async abrirOpcoes(item: VisitaNaListagem) {
    const folha = await this.actionSheetCtrl.create({
      header: item.visita.visitado?.nome,
      buttons: [
        {
          text: 'Iniciar visita',
          icon: 'play-outline',
          handler: () => this.abrirDetalhe(item.visita),
        },
        {
          text: 'Rota no Waze',
          icon: 'map-outline',
          handler: () => this.abrirNavegacaoExterna(item, 'waze'),
        },
        {
          text: 'Rota no Google Maps',
          icon: 'map-outline',
          handler: () => this.abrirNavegacaoExterna(item, 'google'),
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
        },
      ],
    });
    await folha.present();
  }

  // Abre a rota no Waze ou Google Maps; o município do login completa o endereço quando não há coordenadas
  async abrirNavegacaoExterna(item: VisitaNaListagem, app: 'waze' | 'google') {
    const licenca = await this.storageService.getValue<licencaMunicipioSistema>(StorageKeysEnums.licenca);
    const municipio = String(licenca?.nomeMunicipio ?? '').trim();
    const estado = String(licenca?.estado?.descricao ?? '');

    if (!item.coordenada && !municipio) {
      this.toastService.showToast({ message: 'Município não identificado para localizar o endereço' });
      return;
    }

    const consulta = this.mapaService.enderecoParaBusca(item.visita, municipio, estado);
    const link =
      app === 'waze'
        ? this.mapaService.linkWaze(item.coordenada, consulta)
        : this.mapaService.linkGoogleMaps(item.coordenada, consulta);
    window.open(link, '_blank');
  }

  navegaParaLogin() {
    this.router.navigate(['/login']);
  }

  abrirDetalhe(visitaSelecionada: any) {
    if (visitaSelecionada.obs == "null") {
      visitaSelecionada.obs = '';
    }
    servico.visita = visitaSelecionada;
    this.router.navigate(['/detalhe-pessoa']);
  }

  formatarCpf(cpf: unknown): string {
    const digitos = String(cpf ?? '').replace(/\D/g, '');
    if (digitos.length !== 11) {
      return String(cpf ?? '');
    }
    return digitos.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarDistancia(km: number): string {
    return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
  }

  // Evita HTML vindo do servidor dentro dos popups do mapa
  private textoSeguro(valor: unknown): string {
    return String(valor ?? '').replace(/[&<>"']/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as Record<string, string>)[c]
    );
  }
}

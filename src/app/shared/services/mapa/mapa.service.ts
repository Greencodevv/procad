import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

export interface Coordenada {
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root',
})
export class MapaService {
  // Converte latitude/longitude vindas do JSP (strings) e descarta valores vazios, zerados ou fora do globo
  coordenadaValida(lat: unknown, lng: unknown): Coordenada | null {
    const latitude = parseFloat(String(lat ?? ''));
    const longitude = parseFloat(String(lng ?? ''));

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return null;
    }
    if (latitude === 0 && longitude === 0) {
      return null;
    }
    if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
      return null;
    }
    return { lat: latitude, lng: longitude };
  }

  // Coordenadas da pessoa visitada; cai para as coordenadas gravadas na visita se a pessoa não tiver
  coordenadasDaVisita(visita: any): Coordenada | null {
    return (
      this.coordenadaValida(visita?.visitado?.latitude, visita?.visitado?.longitude) ??
      this.coordenadaValida(visita?.latitude, visita?.longitude)
    );
  }

  // Posição atual do aparelho; null quando o GPS está desligado ou a permissão foi negada
  async posicaoAtual(): Promise<Coordenada | null> {
    try {
      const posicao = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 15000 });
      return this.coordenadaValida(posicao.coords.latitude, posicao.coords.longitude);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      return null;
    }
  }

  // Endereço para buscar nos apps de navegação; o município entra quando não há coordenadas
  enderecoParaBusca(visita: any, municipio: string, estado: string): string {
    const v = visita?.visitado;
    return [v?.endereco, v?.bairroSistema?.nome || v?.bairro, municipio, estado, 'Brasil']
      .filter((parte) => parte && String(parte).trim())
      .join(', ');
  }

  // Link do Google Maps com rota de carro até o destino (abre o app se estiver instalado)
  linkGoogleMaps(coordenada: Coordenada | null, consulta: string): string {
    const destino = coordenada ? `${coordenada.lat},${coordenada.lng}` : encodeURIComponent(consulta);
    return `https://www.google.com/maps/dir/?api=1&destination=${destino}&travelmode=driving`;
  }

  // Link do Waze já iniciando a navegação (abre o app se estiver instalado)
  linkWaze(coordenada: Coordenada | null, consulta: string): string {
    const busca = coordenada ? `ll=${coordenada.lat},${coordenada.lng}` : `q=${encodeURIComponent(consulta)}`;
    return `https://waze.com/ul?${busca}&navigate=yes`;
  }

  // Distância em linha reta (haversine), em quilômetros
  distanciaKm(origem: Coordenada, destino: Coordenada): number {
    const raio = 6371;
    const rad = (graus: number) => (graus * Math.PI) / 180;
    const dLat = rad(destino.lat - origem.lat);
    const dLng = rad(destino.lng - origem.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(rad(origem.lat)) * Math.cos(rad(destino.lat)) * Math.sin(dLng / 2) ** 2;
    return raio * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // Mapa com tiles do OpenStreetMap; quem cria é responsável por chamar remove()
  criarMapa(elemento: HTMLElement, centro: Coordenada = { lat: -8.0, lng: -35.0 }, zoom = 12): L.Map {
    const mapa = L.map(elemento).setView([centro.lat, centro.lng], zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
    }).addTo(mapa);
    return mapa;
  }

  // Marcador numerado (ordem da visita); divIcon evita depender das imagens padrão do Leaflet
  marcadorNumerado(posicao: Coordenada, numero: number | string, cssClass = 'marcador-visita'): L.Marker {
    return L.marker([posicao.lat, posicao.lng], {
      icon: L.divIcon({
        className: 'marcador-leaflet',
        html: `<div class="${cssClass}">${numero}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
      }),
    });
  }

  // Ponto azul com a posição atual do usuário
  marcadorUsuario(posicao: Coordenada): L.Marker {
    return L.marker([posicao.lat, posicao.lng], {
      icon: L.divIcon({
        className: 'marcador-leaflet',
        html: '<div class="marcador-usuario"></div>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
    });
  }
}

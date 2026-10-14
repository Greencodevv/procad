import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageKeysEnums } from 'src/app/enums/StorageKeys.enums';
import { Mentor } from 'src/app/models/Mentor';
import { licencaMunicipioSistema } from 'src/app/models/Modelo';
import { servico } from 'src/app/models/Servico';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

// Garante que existe usuário logado; após um reload do app, restaura usuário e URL do município do storage
export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const storageService = inject(StorageService);

  if (servico.usuarioLogado) {
    return true;
  }

  const usuarioLogado = await storageService.getValue<any>(StorageKeysEnums.usuarioLogado);
  const licenca = await storageService.getValue<licencaMunicipioSistema>(StorageKeysEnums.licenca);

  if (!usuarioLogado || !licenca?.url) {
    return router.parseUrl('/login');
  }

  servico.usuarioLogado = usuarioLogado;
  Mentor.UrlRequest = licenca.url;
  return true;
};

// A tela de detalhe depende da visita selecionada na lista
export const visitaSelecionadaGuard: CanActivateFn = () => {
  if (servico.visita) {
    return true;
  }
  return inject(Router).parseUrl('/inicio');
};

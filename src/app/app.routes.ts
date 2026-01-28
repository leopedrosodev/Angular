import { Routes } from '@angular/router';
import { PlacaBuscaComponent } from './components/placa-busca/placa-busca';

export const routes: Routes = [
  { path: '', component: PlacaBuscaComponent, title: 'Pesquisa de Carros por Placa' },
  {
    path: 'sobre',
    loadComponent: () => import('./components/sobre/sobre.component').then((m) => m.SobreComponent)
  },
  {
    path: 'legacy',
    loadChildren: () => import('./legacy/legacy.module').then((m) => m.LegacyModule)
  },
  { path: '**', redirectTo: '' }
];

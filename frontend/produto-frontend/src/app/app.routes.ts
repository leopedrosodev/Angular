import { Routes } from '@angular/router';
import { ProdutoListaComponent } from './components/produto-lista/produto-lista';
import { ProdutoFormComponent } from './components/produto-form/produto-form';

export const routes: Routes = [
  { path: '', component: ProdutoListaComponent },
  { path: 'produto-form', component: ProdutoFormComponent },
  { path: 'produto-form/:id', component: ProdutoFormComponent },
  { path: '**', redirectTo: '' }
];

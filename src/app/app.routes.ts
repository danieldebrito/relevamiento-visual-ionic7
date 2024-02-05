import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'cosas-lindas',
    loadComponent: () => import('./pages/cosas-lindas/cosas-lindas.page').then( m => m.CosasLindasPage)
  },
  {
    path: 'cosas-feas',
    loadComponent: () => import('./pages/cosas-feas/cosas-feas.page').then( m => m.CosasFeasPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },

];



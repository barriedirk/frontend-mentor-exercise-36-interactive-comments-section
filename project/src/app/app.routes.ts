import { Routes } from '@angular/router';

import { MainLayout } from '@app/layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'comments',
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'comments',
        loadComponent: () => import('./features/comments/comments').then((m) => m.Comments),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];

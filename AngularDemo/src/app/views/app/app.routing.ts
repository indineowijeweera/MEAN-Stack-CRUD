import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BlankPageComponent } from './blank-page/blank-page.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'customers' },
      {
        path: 'customers',
        loadChildren: () =>
          import('./customers/customers.module').then(
            (m) => m.CustomersModule
          ),
      },
      {
        path: 'applications',
        loadChildren: () =>
          import('./applications/applications.module').then(
            (m) => m.ApplicationsModule
          ),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui',
        loadChildren: () => import('./ui/ui.module').then((m) => m.UiModule),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuModule),
      },
      { path: 'blank-page', component: BlankPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RegComponent } from './reg/reg.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children:
      [      
        { path: 'auth', component: AuthComponent },
        { path: 'reg', component: RegComponent },
      ]
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

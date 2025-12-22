import { Routes } from '@angular/router';
import { VendedorManagerComponent } from './vendedor-manager.component';
import { ClienteManagerComponent } from './cliente-manager.component';
import { AutoManagerComponent } from './auto-manager.component';
import { ConcesionariaManagerComponent } from './concesionaria-manager.component';
import { LoginComponent } from './login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'vendedores', component: VendedorManagerComponent, canActivate: [authGuard] },
  { path: 'clientes', component: ClienteManagerComponent, canActivate: [authGuard] },
  { path: 'autos', component: AutoManagerComponent, canActivate: [authGuard] },
  { path: 'concesionarias', component: ConcesionariaManagerComponent, canActivate: [authGuard] }
];

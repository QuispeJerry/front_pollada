import { Routes } from '@angular/router';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: TarjetasComponent, canActivate: [AuthGuard]  },
    { path: 'login', component: LoginComponent},
    { path: '**', component: TarjetasComponent }
];

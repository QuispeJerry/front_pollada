import { Routes } from '@angular/router';
import { TarjetasComponent } from './tarjetas/tarjetas.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: TarjetasComponent },
    { path: '**', component: TarjetasComponent }
];

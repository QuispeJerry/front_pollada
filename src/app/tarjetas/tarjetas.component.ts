import { Component, OnInit } from '@angular/core';
import { Tarjeta } from '../models/tarjeta';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarjetaService } from '../service/TarjetaService';

@Component({
  selector: 'app-tarjetas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {
  tarjetas: Tarjeta[] = [
    { rol: 'recibido pagado', numero: 1 },
    { rol: 'no recibido no pagado', numero: 2 },
    // ... (agrega el resto de tarjetas)
  ];

  tarjetas2: Tarjeta[] = [];
  filtroNumero: number | null = null;
  filtroRol: string | null = null;
  modalAbierto: boolean = false;
  tarjetaSeleccionada: Tarjeta | null = null;

  constructor(private tarjetaService: TarjetaService) { }

  ngOnInit() {
    this.cargarTarjetas();
  }

  cargarTarjetas() {
    this.tarjetaService.getTarjetas().subscribe({
      next: (tarjetas2: Tarjeta[]) => {
        this.tarjetas2 = tarjetas2;
        console.log('Tarjetas cargadas:', this.tarjetas2); // Mostrar en consola
      },
      error: (error) => {
        console.error('Error al cargar tarjetas:', error);
      }
    });
  }

  getTarjetaClass(rol: string): string {
    switch (rol) {
      case 'recibido pagado':
        return 'tarjeta1';
      case 'recibido no pagado':
        return 'tarjeta2';
      case 'no recibido no pagado':
        return 'tarjeta3';
      case 'no recibido pagado':
        return 'tarjeta4';
      default:
        return 'tarjeta';
    }
  }

  tarjetasFiltradas(): Tarjeta[] {
    return this.tarjetas.filter(tarjeta => {
      const numeroCoincide = this.filtroNumero === null || tarjeta.numero === this.filtroNumero;
      const rolCoincide = this.filtroRol === null || tarjeta.rol === this.filtroRol;
      return numeroCoincide && rolCoincide;
    });
  }

  abrirModal(tarjeta: Tarjeta) {
    this.tarjetaSeleccionada = tarjeta;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.tarjetaSeleccionada = null;
  }

  guardarCambios() {
    this.modalAbierto = false;
  }
}

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
  tarjetas2: Tarjeta[] = [];
  filtroNumero: number | null = null; // Aquí se usa el ID
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
        this.ordenarTarjetas(); // Ordenar tarjetas al cargar
        console.log('Tarjetas cargadas:', this.tarjetas2);
      },
      error: (error) => {
        console.error('Error al cargar tarjetas:', error);
      }
    });
  }

  ordenarTarjetas() {
    this.tarjetas2.sort((a, b) => a.id - b.id); // Ordenar por ID
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
    return this.tarjetas2.filter(tarjeta => {
      const numeroCoincide = this.filtroNumero === null || tarjeta.id === this.filtroNumero; // Comparar con id
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
    if (this.tarjetaSeleccionada) {
      this.tarjetaService.updateTarjeta(this.tarjetaSeleccionada.id, this.tarjetaSeleccionada).subscribe({
        next: () => {
          console.log('Tarjeta actualizada:', this.tarjetaSeleccionada);
          this.cerrarModal(); // Cerrar modal después de guardar cambios
          this.cargarTarjetas(); // Recargar tarjetas
        },
        error: (error) => {
          console.error('Error al actualizar tarjeta:', error);
        }
      });
    }
  }
}

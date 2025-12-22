import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoService } from './auto.service';
import { Auto } from './auto';

@Component({
  selector: 'app-auto-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Gestión de Autos</h2>
      
      <!-- Formulario -->
      <div class="form-section">
        <h3>{{ editingId() ? 'Editar' : 'Nuevo' }} Auto</h3>
        <form (ngSubmit)="submitForm()">
          <div class="form-group">
            <label>Marca:</label>
            <input [(ngModel)]="formData.marca" name="marca" required class="form-control">
          </div>
          <div class="form-group">
            <label>Modelo:</label>
            <input [(ngModel)]="formData.modelo" name="modelo" required class="form-control">
          </div>
          <div class="form-group">
            <label>Año:</label>
            <input type="number" [(ngModel)]="formData.anio" name="anio" required class="form-control">
          </div>
          <div class="form-group">
            <label>Color:</label>
            <input [(ngModel)]="formData.color" name="color" required class="form-control">
          </div>
          <div class="form-group">
            <label>Número de Serie:</label>
            <input [(ngModel)]="formData.numeroSerie" name="numeroSerie" required class="form-control">
          </div>
          <div class="button-group">
            <button type="submit" class="btn btn-primary">{{ editingId() ? 'Actualizar' : 'Crear' }}</button>
            <button type="button" (click)="cancelEdit()" class="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>

      <!-- Lista -->
      <div class="list-section">
        <h3>Lista de Autos</h3>
        <div *ngIf="error()" class="error">{{ error() }}</div>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Color</th>
              <th>Nº Serie</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let auto of autos()">
              <td>{{ auto.id }}</td>
              <td>{{ auto.marca }}</td>
              <td>{{ auto.modelo }}</td>
              <td>{{ auto.anio }}</td>
              <td>{{ auto.color }}</td>
              <td>{{ auto.numeroSerie }}</td>
              <td>
                <button (click)="editAuto(auto)" class="btn btn-sm btn-warning">Editar</button>
                <button (click)="deleteAuto(auto.id!)" class="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-section {
      background: #f5f5f5;
      padding: 20px;
      margin-bottom: 30px;
      border-radius: 8px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .button-group {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-primary {
      background: #007bff;
      color: white;
    }
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    .btn-warning {
      background: #ffc107;
      color: black;
    }
    .btn-danger {
      background: #dc3545;
      color: white;
    }
    .btn-sm {
      padding: 4px 8px;
      font-size: 12px;
      margin-right: 5px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
    }
    .table th, .table td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .table th {
      background: #dc3545;
      color: white;
    }
    .error {
      color: red;
      padding: 10px;
      margin-bottom: 10px;
    }
  `]
})
export class AutoManagerComponent implements OnInit {
  autos = signal<Auto[]>([]);
  editingId = signal<number | null>(null);
  error = signal<string>('');
  
  formData = {
    marca: '',
    modelo: '',
    anio: new Date().getFullYear(),
    color: '',
    numeroSerie: ''
  };

  constructor(private autoService: AutoService) {}

  ngOnInit() {
    this.loadAutos();
  }

  loadAutos() {
    this.autoService.getAutos().subscribe({
      next: (data) => this.autos.set(data),
      error: (err) => this.error.set('Error al cargar autos')
    });
  }

  submitForm() {
    const auto = new Auto(
      this.formData.marca,
      this.formData.modelo,
      this.formData.anio,
      this.formData.color,
      this.formData.numeroSerie
    );

    if (this.editingId()) {
      auto.id = this.editingId()!;
      this.autoService.updateAuto(auto).subscribe({
        next: () => {
          this.loadAutos();
          this.cancelEdit();
        },
        error: (err) => this.error.set('Error al actualizar')
      });
    } else {
      this.autoService.addAuto(auto).subscribe({
        next: () => {
          this.loadAutos();
          this.cancelEdit();
        },
        error: (err) => this.error.set('Error al crear')
      });
    }
  }

  editAuto(auto: Auto) {
    this.editingId.set(auto.id!);
    this.formData = {
      marca: auto.marca,
      modelo: auto.modelo,
      anio: auto.anio,
      color: auto.color,
      numeroSerie: auto.numeroSerie
    };
  }

  deleteAuto(id: number) {
    if (confirm('¿Está seguro de eliminar este auto?')) {
      this.autoService.deleteAuto(id).subscribe({
        next: () => this.loadAutos(),
        error: (err) => this.error.set('Error al eliminar')
      });
    }
  }

  cancelEdit() {
    this.editingId.set(null);
    this.formData = {
      marca: '',
      modelo: '',
      anio: new Date().getFullYear(),
      color: '',
      numeroSerie: ''
    };
  }
}

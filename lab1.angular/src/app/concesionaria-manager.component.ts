import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConcesionariaService } from './concesionaria.service';
import { Concesionaria } from './concesionaria';

@Component({
  selector: 'app-concesionaria-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Gestión de Concesionarias</h2>
      
      <!-- Formulario -->
      <div class="form-section">
        <h3>{{ editingId() ? 'Editar' : 'Nueva' }} Concesionaria</h3>
        <form (ngSubmit)="submitForm()">
          <div class="form-group">
            <label>Nombre:</label>
            <input [(ngModel)]="formData.nombre" name="nombre" required class="form-control">
          </div>
          <div class="form-group">
            <label>Dirección:</label>
            <input [(ngModel)]="formData.direccion" name="direccion" required class="form-control">
          </div>
          <div class="form-group">
            <label>Teléfono:</label>
            <input [(ngModel)]="formData.telefono" name="telefono" required class="form-control">
          </div>
          <div class="form-group">
            <label>Ciudad:</label>
            <input [(ngModel)]="formData.ciudad" name="ciudad" required class="form-control">
          </div>
          <div class="form-group">
            <label>Gerente:</label>
            <input [(ngModel)]="formData.gerente" name="gerente" required class="form-control">
          </div>
          <div class="button-group">
            <button type="submit" class="btn btn-primary">{{ editingId() ? 'Actualizar' : 'Crear' }}</button>
            <button type="button" (click)="cancelEdit()" class="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>

      <!-- Lista -->
      <div class="list-section">
        <h3>Lista de Concesionarias</h3>
        <div *ngIf="error()" class="error">{{ error() }}</div>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Ciudad</th>
              <th>Gerente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let concesionaria of concesionarias()">
              <td>{{ concesionaria.id }}</td>
              <td>{{ concesionaria.nombre }}</td>
              <td>{{ concesionaria.direccion }}</td>
              <td>{{ concesionaria.telefono }}</td>
              <td>{{ concesionaria.ciudad }}</td>
              <td>{{ concesionaria.gerente }}</td>
              <td>
                <button (click)="editConcesionaria(concesionaria)" class="btn btn-sm btn-warning">Editar</button>
                <button (click)="deleteConcesionaria(concesionaria.id!)" class="btn btn-sm btn-danger">Eliminar</button>
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
      background: #6f42c1;
      color: white;
    }
    .error {
      color: red;
      padding: 10px;
      margin-bottom: 10px;
    }
  `]
})
export class ConcesionariaManagerComponent implements OnInit {
  concesionarias = signal<Concesionaria[]>([]);
  editingId = signal<number | null>(null);
  error = signal<string>('');
  
  formData = {
    nombre: '',
    direccion: '',
    telefono: '',
    ciudad: '',
    gerente: ''
  };

  constructor(private concesionariaService: ConcesionariaService) {}

  ngOnInit() {
    this.loadConcesionarias();
  }

  loadConcesionarias() {
    this.concesionariaService.getConcesionarias().subscribe({
      next: (data) => this.concesionarias.set(data),
      error: (err) => this.error.set('Error al cargar concesionarias')
    });
  }

  submitForm() {
    const concesionaria = new Concesionaria(
      this.formData.nombre,
      this.formData.direccion,
      this.formData.telefono,
      this.formData.ciudad,
      this.formData.gerente
    );

    if (this.editingId()) {
      concesionaria.id = this.editingId()!;
      this.concesionariaService.updateConcesionaria(concesionaria).subscribe({
        next: () => {
          this.loadConcesionarias();
          this.cancelEdit();
        },
        error: (err) => this.error.set('Error al actualizar')
      });
    } else {
      this.concesionariaService.addConcesionaria(concesionaria).subscribe({
        next: () => {
          this.loadConcesionarias();
          this.cancelEdit();
        },
        error: (err) => this.error.set('Error al crear')
      });
    }
  }

  editConcesionaria(concesionaria: Concesionaria) {
    this.editingId.set(concesionaria.id!);
    this.formData = {
      nombre: concesionaria.nombre,
      direccion: concesionaria.direccion,
      telefono: concesionaria.telefono,
      ciudad: concesionaria.ciudad,
      gerente: concesionaria.gerente
    };
  }

  deleteConcesionaria(id: number) {
    if (confirm('¿Está seguro de eliminar esta concesionaria?')) {
      this.concesionariaService.deleteConcesionaria(id).subscribe({
        next: () => this.loadConcesionarias(),
        error: (err) => this.error.set('Error al eliminar')
      });
    }
  }

  cancelEdit() {
    this.editingId.set(null);
    this.formData = {
      nombre: '',
      direccion: '',
      telefono: '',
      ciudad: '',
      gerente: ''
    };
  }
}

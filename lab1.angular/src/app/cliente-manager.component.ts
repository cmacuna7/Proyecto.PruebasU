import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';

@Component({
  selector: 'app-cliente-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Gestión de Clientes</h2>
      
      <!-- Formulario -->
      <div class="form-section">
        <h3>{{ editingId() ? 'Editar' : 'Nuevo' }} Cliente</h3>
        <form (ngSubmit)="submitForm()">
          <div class="form-group">
            <label>Nombre:</label>
            <input [(ngModel)]="formData.nombre" name="nombre" required class="form-control">
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" [(ngModel)]="formData.email" name="email" required class="form-control">
          </div>
          <div class="form-group">
            <label>Teléfono:</label>
            <input [(ngModel)]="formData.telefono" name="telefono" required class="form-control">
          </div>
          <div class="form-group">
            <label>Dirección:</label>
            <input [(ngModel)]="formData.direccion" name="direccion" required class="form-control">
          </div>
          <div class="form-group">
            <label>Ciudad:</label>
            <input [(ngModel)]="formData.ciudad" name="ciudad" required class="form-control">
          </div>
          <div class="button-group">
            <button type="submit" class="btn btn-primary">{{ editingId() ? 'Actualizar' : 'Crear' }}</button>
            <button type="button" (click)="cancelEdit()" class="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>

      <!-- Lista -->
      <div class="list-section">
        <h3>Lista de Clientes</h3>
        <div *ngIf="error()" class="error">{{ error() }}</div>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Ciudad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let cliente of clientes()">
              <td>{{ cliente._id }}</td>
              <td>{{ cliente.nombre }}</td>
              <td>{{ cliente.email }}</td>
              <td>{{ cliente.telefono }}</td>
              <td>{{ cliente.direccion }}</td>
              <td>{{ cliente.ciudad }}</td>
              <td>
                <button (click)="editCliente(cliente)" class="btn btn-sm btn-warning">Editar</button>
                <button (click)="deleteCliente(cliente._id!)" class="btn btn-sm btn-danger">Eliminar</button>
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
      background: #28a745;
      color: white;
    }
    .error {
      color: red;
      padding: 10px;
      margin-bottom: 10px;
    }
  `]
})
export class ClienteManagerComponent implements OnInit {
  clientes = signal<Cliente[]>([]);
  editingId = signal<string | null>(null);
  error = signal<string>('');
  
  formData = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: ''
  };

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data) => this.clientes.set(data),
      error: (err) => this.error.set('Error al cargar clientes')
    });
  }

  submitForm() {
    const cliente = new Cliente(
      this.formData.nombre,
      this.formData.email,
      this.formData.telefono,
      this.formData.direccion,
      this.formData.ciudad
    );

    if (this.editingId()) {
      cliente._id = this.editingId()!;
      this.clienteService.updateCliente(cliente).subscribe({
        next: () => {
          this.loadClientes();
          this.cancelEdit();
        },
        error: (err) => this.error.set('Error al actualizar')
      });
    } else {
      this.clienteService.addCliente(cliente).subscribe({
        next: () => {
          this.loadClientes();
          this.cancelEdit();
        },
        error: (err) => this.error.set('Error al crear')
      });
    }
  }

  editCliente(cliente: Cliente) {
    this.editingId.set(cliente._id!);
    this.formData = {
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      ciudad: cliente.ciudad
    };
  }

  deleteCliente(id: string) {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => this.loadClientes(),
        error: (err) => this.error.set('Error al eliminar')
      });
    }
  }

  cancelEdit() {
    this.editingId.set(null);
    this.formData = {
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      ciudad: ''
    };
  }
}

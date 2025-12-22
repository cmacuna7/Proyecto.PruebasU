import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-box">
        <h2>Iniciar Sesión</h2>
        <p class="subtitle">Sistema de Gestión - Concesionarias</p>
        
        <div *ngIf="error()" class="error">{{ error() }}</div>
        
        <form (ngSubmit)="onLogin()">
          <div class="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              [(ngModel)]="email" 
              name="email" 
              required 
              class="form-control"
              placeholder="admin@consecionaria.com">
          </div>
          
          <div class="form-group">
            <label>Contraseña:</label>
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password" 
              required 
              class="form-control"
              placeholder="••••••••">
          </div>
          
          <button type="submit" class="btn btn-primary" [disabled]="loading()">
            {{ loading() ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
          </button>
        </form>
        
        <div class="hint">
          <p><strong>Credenciales de prueba:</strong></p>
          <p>Email: admin@consecionaria.com</p>
          <p>Contraseña: consesionariachida</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .login-box {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 400px;
    }
    
    h2 {
      margin: 0 0 10px 0;
      color: #333;
      text-align: center;
    }
    
    .subtitle {
      text-align: center;
      color: #666;
      margin-bottom: 30px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }
    
    .form-control {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.3s;
      box-sizing: border-box;
    }
    
    .form-control:focus {
      outline: none;
      border-color: #667eea;
    }
    
    .btn {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .btn-primary:hover:not(:disabled) {
      opacity: 0.9;
    }
    
    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .error {
      background: #fee;
      color: #c33;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 20px;
      text-align: center;
    }
    
    .hint {
      margin-top: 30px;
      padding: 15px;
      background: #f0f0f0;
      border-radius: 6px;
      font-size: 13px;
    }
    
    .hint p {
      margin: 5px 0;
      color: #666;
    }
    
    .hint strong {
      color: #333;
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  error = signal<string>('');
  loading = signal<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.error.set('');
    this.loading.set(true);

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.router.navigate(['/vendedores']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.msg || 'Error al iniciar sesión');
      }
    });
  }
}

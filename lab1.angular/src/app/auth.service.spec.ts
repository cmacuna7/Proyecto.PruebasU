import { TestBed } from '@angular/core/testing';

// Simulación de servicio de autenticación
class AuthService {
  login(email: string, password: string) {
    if (email === 'admin@consecionaria.com' && password === 'consesionariachida') {
      const token = 'test_token_' + Date.now();
      localStorage.setItem('token', token);
      return { token, email };
    }
    throw new Error('Credenciales inválidas');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  // Test de login exitoso
  it('debería hacer login con credenciales correctas', () => {
    const result = service.login('admin@consecionaria.com', 'consesionariachida');
    
    expect(result).toBeDefined();
    expect(result.token).toBeTruthy();
    expect(result.email).toBe('admin@consecionaria.com');
  });

  // Test de login con email incorrecto
  it('debería rechazar login con email inválido', () => {
    expect(() => {
      service.login('usuario@inválido.com', 'consesionariachida');
    }).toThrowError('Credenciales inválidas');
  });

  // Test de login con contraseña incorrecta
  it('debería rechazar login con contraseña inválida', () => {
    expect(() => {
      service.login('admin@consecionaria.com', 'contraseña_incorrecta');
    }).toThrowError('Credenciales inválidas');
  });

  // Test de logout
  it('debería hacer logout y eliminar token', () => {
    service.login('admin@consecionaria.com', 'consesionariachida');
    expect(service.isAuthenticated()).toBe(true);

    service.logout();
    expect(service.isAuthenticated()).toBe(false);
  });

  // Test de isAuthenticated después de login
  it('debería devolver true para isAuthenticated después de login', () => {
    service.login('admin@consecionaria.com', 'consesionariachida');
    expect(service.isAuthenticated()).toBe(true);
  });

  // Test de isAuthenticated sin login
  it('debería devolver false para isAuthenticated sin login', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  // Test de getToken
  it('debería devolver token después de login', () => {
    service.login('admin@consecionaria.com', 'consesionariachida');
    const token = service.getToken();
    
    expect(token).toBeTruthy();
    expect(token).toContain('test_token_');
  });

  // Test de getToken sin login
  it('debería devolver null para getToken sin login', () => {
    const token = service.getToken();
    expect(token).toBeNull();
  });

  // Test de múltiples logins
  it('debería manejar múltiples logins y actualizar token', (done) => {
    const token1 = service.login('admin@consecionaria.com', 'consesionariachida').token;
    
    // Esperar 10ms para que Date.now() cambie
    setTimeout(() => {
      const token2 = service.login('admin@consecionaria.com', 'consesionariachida').token;
      
      expect(token1).not.toBe(token2);
      expect(service.getToken()).toBe(token2);
      done();
    }, 10);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteManagerComponent } from './cliente-manager.component';
import { ClienteService } from './cliente.service';
import { of, throwError } from 'rxjs';
import { Cliente } from './cliente';

describe('ClienteManagerComponent', () => {
    let component: ClienteManagerComponent;
    let fixture: ComponentFixture<ClienteManagerComponent>;
    let mockClienteService: jasmine.SpyObj<ClienteService>;

    const mockClientes: Cliente[] = [
        new Cliente('Juan', 'juan@test.com', '123456789', 'Calle 1', 'Ciudad 1'),
        new Cliente('Maria', 'maria@test.com', '987654321', 'Calle 2', 'Ciudad 2')
    ];
    mockClientes[0]._id = '1';
    mockClientes[1]._id = '2';

    beforeEach(async () => {
        mockClienteService = jasmine.createSpyObj('ClienteService', ['getClientes', 'addCliente', 'updateCliente', 'deleteCliente']);

        // Setup default mock returns
        mockClienteService.getClientes.and.returnValue(of(mockClientes));
        mockClienteService.addCliente.and.returnValue(of(mockClientes[0]));
        mockClienteService.updateCliente.and.returnValue(of(mockClientes[0]));
        mockClienteService.deleteCliente.and.returnValue(of(undefined));

        await TestBed.configureTestingModule({
            imports: [ClienteManagerComponent],
            providers: [
                { provide: ClienteService, useValue: mockClienteService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ClienteManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Trigger ngOnInit and loadClientes
    });

    it('debería crearse correctamente', () => {
        expect(component).toBeTruthy();
    });

    it('debería cargar los clientes al iniciar', () => {
        expect(mockClienteService.getClientes).toHaveBeenCalled();
        expect(component.clientes().length).toBe(2);
        expect(component.clientes()).toEqual(mockClientes);
    });

    it('debería agregar un nuevo cliente', () => {
        const newClienteData = {
            nombre: 'Nuevo',
            email: 'nuevo@test.com',
            telefono: '111222333',
            direccion: 'Calle Nueva',
            ciudad: 'Ciudad Nueva'
        };

        component.formData = { ...newClienteData };
        component.submitForm();

        expect(mockClienteService.addCliente).toHaveBeenCalled();
        // Verifica que se llamó con un objeto Cliente conteniendo los datos
        const callArgs = mockClienteService.addCliente.calls.mostRecent().args[0];
        expect(callArgs.nombre).toBe(newClienteData.nombre);
        expect(callArgs.email).toBe(newClienteData.email);

        // Verifica que se recargaron los clientes y se limpió el formulario
        expect(mockClienteService.getClientes).toHaveBeenCalledTimes(2); // 1 en init, 1 despues de add
        expect(component.formData.nombre).toBe('');
    });

    it('debería preparar el formulario para edición (editCliente)', () => {
        const clienteToEdit = mockClientes[0];
        component.editCliente(clienteToEdit);

        expect(component.editingId()).toBe(clienteToEdit._id!);
        expect(component.formData.nombre).toBe(clienteToEdit.nombre);
        expect(component.formData.email).toBe(clienteToEdit.email);
    });

    it('debería actualizar un cliente existente', () => {
        const clienteToEdit = mockClientes[0];
        component.editCliente(clienteToEdit);

        // Simular cambio en el formulario
        component.formData.nombre = 'Juan Modificado';

        component.submitForm();

        expect(mockClienteService.updateCliente).toHaveBeenCalled();
        const callArgs = mockClienteService.updateCliente.calls.mostRecent().args[0];
        expect(callArgs._id).toBe(clienteToEdit._id);
        expect(callArgs.nombre).toBe('Juan Modificado');

        expect(component.editingId()).toBeNull(); // Se debe resetear el modo edición
    });

    it('debería eliminar un cliente si se confirma', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        const idToDelete = '1';

        component.deleteCliente(idToDelete);

        expect(window.confirm).toHaveBeenCalled();
        expect(mockClienteService.deleteCliente).toHaveBeenCalledWith(idToDelete);
        expect(mockClienteService.getClientes).toHaveBeenCalledTimes(2); // Reload after delete
    });

    it('no debería eliminar un cliente si no se confirma', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        const idToDelete = '1';

        component.deleteCliente(idToDelete);

        expect(window.confirm).toHaveBeenCalled();
        expect(mockClienteService.deleteCliente).not.toHaveBeenCalled();
    });

    it('debería cancelar la edición', () => {
        component.editingId.set('1');
        component.formData.nombre = 'Texto en progreso';

        component.cancelEdit();

        expect(component.editingId()).toBeNull();
        expect(component.formData.nombre).toBe('');
    });

    it('debería manejar errores al cargar clientes', () => {
        mockClienteService.getClientes.and.returnValue(throwError(() => new Error('Error')));
        component.loadClientes(); // Forzar recarga

        expect(component.error()).toBe('Error al cargar clientes');
    });

    it('debería manejar errores al crear cliente', () => {
        mockClienteService.addCliente.and.returnValue(throwError(() => new Error('Error')));

        component.formData = {
            nombre: 'Test',
            email: 'test@test.com',
            telefono: '123',
            direccion: 'Dir',
            ciudad: 'Ciu'
        };
        component.submitForm();

        expect(component.error()).toBe('Error al crear');
    });

    it('debería manejar errores al actualizar cliente', () => {
        component.editCliente(mockClientes[0]);
        mockClienteService.updateCliente.and.returnValue(throwError(() => new Error('Error')));

        component.submitForm();

        expect(component.error()).toBe('Error al actualizar');
    });

    it('debería manejar errores al eliminar cliente', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        mockClienteService.deleteCliente.and.returnValue(throwError(() => new Error('Error')));

        component.deleteCliente('1');

        expect(component.error()).toBe('Error al eliminar');
    });
});

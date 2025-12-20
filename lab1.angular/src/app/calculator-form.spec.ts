import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CalculatorFormComponent } from './calculator-form';
import { Calculator } from './calculator';

describe('CalculatorFormComponent - HTML Elements', () => {
  let component: CalculatorFormComponent;
  let fixture: ComponentFixture<CalculatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CalculatorFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 1. Prueba: Verificar que el input de número A existe
  it('should have input element for number A with id "numberA"', () => {
    const inputElement = fixture.debugElement.nativeElement.querySelector('#numberA');
    expect(inputElement).toBeTruthy();
    expect(inputElement.type).toBe('number');
  });

  // 2. Prueba: Verificar que el input de número B existe y es un campo de número
  it('should have input element for number B with id "numberB"', () => {
    const inputElement = fixture.debugElement.nativeElement.querySelector('#numberB');
    expect(inputElement).toBeTruthy();
    expect(inputElement.type).toBe('number');
    expect(inputElement.getAttribute('placeholder')).toContain('Ingrese número B');
  });

  // 3. Prueba: Verificar que el select de operación existe y tiene las opciones correctas
  it('should have select element with multiply and divide options', () => {
    const selectElement = fixture.debugElement.nativeElement.querySelector('#operation');
    expect(selectElement).toBeTruthy();
    const options = selectElement.querySelectorAll('option');
    expect(options.length).toBe(2);
    expect(options[0].value).toBe('multiply');
    expect(options[1].value).toBe('divide');
  });

  // 4. Prueba: Verificar que el botón de calcular existe y tiene el texto correcto
  it('should have calculate button with correct text and id', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#calculateBtn');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Calcular');
    expect(button.classList.contains('btn-calculate')).toBeTruthy();
  });

  // 5. Prueba: Verificar que el resultado se muestra en el DOM cuando se calcula
  it('should display result div when result is not null', () => {
    component.numberA = 5;
    component.numberB = 3;
    component.operation = 'multiply';
    component.calculate();
    fixture.detectChanges();

    const resultDiv = fixture.debugElement.nativeElement.querySelector('#resultDiv');
    expect(resultDiv).toBeTruthy();
    
    const resultValue = fixture.debugElement.nativeElement.querySelector('#resultValue');
    expect(resultValue).toBeTruthy();
    expect(resultValue.textContent).toBe('15');
  });

  // Bonus: Prueba que el resultado está vinculado correctamente a través de two-way binding
  it('should update result when clicking calculate button', () => {
    const inputA = fixture.debugElement.nativeElement.querySelector('#numberA');
    const inputB = fixture.debugElement.nativeElement.querySelector('#numberB');
    const button = fixture.debugElement.nativeElement.querySelector('#calculateBtn');

    inputA.value = 10;
    inputB.value = 2;
    inputA.dispatchEvent(new Event('input'));
    inputB.dispatchEvent(new Event('input'));
    component.numberA = 10;
    component.numberB = 2;

    button.click();
    fixture.detectChanges();

    const resultValue = fixture.debugElement.nativeElement.querySelector('#resultValue');
    expect(resultValue.textContent).toBe('20');
  });
});

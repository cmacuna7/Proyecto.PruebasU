import { Calculator } from './calculator';

var calculator: any;
beforeEach(() => {
  calculator = new Calculator();
});

describe('Calculator', () => {
  describe('Test for Multiply', () => {
    it('should return twelve', () => {
      //Arrange
  
      let number1 = 3;
      let number2 = 4;
      let expected = 12;
      //Act
      let result = calculator.multiply(number1, number2);
      //Assert
      expect(result).toEqual(expected);
    });
  });
  describe('Test for Divide', () => {
    it('divide for a number', () => {
      //Arrange
     
      //Act y Assert
      expect(calculator.divide(6, 3)).toEqual(2);
      expect(calculator.divide(5, 2)).toEqual(2.5);
    });
    
  });
// d.	Probar los matcher de Jasmine (se puede ver en su página oficial)
  describe('Jasmine Matchers', () => {
    it('test of matchers', () => {
      let name = 'Marcelo';
      let name2;

      expect(name).toBeDefined();
      expect(name2).toBeUndefined();

      expect(1 + 1 === 2).toBeTrue();
      expect(1 + 1 === 3).toBeFalsy();

      expect(5).toBeLessThan(10);
      expect(5).toBeGreaterThan(1);
      
      expect('cadena de texto').toMatch(/ena/);

      expect(['apple', 'orange','pears']).toContain('orange');

    });
  });

  // 1. Realizar 5 casos de prueba para elementos o componentes Angular
  // (orientada a elementos HTML), guiándose de la documentación oficial de Jasmine.
  describe('HTML Elements Tests', () => {
    let htmlElement: HTMLElement;

    beforeEach(() => {
      // Crear un contenedor para los tests de elementos HTML
      htmlElement = document.createElement('div');
      document.body.appendChild(htmlElement);
    });

    afterEach(() => {
      // Limpiar el DOM después de cada prueba
      document.body.removeChild(htmlElement);
    });

    // Caso 1: Verificar que un input existe y tiene el atributo type="number"
    it('should create input element with type number', () => {
      const input = document.createElement('input');
      input.type = 'number';
      input.id = 'numberInput';
      htmlElement.appendChild(input);

      const element = document.getElementById('numberInput') as HTMLInputElement;
      expect(element).toBeTruthy();
      expect(element.type).toBe('number');
    });

    // Caso 2: Verificar que un label existe y contiene texto específico
    it('should create label element with correct text', () => {
      const label = document.createElement('label');
      label.textContent = 'Número A:';
      label.htmlFor = 'numA';
      htmlElement.appendChild(label);

      const element = htmlElement.querySelector('label');
      expect(element).toBeTruthy();
      expect(element?.textContent).toContain('Número A:');
      expect(element?.getAttribute('for')).toBe('numA');
    });

    // Caso 3: Verificar que un button existe y tiene una clase CSS
    it('should create button element with correct class', () => {
      const button = document.createElement('button');
      button.textContent = 'Calcular';
      button.id = 'calcBtn';
      button.classList.add('btn-calculate');
      htmlElement.appendChild(button);

      const element = document.getElementById('calcBtn') as HTMLButtonElement;
      expect(element).toBeTruthy();
      expect(element.textContent).toBe('Calcular');
      expect(element.classList.contains('btn-calculate')).toBeTruthy();
    });

    // Caso 4: Verificar que un select existe con opciones específicas
    it('should create select element with correct options', () => {
      const select = document.createElement('select');
      select.id = 'operationSelect';
      
      const option1 = document.createElement('option');
      option1.value = 'multiply';
      option1.textContent = 'Multiplicar';
      
      const option2 = document.createElement('option');
      option2.value = 'divide';
      option2.textContent = 'Dividir';
      
      select.appendChild(option1);
      select.appendChild(option2);
      htmlElement.appendChild(select);

      const element = document.getElementById('operationSelect') as HTMLSelectElement;
      expect(element).toBeTruthy();
      expect(element.options.length).toBe(2);
      expect(element.options[0].value).toBe('multiply');
      expect(element.options[1].value).toBe('divide');
    });

    // Caso 5: Verificar que un div de resultado existe y puede mostrar contenido dinámico
    it('should create result div and update content dynamically', () => {
      const resultDiv = document.createElement('div');
      resultDiv.id = 'resultDiv';
      resultDiv.className = 'result-box';
      
      const resultSpan = document.createElement('span');
      resultSpan.id = 'resultValue';
      resultSpan.textContent = '15';
      
      resultDiv.appendChild(resultSpan);
      htmlElement.appendChild(resultDiv);

      const element = document.getElementById('resultDiv');
      const valueElement = document.getElementById('resultValue');
      
      expect(element).toBeTruthy();
      expect(element?.classList.contains('result-box')).toBeTruthy();
      expect(valueElement?.textContent).toBe('15');
      
      // Actualizar dinámicamente
      (valueElement as HTMLElement).textContent = '20';
      expect(valueElement?.textContent).toBe('20');
    });
  });

});
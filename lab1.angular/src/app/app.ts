import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Calculator } from './calculator';
import { CalculatorFormComponent } from './calculator-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalculatorFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

//siguendo TDD 
export class App implements OnInit {
  title = signal('Laboratiorio1!');

  ngOnInit(): void {
    /*// Crear instancia del calculador para ejecutar pruebas simples (TDD)
    let calculator = new Calculator();

    // Prueba multiply: 3 * 5 = 15
    let result = calculator.multiply(3, 5);
    console.log(result === 15); // true
    console.log(result !== 9); // true

    // Prueba divide: 6 / 3 = 2
    let result2 = calculator.divide(6, 3);
    console.log(result2 === 2); // true
    console.log(result2 !== 50); // true

    // Prueba división por cero: debe devolver null
    let result3 = calculator.divide(5, 0);
    console.log(result3 === null); // true */
  
  }
}

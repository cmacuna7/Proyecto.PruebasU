import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Calculator } from './calculator';

@Component({
  selector: 'app-calculator-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './calculator-form.html',
  styleUrl: './calculator-form.css'
})
export class CalculatorFormComponent implements OnInit {
  calculator: Calculator = new Calculator();
  numberA: number = 0;
  numberB: number = 0;
  result: number | null = null;
  operation: string = 'multiply';

  ngOnInit(): void {
    // Calculator ya está inicializado
  }

  calculate(): void {
    if (this.operation === 'multiply') {
      this.result = this.calculator.multiply(this.numberA, this.numberB);
    } else if (this.operation === 'divide') {
      this.result = this.calculator.divide(this.numberA, this.numberB);
    }
  }
}

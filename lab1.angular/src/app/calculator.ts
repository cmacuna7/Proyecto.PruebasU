export class Calculator {
    multiply(numberA: number, numberB: number) {
        return numberA * numberB;
    } 

    divide(numberA: number, numberB: number) {
        if (numberB === 0) {
            return null;
        }
        return numberA / numberB;
    }
 }
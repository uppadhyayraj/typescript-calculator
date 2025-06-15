import { Addition } from './operations/Addition';
import { Subtraction } from './operations/Subtraction';
import { Multiplication } from './operations/Multiplication';
import { Division } from './operations/Division';
import { Power } from './operations/Power';
import { SquareRoot } from './operations/SquareRoot';

export class Calculator {
  add(a: number, b: number): number {
    return Addition.calculate(a, b);
  }

  subtract(a: number, b: number): number {
    return Subtraction.calculate(a, b);
  }

  multiply(a: number, b: number): number {
    return Multiplication.calculate(a, b);
  }

  divide(a: number, b: number): number {
    return Division.calculate(a, b);
  }

  power(base: number, exponent: number): number {
    return Power.calculate(base, exponent);
  }

  sqrt(n: number): number {
    return SquareRoot.calculate(n);
  }

  // Chain operations for fluent API
  private result: number = 0;

  setValue(value: number): Calculator {
    this.result = value;
    return this;
  }

  addValue(value: number): Calculator {
    this.result = this.add(this.result, value);
    return this;
  }

  subtractValue(value: number): Calculator {
    this.result = this.subtract(this.result, value);
    return this;
  }

  multiplyValue(value: number): Calculator {
    this.result = this.multiply(this.result, value);
    return this;
  }

  divideValue(value: number): Calculator {
    this.result = this.divide(this.result, value);
    return this;
  }

  getResult(): number {
    return this.result;
  }

  clear(): Calculator {
    this.result = 0;
    return this;
  }
}
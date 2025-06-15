import { Calculator } from '../src/Calculator';

describe('Calculator', () => {
  let calc: Calculator;

  beforeEach(() => {
    calc = new Calculator();
  });

  describe('Basic Operations', () => {
    test('should add numbers', () => {
      expect(calc.add(5, 3)).toBe(8);
    });

    test('should subtract numbers', () => {
      expect(calc.subtract(10, 4)).toBe(6);
    });

    test('should multiply numbers', () => {
      expect(calc.multiply(7, 6)).toBe(42);
    });

    test('should divide numbers', () => {
      expect(calc.divide(15, 3)).toBe(5);
    });

    test('should calculate power', () => {
      expect(calc.power(2, 8)).toBe(256);
    });

    test('should calculate square root', () => {
      expect(calc.sqrt(16)).toBe(4);
    });
  });

  describe('Chained Operations', () => {
    test('should chain operations correctly', () => {
      const result = calc
        .setValue(10)
        .addValue(5)
        .multiplyValue(2)
        .subtractValue(3)
        .getResult();
      
      expect(result).toBe(27); // (10 + 5) * 2 - 3 = 27
    });

    test('should clear result', () => {
      calc.setValue(100).clear();
      expect(calc.getResult()).toBe(0);
    });

    test('should handle complex chaining', () => {
      const result = calc
        .setValue(2)
        .multiplyValue(3)
        .addValue(4)
        .divideValue(2)
        .getResult();
      
      expect(result).toBe(5); // ((2 * 3) + 4) / 2 = 5
    });
  });

  describe('Error Handling', () => {
    test('should throw error on division by zero', () => {
      expect(() => calc.divide(10, 0)).toThrow('Division by zero is not allowed');
    });

    test('should throw error on square root of negative', () => {
      expect(() => calc.sqrt(-4)).toThrow('Square root of negative number is not allowed');
    });

    test('should throw error on chained division by zero', () => {
      expect(() => calc.setValue(10).divideValue(0)).toThrow('Division by zero is not allowed');
    });
  });
});
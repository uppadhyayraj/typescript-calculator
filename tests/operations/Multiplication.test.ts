import { Multiplication } from '../../src/operations/Multiplication';

describe('Multiplication', () => {
  test('should multiply two positive numbers', () => {
    expect(Multiplication.calculate(4, 5)).toBe(20);
  });

  test('should multiply positive and negative numbers', () => {
    expect(Multiplication.calculate(4, -5)).toBe(-20);
  });

  test('should multiply two negative numbers', () => {
    expect(Multiplication.calculate(-4, -5)).toBe(20);
  });

  test('should multiply by zero', () => {
    expect(Multiplication.calculate(5, 0)).toBe(0);
    expect(Multiplication.calculate(0, 5)).toBe(0);
  });

  test('should multiply decimal numbers', () => {
    expect(Multiplication.calculate(2.5, 4)).toBe(10);
  });
});

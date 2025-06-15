import { Subtraction } from '../../src/operations/Subtraction';

describe('Subtraction', () => {
  test('should subtract two positive numbers', () => {
    expect(Subtraction.calculate(10, 3)).toBe(7);
  });

  test('should subtract negative from positive', () => {
    expect(Subtraction.calculate(5, -3)).toBe(8);
  });

  test('should subtract positive from negative', () => {
    expect(Subtraction.calculate(-5, 3)).toBe(-8);
  });

  test('should subtract zero', () => {
    expect(Subtraction.calculate(5, 0)).toBe(5);
  });

  test('should subtract decimal numbers', () => {
    expect(Subtraction.calculate(5.7, 2.3)).toBeCloseTo(3.4);
  });
});

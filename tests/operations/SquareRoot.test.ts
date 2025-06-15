import { SquareRoot } from '../../src/operations/SquareRoot';

describe('SquareRoot', () => {
  test('should calculate square root of positive number', () => {
    expect(SquareRoot.calculate(16)).toBe(4);
  });

  test('should calculate square root of zero', () => {
    expect(SquareRoot.calculate(0)).toBe(0);
  });

  test('should calculate square root of decimal', () => {
    expect(SquareRoot.calculate(2.25)).toBe(1.5);
  });

  test('should throw error for negative number', () => {
    expect(() => SquareRoot.calculate(-4)).toThrow('Square root of negative number is not allowed');
  });
});
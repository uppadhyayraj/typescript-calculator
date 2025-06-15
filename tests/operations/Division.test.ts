import { Division } from '../../src/operations/Division';

describe('Division', () => {
  test('should divide two positive numbers', () => {
    expect(Division.calculate(15, 3)).toBe(5);
  });

  test('should divide positive and negative numbers', () => {
    expect(Division.calculate(15, -3)).toBe(-5);
  });

  test('should divide two negative numbers', () => {
    expect(Division.calculate(-15, -3)).toBe(5);
  });

  test('should divide decimal numbers', () => {
    expect(Division.calculate(7.5, 2.5)).toBe(3);
  });

  test('should throw error when dividing by zero', () => {
    expect(() => Division.calculate(5, 0)).toThrow('Division by zero is not allowed');
  });

  test('should handle zero dividend', () => {
    expect(Division.calculate(0, 5)).toBe(0);
  });
});
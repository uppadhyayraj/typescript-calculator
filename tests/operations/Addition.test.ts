import { Addition } from '../../src/operations/Addition';

describe('Addition', () => {
  test('should add two positive numbers', () => {
    expect(Addition.calculate(5, 3)).toBe(8);
  });

  test('should add positive and negative numbers', () => {
    expect(Addition.calculate(5, -3)).toBe(2);
  });

  test('should add two negative numbers', () => {
    expect(Addition.calculate(-5, -3)).toBe(-8);
  });

  test('should add zero', () => {
    expect(Addition.calculate(5, 0)).toBe(5);
    expect(Addition.calculate(0, 5)).toBe(5);
  });

  test('should add decimal numbers', () => {
    expect(Addition.calculate(2.5, 3.7)).toBeCloseTo(6.2);
  });
});
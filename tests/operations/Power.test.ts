import { Power } from '../../src/operations/Power';

describe('Power', () => {
  test('should calculate positive base and exponent', () => {
    expect(Power.calculate(2, 3)).toBe(8);
  });

  test('should calculate negative base and even exponent', () => {
    expect(Power.calculate(-2, 2)).toBe(4);
  });

  test('should calculate negative base and odd exponent', () => {
    expect(Power.calculate(-2, 3)).toBe(-8);
  });

  test('should calculate power of zero', () => {
    expect(Power.calculate(5, 0)).toBe(1);
  });

  test('should calculate base of zero', () => {
    expect(Power.calculate(0, 5)).toBe(0);
  });

  test('should calculate decimal exponent', () => {
    expect(Power.calculate(4, 0.5)).toBe(2);
  });
});
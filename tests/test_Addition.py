typescript
import { Addition } from '../src/operations/Addition';

describe('Addition class', () => {
  describe('calculate function', () => {
    it('should perform basic addition correctly', () => {
      const result = Addition.calculate(5, 3);
      expect(result).toBe(2);
    });

    it('should handle negative numbers correctly', () => {
      const result = Addition.calculate(-5, -3);
      expect(result).toBe(-8);
    });

    it('should handle zero correctly', () => {
      const result = Addition.calculate(0, 0);
      expect(result).toBe(0);
    });
  });
});
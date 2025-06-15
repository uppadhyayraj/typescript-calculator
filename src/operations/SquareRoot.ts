export class SquareRoot {
  static calculate(n: number): number {
    if (n < 0) {
      throw new Error('Square root of negative number is not allowed');
    }
    return Math.sqrt(n);
  }
}
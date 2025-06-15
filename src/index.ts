import { Calculator } from './Calculator';

const calc = new Calculator();

console.log('TypeScript Calculator Demo');
console.log('========================');

// Basic operations
console.log('Basic Operations:');
console.log(`5 + 3 = ${calc.add(5, 3)}`);
console.log(`10 - 4 = ${calc.subtract(10, 4)}`);
console.log(`7 * 6 = ${calc.multiply(7, 6)}`);
console.log(`15 / 3 = ${calc.divide(15, 3)}`);
console.log(`2^8 = ${calc.power(2, 8)}`);
console.log(`√16 = ${calc.sqrt(16)}`);

// Chained operations
console.log('\nChained Operations:');
const result = calc
    .setValue(10)
    .addValue(5)
    .multiplyValue(2)
    .subtractValue(3)
    .getResult();

console.log(`(10 + 5) * 2 - 3 = ${result}`);

// Error handling
console.log('\nError Handling:');
try {
    calc.divide(10, 0);
} catch (error: any) {
    console.log(`Division by zero error: ${error.message}`);
}

try {
    calc.sqrt(-4);
} catch (error: any) {
    console.log(`Square root error: ${error.message}`);
}

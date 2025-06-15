# TypeScript Calculator

A modular TypeScript calculator application with comprehensive testing, featuring separate classes for each mathematical operation and a fluent API for chaining calculations.

## Features

- **Modular Architecture**: Each mathematical operation is implemented in its own class
- **Type Safety**: Full TypeScript support with strict type checking
- **Comprehensive Testing**: 100% test coverage with Jest
- **Fluent API**: Chain multiple operations together
- **Error Handling**: Proper error handling for edge cases
- **Linting**: ESLint configuration for code quality
- **Modern Setup**: Latest TypeScript and testing frameworks

## Mathematical Operations

- **Addition**: Add two numbers
- **Subtraction**: Subtract two numbers  
- **Multiplication**: Multiply two numbers
- **Division**: Divide two numbers (with zero-division protection)
- **Power**: Raise a number to a power
- **Square Root**: Calculate square root (with negative number protection)

## Project Structure

```
typescript-calculator/
├── src/
│   ├── operations/
│   │   ├── Addition.ts
│   │   ├── Subtraction.ts
│   │   ├── Multiplication.ts
│   │   ├── Division.ts
│   │   ├── Power.ts
│   │   └── SquareRoot.ts
│   ├── Calculator.ts
│   └── index.ts
├── tests/
│   ├── operations/
│   │   ├── Addition.test.ts
│   │   ├── Subtraction.test.ts
│   │   ├── Multiplication.test.ts
│   │   ├── Division.test.ts
│   │   ├── Power.test.ts
│   │   └── SquareRoot.test.ts
│   └── Calculator.test.ts
├── package.json
├── tsconfig.json
├── jest.config.js
├── .eslintrc.js
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd typescript-calculator
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Basic Operations

```typescript
import { Calculator } from './src/Calculator';

const calc = new Calculator();

// Basic arithmetic
console.log(calc.add(5, 3));        // 8
console.log(calc.subtract(10, 4));  // 6
console.log(calc.multiply(7, 6));   // 42
console.log(calc.divide(15, 3));    // 5
console.log(calc.power(2, 8));      // 256
console.log(calc.sqrt(16));         // 4
```

### Chained Operations

```typescript
const result = calc
  .setValue(10)
  .addValue(5)
  .multiplyValue(2)
  .subtractValue(3)
  .getResult();

console.log(result); // 27 -> ((10 + 5) * 2) - 3
```

### Using Individual Operation Classes

```typescript
import { Addition } from './src/operations/Addition';
import { Division } from './src/operations/Division';

console.log(Addition.calculate(5, 3));    // 8
console.log(Division.calculate(15, 3));   // 5
```

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled application
- `npm run dev` - Run the application directly with ts-node
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Check code quality with ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run clean` - Remove compiled files

## Testing

The project includes comprehensive tests for all operations and calculator functionality:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode during development
npm run test:watch
```

### Test Coverage

The project maintains high test coverage standards:
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+
- **Statements**: 80%+

## Error Handling

The calculator handles common edge cases:

- **Division by Zero**: Throws descriptive error
- **Square Root of Negative Numbers**: Throws descriptive error
- **Invalid Input Types**: TypeScript compile-time protection

```typescript
try {
  calc.divide(10, 0);
} catch (error) {
  console.log(error.message); // "Division by zero is not allowed"
}

try {
  calc.sqrt(-4);
} catch (error) {
  console.log(error.message); // "Square root of negative number is not allowed"  
}
```

## Development

### Code Quality

The project uses ESLint with TypeScript-specific rules:
- Strict type checking
- No implicit any types
- Explicit return types required
- Unused variable detection

### TypeScript Configuration

- Target: ES2020
- Strict mode enabled
- Source maps generated
- Declaration files created

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Check code quality: `npm run lint`
7. Submit a pull request

## License

MIT License - see LICENSE file for details

## Requirements

- Node.js 16.0.0 or higher
- npm or yarn package manager

## Architecture Decisions

### Modular Design
Each mathematical operation is implemented as a separate class with static methods, making the codebase:
- Easy to test in isolation
- Simple to extend with new operations
- Clear separation of concerns

### Static Methods vs Instance Methods
Operation classes use static methods because:
- Operations are stateless functions
- No need to instantiate objects for pure calculations
- Better performance and memory usage

### Fluent API Design
The Calculator class provides both direct method calls and a fluent chaining API:
- Direct methods for simple calculations
- Chaining methods for complex operations
- Internal state management for chained operations

This design provides flexibility for different use cases while maintaining clean, readable code.
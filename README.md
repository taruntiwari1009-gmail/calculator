# Calculator

A compact React calculator with a responsive button layout and a small arithmetic expression parser.

## Features

- Addition, subtraction, multiplication and division
- Decimal input and sign toggle
- Percentage conversion
- Operator precedence (multiplication and division before addition and subtraction)
- Clear/reset control
- Division-by-zero and invalid-expression handling
- Accessible live calculator display

## Tech stack

- React 18
- Create React App
- JavaScript

## Getting started

### Requirements

- Node.js (LTS recommended)
- npm

### Install dependencies

```bash
npm ci
```

### Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Run tests

```bash
npm test
```

### Create a production build

```bash
npm run build
```

## Implementation note

Expressions are evaluated by a small arithmetic parser. The application does not use JavaScript eval to execute the entered expression.

## License

No license has been specified. Contact the repository owner before reusing or redistributing this project.

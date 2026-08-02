## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

Clone the repo, then install dependencies:

\`\`\`bash
npm install
\`\`\`

This installs `typescript`, `tsx`, and `@types/node` as dev dependencies.

## Project Structure

\`\`\`
01-oop-pillars/          → Abstraction, Encapsulation, Inheritance, Polymorphism
02-creational-patterns/  → Singleton, Factory, Builder, ...
03-structural-patterns/  → Adapter, Decorator, ...
04-behavioral-patterns/  → Strategy, Observer, ...
\`\`\`

Each topic folder contains:
- `README.md` — conceptual explanation
- `example.ts` — runnable TypeScript example

## Running an Example

Run any example directly with:

\`\`\`bash
npx tsx <path-to-file>.ts
\`\`\`

Example:

\`\`\`bash
npx tsx 01-oop-pillars/abstraction/example.ts
\`\`\`

### Watch Mode (optional)

To automatically re-run a file whenever you edit it:

\`\`\`bash
npx tsx watch <path-to-file>.ts
\`\`\`
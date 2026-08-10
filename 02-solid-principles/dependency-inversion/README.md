# Dependency Inversion Principle (DIP)

> "High-level modules should not depend on low-level modules. Both should depend on abstractions."

The **D** in **SOLID**. This principle prevents a lot of future problems by dealing with them before they even happen. It's a simple but very important rule: don't create a **direct dependency** between a high-level class and a low-level class — both should depend on an **abstraction**.

- **Low-level class**: deals directly with the core operations a feature needs — talking to a network, disk, or database, etc.
- **High-level class**: contains the business logic of the project, and calls the low-level class to execute the operations it needs.

## The Problem

Say we're applying this idea to a reporting feature: `BudgetReport` (high-level) needs to read/write data, so it talks directly to `MySQLDatabase` (low-level).

What happens if you're later forced to change the database type — from MySQL to MongoDB — or a new version of the database comes out and you need to update? These scenarios stop your work, because the high-level class is tied to one concrete implementation. Developing everything depends heavily on the low-level class working in exactly one way.

## ❌ Bad Example

```ts
// Low-level class — concrete, specific implementation
class MySQLDatabase {
  insert(data: unknown): void {
    console.log("MySQL: inserting", data);
  }
  update(data: unknown): void {
    console.log("MySQL: updating", data);
  }
  delete(id: string): void {
    console.log("MySQL: deleting", id);
  }
}

// High-level class — depends directly on the concrete low-level class
class BudgetReport {
  private database: MySQLDatabase;

  constructor() {
    // Tightly coupled to MySQL specifically
    this.database = new MySQLDatabase();
  }

  open(date: string): void {
    console.log(`Opening budget report for ${date}`);
  }

  save(): void {
    this.database.insert({ report: "budget" });
  }
}
```

**Why this is bad:**
- `BudgetReport` (high-level, business logic) is hard-wired to `MySQLDatabase` (low-level, implementation detail).
- Switching to MongoDB — or any other database — means editing `BudgetReport` itself, even though the business logic hasn't changed at all.
- You can't easily swap in a fake/mock database for testing `BudgetReport` in isolation.

## ✅ Good Example

Introduce an **abstraction** (an interface) that both the high-level and low-level classes depend on. Concrete databases implement it, and the high-level class only knows about the interface.

```ts
// Abstraction — the contract both high-level and low-level classes rely on
interface Database {
  insert(data: unknown): void;
  update(data: unknown): void;
  delete(id: string): void;
}

// Low-level class #1
class MySQLDatabase implements Database {
  insert(data: unknown): void {
    console.log("MySQL: inserting", data);
  }
  update(data: unknown): void {
    console.log("MySQL: updating", data);
  }
  delete(id: string): void {
    console.log("MySQL: deleting", id);
  }
}

// Low-level class #2 — a completely different database,
// same abstraction, no changes needed elsewhere
class MongoDatabase implements Database {
  insert(data: unknown): void {
    console.log("MongoDB: inserting", data);
  }
  update(data: unknown): void {
    console.log("MongoDB: updating", data);
  }
  delete(id: string): void {
    console.log("MongoDB: deleting", id);
  }
}

// High-level class — depends only on the abstraction, not a concrete database
class BudgetReport {
  private database: Database;

  // The concrete implementation is "injected" from the outside
  constructor(database: Database) {
    this.database = database;
  }

  open(date: string): void {
    console.log(`Opening budget report for ${date}`);
  }

  save(): void {
    this.database.insert({ report: "budget" });
  }
}
```

Now switching databases requires zero changes to `BudgetReport`:

```ts
const mysqlReport = new BudgetReport(new MySQLDatabase());
mysqlReport.save(); // "MySQL: inserting { report: 'budget' }"

const mongoReport = new BudgetReport(new MongoDatabase());
mongoReport.save(); // "MongoDB: inserting { report: 'budget' }"
```

**Why this is good:**
- `BudgetReport` no longer cares which database it's talking to — it only knows the `Database` contract.
- Adding a new database (or swapping the current one) never touches the high-level business logic.
- Testing becomes trivial: pass in a fake `Database` implementation (e.g. an in-memory mock) instead of a real one.
- Even if the underlying databases differ completely, using the abstraction means you can confidently add, change, or remove any database without worrying about breaking the code tied to it.

## Key Takeaway

If a high-level (business logic) class directly instantiates or hard-codes a low-level (implementation) class, that's a DIP violation. Introduce an interface between them and inject the concrete implementation from the outside instead.
// ==========================================
// ✅ Good Example: Dependency Inversion Principle
// ==========================================

// Step 1: Define abstraction (interface) that high-level and low-level depend on
interface Database {
  insert(data: unknown): void;
  update(data: unknown): void;
  delete(id: string): void;
}

// Low-level class — implements the abstraction
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

// Low-level class — another implementation of the same abstraction
class PostgreSQLDatabase implements Database {
  insert(data: unknown): void {
    console.log("PostgreSQL: inserting", data);
  }
  update(data: unknown): void {
    console.log("PostgreSQL: updating", data);
  }
  delete(id: string): void {
    console.log("PostgreSQL: deleting", id);
  }
}

// High-level class — depends on abstraction, not concrete implementation
class BudgetReport {
  private database: Database;

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

// ✅ Now we can inject ANY database implementation
const mysqlReport = new BudgetReport(new MySQLDatabase());
mysqlReport.save();

const postgresReport = new BudgetReport(new PostgreSQLDatabase());
postgresReport.save();

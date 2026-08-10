// ==========================================
// Test for Dependency Inversion Principle
// ==========================================

// ==========================================
// ❌ Bad Example Test: Tightly coupled to MySQL
// = ==========================================

class MySQLDatabase {
  insert(data: unknown): void {
    console.log("MySQL: inserting", data);
  }
}

class BadBudgetReport {
  private database: MySQLDatabase;

  constructor() {
    this.database = new MySQLDatabase();
  }

  save(): void {
    this.database.insert({ report: "budget" });
  }
}

console.log("=== Bad Example Test ===");
const badReport = new BadBudgetReport();
badReport.save();
console.log("[BAD] Problem: If we want to use PostgreSQL, we must modify BudgetReport class");

// ==========================================
// ✅ Good Example Test: Depends on abstraction
// ==========================================

interface Database {
  insert(data: unknown): void;
}

class MySQLDatabase2 implements Database {
  insert(data: unknown): void {
    console.log("MySQL: inserting", data);
  }
}

class PostgreSQLDatabase implements Database {
  insert(data: unknown): void {
    console.log("PostgreSQL: inserting", data);
  }
}

class MongoDBDatabase implements Database {
  insert(data: unknown): void {
    console.log("MongoDB: inserting", data);
  }
}

class GoodBudgetReport {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  save(): void {
    this.database.insert({ report: "budget" });
  }
}

console.log("\n=== Good Example Test ===");

// Test 1: With MySQL
const mysqlReport = new GoodBudgetReport(new MySQLDatabase2());
mysqlReport.save();
console.log("[GOOD] MySQL works without modifying BudgetReport");

// Test 2: With PostgreSQL - no changes to BudgetReport!
const postgresReport = new GoodBudgetReport(new PostgreSQLDatabase());
postgresReport.save();
console.log("[GOOD] PostgreSQL works without modifying BudgetReport");

// Test 3: Easy to add new database (e.g., MongoDB)
const mongoReport = new GoodBudgetReport(new MongoDBDatabase());
mongoReport.save();
console.log("[GOOD] MongoDB works without modifying BudgetReport");

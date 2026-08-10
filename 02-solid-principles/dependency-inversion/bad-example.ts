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

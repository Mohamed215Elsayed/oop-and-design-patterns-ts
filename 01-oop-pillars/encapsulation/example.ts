class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }
  getBalance(): number {
    return this.balance;
  }
  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive.");
    }
    this.balance += amount;
  }
  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive.");
    }
    if (amount > this.balance) {
      throw new Error("Insufficient funds.");
    }
    this.balance -= amount;
  }
}
const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance());
// account.balance = -5000;
// ❌ Error: Property 'balance' is private and only accessible within class 'BankAccount'.
// account.withdraw(999999);
// ❌ Runtime Error: Insufficient funds.
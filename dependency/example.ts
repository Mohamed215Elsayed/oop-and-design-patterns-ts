class Logger {
    log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }
}
/**************************/
class Invoice {
    constructor(private amount: number) { }

    getAmount(): number {
        return this.amount;
    }
}
/**************************/
class InvoicePrinter {
    // Dependency — InvoicePrinter depends on (Logger) to do its job,
    // but (Logger) is NEITHER a property NOR a parameter of this class.
    // It's created and used LOCALLY inside the method, then discarded
    // right after — the weakest possible relationship between two classes.
    print(invoice: Invoice): void {
        const logger = new Logger();
        logger.log(`Printing invoice with amount: ${invoice.getAmount()}`);

        console.log(`Invoice Amount: ${invoice.getAmount()}`);
    }
}
/**************************/
const invoice = new Invoice(500);
const printer = new InvoicePrinter();
printer.print(invoice);

// Notice: InvoicePrinter has NO property called "logger" at all.
// The Logger only exists during the execution of print() — it's not
// stored anywhere, not shared, and not accessible from outside.
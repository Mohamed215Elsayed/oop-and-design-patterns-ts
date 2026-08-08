interface OrderItem {
  price: number;
  quantity: number;
}
// ==========================================
// ✅ Good Example: فصل الضريبة في class مستقل
// ==========================================

class TaxCalculator {
  getTaxRate(country: string, state: string): number {
    if (country === "US") return this.getUSTax(state);
    if (country === "EU") return this.getEUTax(country);
    return 0;
  }

  private getUSTax(state: string): number {
    return 0.07;
  }

  private getEUTax(country: string): number {
    return 0.20;
  }
}

class OrderGood {
  lineItems: OrderItem[] = [];
  country: string = "";
  state: string = "";
  city: string = "";
  // ...20+ fields أخرى

  // ✅ Order بتستخدم TaxCalculator بدل ما تعمل الحساب بنفسها
  private taxCalculator = new TaxCalculator();

  getOrderTotal(): number {
    let total = 0;
    for (const item of this.lineItems) {
      total += item.price * item.quantity;
    }
    total += total * this.taxCalculator.getTaxRate(this.country, this.state);
    return total;
  }
}

// الفايدة: Order class بقت مسؤولة فقط عن بيانات الطلب،
// وTaxCalculator مسؤول لوحده عن حساب الضريبة بكل تفاصيلها.
// أي تعديل مستقبلي (دولة جديدة، نسبة جديدة) هيتم جوه TaxCalculator بس.


// ==========================================
// تجربة الكود
// ==========================================
const goodOrder = new OrderGood();
goodOrder.lineItems = [{ price: 100, quantity: 2 }];
goodOrder.country = "US";
console.log("Good Order Total:", goodOrder.getOrderTotal());
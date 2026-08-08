// ==========================================
// ❌ Bad Example: كل حاجة جوه Order class واحدة
// ==========================================

interface OrderItem {
  price: number;
  quantity: number;
}

class OrderBad {
  lineItems: OrderItem[] = [];
  country: string = "";
  state: string = "";
  city: string = "";
  // ...20+ fields أخرى ممكن تتواجد هنا

  getOrderTotal(): number {
    let total = 0;
    for (const item of this.lineItems) {
      total += item.price * item.quantity;
    }
    total += total * this.getTaxRate(this.country, this.state);
    return total;
  }

  // ❌ منطق الضريبة كله موجود جوه Order class نفسها
  getTaxRate(country: string, state: string): number {
    if (country === "US") return this.getUSTax(state);
    if (country === "EU") return this.getEUTax(country);
    return 0;
  }

  private getUSTax(state: string): number {
    return 0.07; // مثال مبسط
  }

  private getEUTax(country: string): number {
    return 0.20; // مثال مبسط
  }
}

// المشكلة: Order class بقت مسؤولة عن حاجتين مختلفتين تمامًا:
// (1) تمثيل بيانات الطلب  (2) حساب الضريبة بكل تفاصيلها

// ==========================================
// تجربة الكود
// ==========================================

const badOrder = new OrderBad();
badOrder.lineItems = [{ price: 100, quantity: 2 }];
badOrder.country = "US";
console.log("Bad Order Total:", badOrder.getOrderTotal());

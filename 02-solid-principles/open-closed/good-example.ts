// ==========================================
// ✅ Good Example: Order مفتوح للتوسع، مغلق للتعديل
// ==========================================

interface OrderItem {
  weight: number;
  price: number;
}
// ==========================================
// 1. تعريف الـ interface المشتركة لأي نوع شحن
interface Shipping {
  getCost(order: Order): number;
  getDate(order: Order): Date;
}
// ==========================================
// 2. كل نوع شحن بيعمل implement مستقل للـ interface
class Ground implements Shipping {
  getCost(order: Order): number {
    // Free ground delivery on big orders.
    if (order.getTotal() > 100) {
      return 0;
    }
    // $1.5 per kilogram, but $10 minimum.
    return Math.max(10, order.getTotalWeight() * 1.5);
  }

  getDate(order: Order): Date {
    const date = new Date();
    date.setDate(date.getDate() + 5); // مثال: 5 أيام
    return date;
  }
}
// ==========================================
class Air implements Shipping {
  getCost(order: Order): number {
    // $3 per kilogram, but $20 minimum.
    return Math.max(20, order.getTotalWeight() * 3);
  }

  getDate(order: Order): Date {
    const date = new Date();
    date.setDate(date.getDate() + 2); // مثال: يومين
    return date;
  }
}
// ==========================================
class Sea implements Shipping {
  getCost(order: Order): number {
    // $1 per kilogram, but $15 minimum.
    return Math.max(15, order.getTotalWeight() * 1);
  }

  getDate(order: Order): Date {
    const date = new Date();
    date.setDate(date.getDate() + 7); // مثال: 7 أيام
    return date;
  }
}
// ==========================================
// 3. Order بقت "has a" Shipping بدل ما تعرف تفاصيل كل نوع
class Order {
  lineItems: OrderItem[] = [];
  private shipping!: Shipping;

  getTotal(): number {
    return this.lineItems.reduce((sum, item) => sum + item.price, 0);
  }

  getTotalWeight(): number {
    return this.lineItems.reduce((sum, item) => sum + item.weight, 0);
  }

  setShippingType(shipping: Shipping): void {
    this.shipping = shipping;
  }

  getShippingCost(): number {
    return this.shipping.getCost(this);
  }

  getShippingDate(): Date {
    return this.shipping.getDate(this);
  }
}

// ==========================================
// تجربة الكود
// ==========================================

const orderGood = new Order();
orderGood.lineItems = [{ weight: 5, price: 50 }];

orderGood.setShippingType(new Air());
console.log("Air Shipping Cost:", orderGood.getShippingCost());

orderGood.setShippingType(new Sea()); // ✅ نوع جديد بدون تعديل في Order
console.log("Sea Shipping Cost:", orderGood.getShippingCost());
// ==========================================
// ❌ Bad Example: منطق الشحن hard-coded جوه Order
// ==========================================

interface OrderItem {
  weight: number;
  price: number;
}

class Order {
  lineItems: OrderItem[] = [];
  shipping: string = "";

  getTotal(): number {
    return this.lineItems.reduce((sum, item) => sum + item.price, 0);
  }

  getTotalWeight(): number {
    return this.lineItems.reduce((sum, item) => sum + item.weight, 0);
  }

  setShippingType(shipping: string): void {
    this.shipping = shipping;
  }

  // ❌ أي نوع شحن جديد لازم يتضاف هنا => تعديل مباشر في Order
  getShippingCost(): number {
    if (this.shipping === "ground") {
      // Free ground delivery on big orders.
      if (this.getTotal() > 100) {
        return 0;
      }
      // $1.5 per kilogram, but $10 minimum.
      return Math.max(10, this.getTotalWeight() * 1.5);
    }

    if (this.shipping === "air") {
      // $3 per kilogram, but $20 minimum.
      return Math.max(20, this.getTotalWeight() * 3);
    }

    // لو حبينا نضيف "sea" مثلاً، لازم نيجي هنا ونضيف else if جديدة!
    return 0;
  }
}

// المشكلة: لو Order class ده مستخدم في أكتر من مكان في المشروع أو مشترك مع فريق تاني，
// أي تعديل هنا (إضافة نوع شحن جديد) بيحمل خطر كسر الكود الحالي.

const orderBad = new Order();
orderBad.lineItems = [{ weight: 5, price: 50 }];
orderBad.setShippingType("air");
console.log("Bad Shipping Cost:", orderBad.getShippingCost());
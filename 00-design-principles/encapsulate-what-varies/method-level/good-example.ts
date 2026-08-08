interface OrderItem {
  price: number;
  quantity: number;
}

interface Order {
  lineItems: OrderItem[];
  country: string;
}
// ==========================================
// ✅ Good Example: فصل الـ logic في method مستقلة
// ==========================================

function getTaxRate(country: string): number {
  if (country === "US") {
    return 0.07; // US sales tax
  }
  else if (country === "EU") {
    return 0.20; // European VAT
  }
  return 0;
}

function getOrderTotalGood(order: Order): number {
  let total = 0;

  for (const item of order.lineItems) {
    total += item.price * item.quantity;
  }

  total += total * getTaxRate(order.country);

  return total;
}

// الفايدة: getOrderTotalGood بقت ثابتة (stable)،
// وأي تعديل في نسب الضريبة أو إضافة دولة جديدة هيتم فقط جوه getTaxRate.


// ==========================================
// تجربة الكود
// ==========================================

const orderEU: Order = {
  lineItems: [
    { price: 100, quantity: 2 },
    { price: 50, quantity: 1 },
  ],
  country: "EU",
};
const orderUS: Order = {
  lineItems: [
    { price: 100, quantity: 2 }, // 200
    { price: 50, quantity: 1 },  // 50
  ],
  country: "US",
};
console.log("Good Example Total (EU):", getOrderTotalGood(orderEU));
console.log("Good Example Total (US):", getOrderTotalGood(orderUS));

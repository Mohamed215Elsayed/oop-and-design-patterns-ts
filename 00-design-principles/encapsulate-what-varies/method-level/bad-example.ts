// ==========================================
// ❌ Bad Example: كل الـ logic في method واحدة
// ==========================================

interface OrderItem {
  price: number;
  quantity: number;
}

interface Order {
  lineItems: OrderItem[];
  country: string;
}

function getOrderTotalBad(order: Order): number {
  let total = 0;

  for (const item of order.lineItems) {
    total += item.price * item.quantity;
  }

  // ❌ منطق الضريبة متضمن مباشرة جوه نفس الـ method
  if (order.country === "US") {
    total += total * 0.07; // US sales tax
  }
  else if (order.country === "EU") {
    total += total * 0.20; // European VAT
  }

  return total;
}

// المشكلة: لو ظهرت دولة جديدة، أو اتغيرت نسبة الضريبة،
// هنضطر نعدل جوه getOrderTotalBad نفسها، وده بيزود خطورة كسر الكود.
// ==========================================
// 🧪 Test: تجربة getOrderTotalBad بأرقام حقيقية
// ==========================================

// مثال 1: طلب من أمريكا
const orderUS: Order = {
  lineItems: [
    { price: 100, quantity: 2 }, // 200
    { price: 50, quantity: 1 },  // 50
  ],
  country: "US",
};

// المجموع قبل الضريبة = 250
// الضريبة الأمريكية = 7% => 250 * 0.07 = 17.5
// الإجمالي = 250 + 17.5 = 267.5
console.log("US Order Total:", getOrderTotalBad(orderUS)); // 267.5


// مثال 2: طلب من أوروبا
const orderEU: Order = {
  lineItems: [
    { price: 100, quantity: 2 }, // 200
    { price: 50, quantity: 1 },  // 50
  ],
  country: "EU",
};

// المجموع قبل الضريبة = 250
// ضريبة أوروبا (VAT) = 20% => 250 * 0.20 = 50
// الإجمالي = 250 + 50 = 300
console.log("EU Order Total:", getOrderTotalBad(orderEU)); // 300


// مثال 3: طلب من دولة مش متعامل معاها (زي مصر مثلًا)
const orderEG: Order = {
  lineItems: [
    { price: 100, quantity: 2 }, // 200
    { price: 50, quantity: 1 },  // 50
  ],
  country: "EG",
};

// مفيش شرط بيتحقق (لا US ولا EU) => مفيش ضريبة تتضاف
// الإجمالي = 250 (بدون ضريبة!) => ده بيوضح مشكلة تانية:
// الدالة مش قابلة للتوسع بسهولة لإضافة دول جديدة
console.log("EG Order Total:", getOrderTotalBad(orderEG)); // 250
class Rectangle {
  protected width: number = 0;
  protected height: number = 0;

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}
// ==========================================
class Square extends Rectangle {
  // ❌ عملنا override وخلينا setWidth تغيّر الاتنين مع بعض
  setWidth(width: number): void {
    this.width = width;
    this.height = width;
  }

  setHeight(height: number): void {
    this.width = height;
    this.height = height;
  }
}
// ==========================================
function testArea(rectangle: Rectangle): void {
  rectangle.setWidth(6);
  rectangle.setHeight(10);
  // Expect rectangle's area to be 60 (6 * 10)
  console.log("Area:", rectangle.getArea());
}
// ==========================================
const rect = new Rectangle();
testArea(rect); // النتيجة: 60 ✅ صحيحة
// ==========================================
const square = new Square();
testArea(square); // النتيجة: 100 ❌ خطأ! (لأن setHeight غيّرت width كمان)
/*
الحل الشائع: متخليش Square يرث من Rectangle أصلاً! بدل كده، اعمل 
abstract Shape وخلي Rectangle وSquare يرثوا منها كل واحد مستقل، أو استخدم composition
 بدل inheritance (زي ما اتكلمنا قبل كده في مبدأ Favor Composition).
*/

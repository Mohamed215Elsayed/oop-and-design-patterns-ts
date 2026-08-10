// ==========================================
// ✅ Good Example: إعادة تصميم بدل الاستبدال الخاطئ
// ==========================================

// 1. Document الأساسي: فقط السلوك المشترك بين كل الأنواع
class Document {
  protected data: string = "";
  protected filename: string = "";

  open(): void {
    console.log(`Opening document: ${this.filename}`);
  }
}
// ==========================================
// 2. WritableDocument: يرث من Document ويضيف القدرة على الحفظ
//    أي مستند قابل للتعديل يرث من هنا، مش من Document مباشرة
class WritableDocument extends Document {
  save(): void {
    console.log(`Saving document: ${this.filename}`);
  }
}
// ==========================================
// 3. ReadOnlyDocument: يرث من Document بس (بدون save من الأساس)
class ReadOnlyDocument extends Document {
  // لا save() هنا — لأنه غير موجود في Document الأصلي
}
// ==========================================
// الاستبدال بقى آمن تمامًا
// ==========================================

// ✅ الدالة دي بتشتغل فقط على المستندات القابلة للحفظ فعليًا
function saveAllDocuments(documents: WritableDocument[]): void {
  documents.forEach(doc => doc.save());
}

const writable1 = new WritableDocument();
const writable2 = new WritableDocument();
const readOnly1 = new ReadOnlyDocument();

// ✅ كل عنصر هنا نوعه WritableDocument فعلاً — الاستبدال آمن
saveAllDocuments([writable1, writable2]);


// ❌ لو حاولنا نعمل الكود ده، TypeScript هيرفضه وقت الـ compile نفسه:
// saveAllDocuments([writable1, readOnly1]);
// Error: Argument of type 'ReadOnlyDocument' is not assignable to type 'WritableDocument'.

// ✅ ReadOnlyDocument لسه يقدر يستخدم السلوك المشترك (open) بأمان
readOnly1.open();
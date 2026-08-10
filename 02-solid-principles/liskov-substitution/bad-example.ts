// ==========================================
// ❌ Bad Example: ReadOnlyDocument بيضعف الـ post-condition
// ==========================================

class Document {
  protected data: string = "";
  protected filename: string = "";

  open(): void {
    console.log(`Opening document: ${this.filename}`);
  }

  save(): void {
    console.log(`Saving document: ${this.filename}`);
  }
}
// ==========================================
class ReadOnlyDocument extends Document {
  // ❌ عملنا override وكسرنا الضمان الأساسي لـ save():
  // المفروض save() تحفظ الملف، لكنها هنا بترمي exception دايمًا!
  save(): void {
    throw new Error("Unable to save read-only file.");
  }
}
// ==========================================
// المشكلة تظهر هنا
// ==========================================

function saveAllDocuments(documents: Document[]): void {
  documents.forEach(doc => doc.save());
}
// ==========================================
const doc1 = new Document();
const doc2 = new ReadOnlyDocument();

// ❌ الكود ده متوقع يشتغل مع أي Document، لكنه هيكسر فجأة (runtime error)
// لأن استبدال Document بـ ReadOnlyDocument مش آمن!
try {
  saveAllDocuments([doc1,doc2]);
} catch (error) {
  console.error("Crashed:", (error as Error).message);
}
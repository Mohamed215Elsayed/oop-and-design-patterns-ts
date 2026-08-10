L — Liskov Substitution Principle (LSP)
الفكرة الأساسية

المبدأ ده عبارة عن مجموعة قواعد الهدف منها تضمن إن أي subclass يقدر يحل محل الـ superclass بتاعه في أي مكان في البرنامج من غير ما يحصل أي مشكلة أو سلوك غير متوقع.

فيه ناس كتير بتقول إن LSP هو أساسًا القواعد اللي بتحافظ على Open-Closed Principle — لأن لو الاستبدال مش آمن، يبقى إضافة subclass جديد (وهو المفروض يكون "extension" آمن) بقى خطر على الكود.

المثال الكلاسيكي: لو عندك method زي:
feed(Animal obj)

ولو بعتلها Cat obj بدل Animal obj، لازم البرنامج يفضل شغال بالظبط زي ما هو متوقع — لأن الـ Cat هي فعليًا نوع من الـ Animal (is-a relationship).

القواعد الخمسة بالتفصيل
1️⃣ Parameter types in a subclass method should match or be more abstract than the superclass method

يعني: الـ subclass لما يعمل override لأي method، الـ parameters بتاعتها لازم تكون نفس النوع أو أعم (more abstract) من الأصل، مش أضيق.

مثال: لو Animal عندها method بتاخد Cat كـ parameter، والـ subclass بتاعتها لازم تقبل نفس النوع أو نوع أعم زي Animal — مش تضيّق الشرط وتطلب نوع أخص زي PersianCat بس.

ليه؟ لأنك لو استبدلت الـ object بتاع الـ superclass بـ subclass، والـ subclass بقت بتطلب نوع أضيق، فأي كود شغال بيبعت Animal عادي هيكسر لما يوصل للـ subclass.

2️⃣ The return type in a subclass method should match or be a subtype of the superclass method's return type

الـ return type بتاع الـ method في الـ subclass لازم يكون نفس النوع أو subtype منه — يعني أضيق أو نفسه، مش أعم.

مثال: عندك Cat class و BlackCat class (وراثة من Cat). لو عندك دالة:

BlackCat buyCat()

النتيجة ممكن ترجع Cat أو BlackCat، لكن مش منطقي ترجع Dog أو Animal عام. يعني:

رحت تشتري قطة، دفعت فلوسها... ولقيت النتيجة كلب! ده انتهاك واضح.

الفرق بين القاعدة 1 والقاعدة 2: الأولى بتتكلم عن الـ input (لازم يبقى أعم أو نفسه)، والتانية بتتكلم عن الـ output/return (لازم يبقى أضيق أو نفسه). الاتجاه معكوس بين الاتنين ومهم جدًا تفرّق بينهم.

3️⃣ A subclass shouldn't strengthen pre-conditions

Pre-condition = الشرط اللي المفروض يتحقق قبل ما الـ method تشتغل.

لو الـ superclass عندها method فيها شرط زي: "الضريبة لازم متكونش أقل من 10%"، وجيت وعملت override للدالة في الـ subclass وخليت الشرط "لازم متكونش أقل من 15%" — يبقى أنت قوّيت الشرط، وده انتهاك للقاعدة، لأن أي كود بيتوقع يقدر يمرر قيمة 12% (لأنها أكبر من 10% المسموحة في الأصل) هيتفاجئ إنها مرفوضة دلوقتي.

القاعدة ببساطة: الـ subclass ممكن يخفف الشروط (يقبل أكتر)، لكن مينفعش يشددها (يرفض حاجات كانت مقبولة قبل كده).

4️⃣ A subclass shouldn't weaken post-conditions

Post-condition = الحالة أو الضمان اللي المفروض يتحقق بعد ما الـ method تخلص شغلها.

مثال: لو عندك method في الـ superclass بتعمل عملية على قاعدة البيانات وبعدين تقفل الـ connection فورًا. لو الـ subclass عملت override وسابت الـ connection مفتوح، فده إضعاف للـ post-condition، لأن الـ client (الكود اللي بينادي الـ method) مش متوقع إنه محتاج يقفل الـ connection بنفسه — والنتيجة: تسريب موارد (resource leak)، ومشاكل أكبر مع كبر شجرة الوراثة.

القاعدة ببساطة: الـ subclass لازم على الأقل يحافظ على نفس الضمانات اللي الـ superclass بيوفرها بعد التنفيذ، ممكن يزود ضمانات لكن مش يقلل منها.

5️⃣ Invariants of a superclass must be preserved

Invariant = ثابت أو قاعدة لازم تفضل صحيحة طول الوقت، قبل وبعد أي عملية على الـ object.

مثال: لو فيه شرط إن "الراتب لازم متقلش عن 1000 دينار" في الـ superclass، فكل الـ subclasses لازم تحترم القاعدة دي في كل عملياتها، ومينفعش أي subclass "يتجاهلها" أو "يتخطاها".

مثال عملي شهير: Rectangle / Square

ده أشهر مثال بيوضح انتهاك LSP، وهو مبني على قاعدة رياضية: "المربع هو حالة خاصة من المستطيل تتساوى فيها الأضلاع". لكن رياضيًا صح ≠ برمجيًا صح!

الكود اللي بيوضح المشكلة (جرّبه بنفسك)
typescript
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

جرّب دلوقتي الكود ده:
typescript
function testArea(rectangle: Rectangle): void {
  rectangle.setWidth(6);
  rectangle.setHeight(10);
  // Expect rectangle's area to be 60 (6 * 10)
  console.log("Area:", rectangle.getArea());
}

const rect = new Rectangle();
testArea(rect); // النتيجة: 60 ✅ صحيحة

const square = new Square();
testArea(square); // النتيجة: 100 ❌ خطأ! (لأن setHeight غيّرت width كمان)

ليه ده انتهاك لـ LSP؟

الدالة testArea مكتوبة عشان تشتغل مع أي Rectangle، وبتتوقع إن setWidth وsetHeight مستقلين عن بعض. لما استبدلنا الـ Rectangle بـ Square (subclass)، السلوك اتغيّر — وده بالظبط اللي LSP بيمنعه: الاستبدال لازم يحصل من غير ما يكسر توقعات الكود الحالي.

الحل الشائع: متخليش Square يرث من Rectangle أصلاً! بدل كده، اعمل abstract Shape وخلي Rectangle وSquare يرثوا منها كل واحد مستقل، أو استخدم composition بدل inheritance (زي ما اتكلمنا قبل كده في مبدأ Favor Composition).

<!-- ################# -->
# L — Liskov Substitution Principle (LSP)

## المبدأ
مجموعة من القواعد تضمن إنه لو تم استبدال object من الـ `superclass` بأي object من الـ `subclass` بتاعه، البرنامج لازم يفضل يعمل **بشكل صحيح ومتوقع دون أي مشكلة**. هذا يعني الحفاظ على **behavioral subtyping**.

## القواعد الأساسية
1. **Parameters** في method الـ subclass لازم تكون نفس النوع أو **أعم (more abstract)** من الـ superclass.
2. **Return type** في method الـ subclass لازم يكون نفس النوع أو **subtype** منه (أضيق أو نفسه).
3. **A subclass shouldn't strengthen pre-conditions** — الـ subclass ميقدرش يشدد الشروط المطلوبة قبل تنفيذ الـ method.
4. **A subclass shouldn't weaken post-conditions** — الـ subclass ميقدرش يضعف الضمانات بعد تنفيذ الـ method.
5. **Invariants of a superclass must be preserved** — الثوابت الموجودة في الـ superclass لازم تتحفظ في كل الـ subclasses.

## المشكلة (`bad-example.ts`)
عندنا `Document` class فيه `open()` و `save()`. لما عملنا `ReadOnlyDocument extends Document` وعملنا **override** لـ `save()` بحيث ترمي `Exception`، بقينا **ضعّفنا الضمان (post-condition)** اللي المفروض `save()` توفره — الكود اللي بيتعامل مع أي `Document` ويتوقع إن `save()` هتشتغل عادي، هيتفاجئ بـ exception لو اتبعتله `ReadOnlyDocument`.

```typescript
function saveAllDocuments(documents: Document[]): void {
  documents.forEach(doc => doc.save()); // ❌ هينفجر لو فيه ReadOnlyDocument
}
```

هذا انتهاك مباشر لـ LSP: مينفعش نستبدل `Document` بـ `ReadOnlyDocument` بأمان.

## الحل (`good-example.ts`)
بدل ما نخلي `ReadOnlyDocument` يرث `save()` من `Document` ويكسرها بـ exception، بنعيد التصميم:

Document

open()
▲
│
WritableDocument ReadOnlyDocument
save() (بدون save أصلاً)

- `Document`: يحتوي فقط على السلوك المشترك بين كل الأنواع (`open`).
- `WritableDocument`: يرث من `Document` ويضيف `save()` — أي مستند قابل للتعديل يرث من هنا.
- `ReadOnlyDocument`: يرث من `Document` بس، **من غير `save()` من الأساس**.

بكده الدالة اللي محتاجة تحفظ مستندات بتاخد `WritableDocument[]` تحديدًا، فمستحيل نحط `ReadOnlyDocument` جواها — و**الـ compiler نفسه** بيمنع الخطأ ده وقت الـ compile، مش وقت الـ runtime.

## الفايدة
- الاستبدال بين superclass وsubclass بيبقى **آمن دائمًا**.
- الأخطاء بتتكشف وقت الكتابة (compile-time) بدل ما تظهر فجأة أثناء التشغيل (runtime).
- تصميم أوضح: كل subclass بيعبّر فعليًا عن قدراته الحقيقية، من غير "وعود كاذبة" بيرثها من الأب.
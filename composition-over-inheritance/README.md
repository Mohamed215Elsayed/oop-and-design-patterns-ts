# Composition over Inheritance

## المشكلة مع الوراثة (Inheritance)
لما نستخدم الوراثة عشان نشارك سلوك (behavior) بين كلاسات، بنقع في
مشكلة إن كل كلاس فرعي (subclass) بيرث **كل حاجة** موجودة في الكلاس
الأب، حتى لو مش كل subclass محتاج السلوك ده.

في المثال الكلاسيكي (Duck): لو حطينا `fly()` جوه الكلاس الأب
`Duck`، كل الأنواع الفرعية هترث القدرة على الطيران — حتى
`RubberDuck` (البطة المطاطية) اللي مش المفروض تطير أصلاً!

هنا بنضطر نعمل override للـ `fly()` في `RubberDuck` عشان تعمل
"لا حاجة"، وده:
- **Code smell** — بنكتب كود بس عشان نلغي سلوك ورثناه غصب عننا.
- **بيكسر Liskov Substitution Principle (LSP)** — لأن `RubberDuck`
  بقت مش قابلة فعليًا تحل محل `Duck` بنفس السلوك المتوقع.
- **Rigid hierarchy** — أي إضافة نوع جديد من سلوك الطيران (زي
  `FlyWithRocket` مثلاً) هتحتاج تعديل في الشجرة كلها.

## الحل: Composition over Inheritance
بدل ما الكلاس **يرث** سلوك ثابت، خليه **يمتلك (has-a)** كائن
(object) بيمثل السلوك ده، ويستدعيه من خلاله.

في المثال: `Duck` بقى عنده `FlyBehavior` و `QuackBehavior` كـ
properties (interfaces)، وكل نوع بطة بياخد الـ implementation
المناسب له وقت الإنشاء:

```ts
const mallardDuck = new Duck(new FlyWithWings(), new NormalQuack());
const rubberDuck = new Duck(new CannotFly(), new Squeak());
```

## المميزات
- **Flexibility** — تقدر تضيف سلوك جديد (`FlyWithRocket` مثلاً)
  من غير ما تلمس أي كلاس قديم — Open/Closed Principle.
- **إعادة الاستخدام** — نفس الـ `FlyBehavior` ممكن يتشارك بين أي
  كلاس محتاجه، مش بس الـ `Duck`.
- **التغيير وقت التشغيل (Runtime)** — زي ما شفنا في المثال،
  `rubberDuck.setFlyBehavior(new FlyWithWings())` بتغير سلوك الكائن
  وهو شغال، وده مستحيل تعمله بالوراثة العادية.
- **مفيش code smells** — مفيش overrides فاضية بس عشان تلغي سلوك
  مش محتاجه.

## الخلاصة
- **Inheritance** → "is-a" علاقة ثابتة وقت الـ compile، بتفرض على
  الابن كل حاجة عند الأب حتى لو مش محتاجها.
- **Composition** → "has-a" علاقة مرنة، بتدي الكلاس بس السلوك
  اللي محتاجه فعلاً، وممكن تتغير حتى وقت التشغيل.

القاعدة المشهورة: *"Favor composition over inheritance"* — استخدم
الوراثة لما تكون العلاقة "is-a" حقيقية ومستقرة (زي `Teacher extends
Users` اللي شفناها في أمثلة Aggregation)، واستخدم الـ Composition
لما يكون عندك سلوك متغير أو مشترك بين كلاسات مش بالضرورة لها نفس
الأصل.
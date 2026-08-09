Program to an Interface, not an Implementation

ده واحد من أهم مبادئ التصميم. الفكرة الأساسية إنك تبني الكود بناءً على abstract/interface، بدل ما تعتمد بشكل مباشر على concrete classes. ومقياس مرونة أي كود هو: إزاي هيكون سهل تضيف عنصر جديد من غير ما تكسر أو تعدّل في الكود الموجود بشكل غير مقبول؟

ملاحظة: الـ concrete class هي class جاهزة وصعبة التعديل ("صلبة")، وبتمثل Entity له معنى واضح — زي Developer أو Tester جوه Company. باختصار: مش abstract class، ومش class عملت implement لكل الـ methods اللي ورثتها.

المشكلة (بالطريقة التقليدية)

لو عندنا Employee و Company، أول حاجة هتيجي في بالك هي إنك تربطهم مباشرة (Company بتعتمد مباشرة على classes زي Designer, Programmer... إلخ). المشكلة إن ده بيخلي Company مرتبطة (dependent) بكل نوع موظف بشكل مباشر — فلو حبيت تضيف نوع موظف جديد، هتضطر تعدّل جوه Company نفسها.

الحل — خطوات التطبيق
حدد بالظبط إيه اللي كل object محتاجه من التاني، وإيه الـ methods اللي المفروض تتنفذ.
عرّف الـ methods دي جوه abstract/interface.
اعمل implementation للـ interface دي على الـ classes اللي كانت بتعتمد على الـ concrete class، وخليها تعتمد على الـ interface بدل ما تعتمد على الـ class نفسها.
المثال: Company Group

تخيل شركة أم (Company) بتدير مجموعة شركات فرعية (زي GameDev Company وOutsourcing Company). كل شركة عندها موظفين بيشتغلوا في مجالات مختلفة (تصميم، برمجة...)، لكن كلهم بيتشاركوا في حاجة واحدة: كلهم بيشتغلوا (doWork)، حتى لو طبيعة الشغل مختلفة.

خطوات التطبيق على المثال:
الشركة الأم فيها مجموعة شركات، وكل شركة بتحدد نوع الموظفين اللي تابعين ليها وطبيعة شغلهم.
بننشئ interface اسمها Employee فيها method مشتركة doWork() — لأن العمل هو القاسم المشترك، حتى لو نوعه مختلف.
الشركات الفرعية (GameDev Company, Outsourcing Company) بتكون subclasses وراثة من الـ superclass (Company). كل شركة بترجع موظفينها من خلال getEmployees()، وكل موظف (Designer, Programmer, Tester...) بيعمل implement لـ Employee interface.
الـ Diagram
┌───────────────┐
┌──────────────────────┐ │ «interface» │
│ employees = getEmp() │ │ Employee │
│ foreach (e in emp) { │────────▶│ │
│ e.doWork() │ │ + doWork() │
│ } │ └───────▲───────┘
└──────────┬────────────┘ │
│ │
┌──────▼──────┐ │
│ Company │ │
│ │ │
│+ getEmployees() │
│+ createSoftware() │
└──────▲──────┘ │
│ │
┌──────┴───────┐ │
│ │ │
┌───▼────┐ ┌─────▼──────┐ ┌─────▼──────┐
│GameDev │ │Outsourcing │ │ Designer │
│Company │ │ Company │◇───────▶│ + doWork() │
│ │ │ │ └─────────────┘
│+getEmp()│ │+getEmp() │ (+ Programmer,
└────┬───┘ └─────┬──────┘ Tester, ...)
│ │
return [ return [
new Designer(), new Programmer(),
new Artist(), new Tester(),
... ...
] ]

النتيجة النهائية: الـ Company بقت مستقلة تمامًا عن الـ concrete employee classes. الـ Company بتتعامل بس مع Employee interface (من خلال doWork())، ومش عارفة ولا مهتمة بتفاصيل كل نوع موظف. الـ objects الفعلية بتتنشأ جوه الـ subclasses (GameDevCompany, OutsourcingCompany) اللي كل واحدة بترجع الموظفين المناسبين ليها.

ليه ده مهم؟

لو حبيت تضيف نوع موظف جديد (زي Artist أو QA Engineer)، كل اللي هتعمله إنك تعمل class جديد يعمل implement لـ Employee interface. الـ Company نفسها مش هتتلمس خالص — مفيش تعديل، مفيش خطر كسر كود موجود. وده بالظبط تعريف الـ flexibility اللي اتكلمنا عليه في الأول.

<!-- ############################## -->

# Program to an Interface, not an Implementation

## المبدأ

هذا المبدأ يشير إلى بناء الكود بناءً على **abstract/interface**، بدلاً من الاعتماد المباشر على **concrete classes**. مقياس مرونة أي كود هو مدى سهولة إضافة عنصر جديد **دون** التأثير على الكود الحالي أو الحاجة لتعديله بشكل غير مقبول.

> **ملاحظة:** الـ concrete class هي class جاهزة وصعبة التعديل ("صلبة")، تمثل Entity ذات معنى واضح، وتحتوي على كل الـ methods التي تحتاجها بشكل مباشر (بمعنى آخر: مش abstract class).

---

## المشكلة (`bad-example.ts`)

لو عندنا `Company` بتدير مجموعة موظفين، أول حل هيخطر في بالنا هو إن `Company` تعتمد بشكل مباشر على الـ concrete classes الخاصة بكل نوع موظف (`Designer`, `Programmer`, `Tester`...). المشكلة إن `Company` بكده بقت **معتمدة (dependent)** بشكل مباشر على كل نوع موظف على حدة. لو حبينا نضيف نوع موظف جديد (زي `Artist`)، هنضطر نرجع نعدّل جوه `Company` نفسها عشان تتعرف عليه وتقدر تشغّله.

## الحل (`good-example.ts`)

اتبعنا الخطوات دي:

1. حددنا بالظبط إيه اللي `Company` محتاجاه من كل موظف: إنه بس **يشتغل** (`doWork`).
2. عرّفنا الـ method دي جوه `Employee` interface.
3. كل نوع موظف (`Designer`, `Programmer`, `Tester`...) بيعمل implement لـ `Employee` interface.
4. `Company` بقت تتعامل فقط مع `Employee[]`، من غير ما تعرف أو تهتم بتفاصيل كل نوع موظف على حدة.

### النتيجة

لإضافة نوع موظف جديد (زي `Artist`)، كل اللي هنعمله هو إنشاء class جديد يعمل implement لـ `Employee`. الـ `Company` **مش هتتلمس خالص** — صفر تعديل، صفر خطر كسر كود شغال.

---

## الخلاصة

|                    | قبل (Bad)                                             | بعد (Good)                                   |
| ------------------ | ----------------------------------------------------- | -------------------------------------------- |
| **الاعتمادية**     | `Company` تعتمد مباشرة على كل concrete employee class | `Company` تعتمد فقط على `Employee` interface |
| **إضافة نوع جديد** | لازم تعديل جوه `Company`                              | class جديد فقط، بدون أي تعديل في `Company`   |
| **المرونة**        | منخفضة                                                | عالية                                        |

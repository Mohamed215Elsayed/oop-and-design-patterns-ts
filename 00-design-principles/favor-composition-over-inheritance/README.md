# Favor Composition Over Inheritance

## المبدأ
هذا المبدأ من أجمل المبادئ في التصميم. عادة عند التفكير في **code reuse**، أول حاجة بتيجي في بالنا هي الـ **inheritance** — لأنها أسهل طريقة لمشاركة الكود بين classes، كل اللي عليك تعمله إنك تحط الـ code base في `superclass` وتخلي باقي الـ classes ترثه.

لكن رغم بساطتها، الوراثة عندها مشاكل خطيرة وبتظهر بوضوح في المشاريع الكبيرة. هنا بييجي دور **Composition** كحل بديل أو مكمل.

- **Inheritance** يُشار لها بـ `is a` → مثال: `a car is a transport`
- **Composition** يُشار لها بـ `has a` → مثال: `a car has an engine`

---

## مشاكل الوراثة (Inheritance)

1. **A subclass can't reduce the interface of the superclass**
   الـ subclass بترث كل الـ abstract methods الموجودة في الـ superclass، وأنت مجبر تعمل لها implementation حتى لو مش محتاجها.

2. **الحاجة لإعادة كتابة الكود عند الـ override**
   لازم تكون حريص إن الـ method اللي بتعمل لها override تتوافق مع طريقة عمل الأصل، لأن أي اختلاف ممكن يسبب خلل.

3. **أي تعديل في الـ superclass ممكن يكسر الـ subclass**
   التغيير في الأب ممكن يأثر على كل الأبناء بشكل غير متوقع.

4. **المشكلة الأهم: Parallel Inheritance Hierarchies**
   الوراثة عادة بتكون **single dimension**. لو احتجنا أكتر من dimension (زي نوع المركبة + نوع المحرك + وجود autopilot)، هنضطر نعمل subclass لكل تركيبة ممكنة، وده بيخلي عدد الـ classes يتضخم بشكل كبير جدًا.
   العدد التقريبي للـ subclasses = **عدد الاحتمالات في كل dimension مضروبة في بعضها** (`parameters^n` تقريبًا).

### مثال المشكلة (`bad-example.ts`)
عندنا `Transport` أب، وتحته `Truck` و `Car`، وتحت كل واحدة فيهم `CombustionEngineX` و `ElectricX`. لو أضفنا feature زي `Autopilot`، هيبقى عندنا:
AutopilotElectricTruck
AutopilotCombustionEngineTruck
AutopilotCombustionEngineCar
AutopilotElectricCar

يعني مع `Truck/Car` (2) × `Combustion/Electric` (2) × `Autopilot` (اختياري) = 6 مركبات، ولو أضفنا `waterEngine` هيبقوا 9! ولو أضفنا نوع تالت زي `Bus` من غير أي حساب هيبقوا 3 * 3 = 9 على الأقل، وبيتضاعفوا مع كل إضافة جديدة.

---

## الحل: Composition (`good-example.ts`)

بدل ما `Transport` يرث كل تركيبة ممكنة، بنخليه **يمتلك (has a)** أجزاء مستقلة زي `Engine` و `Driver`، من خلال interfaces:

Transport

engine: Engine
driver: Driver
deliver(destination, cargo)

«interface» Engine «interface» Driver

move() + navigate()
▲ ▲
│ │
CombustionEngine/ElectricEngine Robot/Human

كل نوع محرك (`CombustionEngine`, `ElectricEngine`) بيعمل implement لـ `Engine` interface، وكل نوع سائق (`Human`, `Robot`) بيعمل implement لـ `Driver` interface. الـ `Transport` بقى بس بيحتفظ بـ instance من كل واحد فيهم ويستخدمهم.

### الفايدة الأهم
السلوك (behavior) بقى ممكن **يتغير في أي وقت أثناء الـ runtime** — تقدر تغير الـ engine أو الـ driver لأي object موجود بالفعل، من غير ما تحتاج تعمل class جديد لكل تركيبة. الفكرة دي هي الأساس اللي هيتبني عليه **Strategy Pattern** اللي هنتكلم عنه لاحقًا.

---

## الخلاصة
| | Inheritance | Composition |
|---|---|---|
| العلاقة | `is a` | `has a` |
| عدد الـ classes مع زيادة الـ dimensions | يتضخم بشكل كبير (parallel hierarchies) | يبقى ثابت تقريبًا |
| تغيير السلوك | ثابت وقت الـ compile | ممكن أثناء الـ runtime |
| المرونة | منخفضة | عالية |
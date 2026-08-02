# Encapsulation

## المفهوم
Encapsulation بتعني قدرة الـ object على إخفاء الأجزاء الخاصة بيه
(الـ state والـ behavior) عن باقي الـ objects، وتكشف بس واجهة محدودة
(methods) للتعامل معاها.

- **State** = البيانات المخزنة جوه الـ object (زي `balance`).
- **Behavior** = الـ methods اللي بتتحكم في التعامل مع الـ state ده
  (زي `deposit`, `withdraw`).

## المشكلة اللي بتحلها
لو الـ property كانت `public` مباشرة، أي جزء تاني من الكود يقدر
يغيّرها بأي قيمة، حتى لو القيمة دي مش منطقية (زي رصيد بنكي بالسالب).

```typescript
// ❌ من غير Encapsulation
class BankAccount {
  public balance: number;
}

const account = new BankAccount();
account.balance = -5000; // مفيش أي حماية — قيمة غير منطقية اتقبلت بسهولة
```

مع Encapsulation، الـ `balance` بقت `private`، والتعديل الوحيد المسموح
بيه عن طريق `deposit()` و `withdraw()` — وكل واحدة فيهم بتتحقق من
منطقية القيمة قبل ما تسمح بالتغيير.

## متى تستخدمها؟
أي وقت عندك state حساس أو محتاج قواعد (business rules) قبل ما يتغير —
زي أرصدة حسابات، حالة طلب (order status)، أو أي بيانات لازم تتغير
بشروط معينة مش عشوائيًا.

## العلاقة بـ Interfaces
في لغات كتير، الـ `interface` بتُعتبر من أهم تطبيقات الـ Encapsulation
(مع الـ Abstraction). الـ interface بتحدد **إيه** المتاح للعالم
الخارجي (`fly`, `destination`, `origin` في مثال الطائرة)، من غير ما
تفضح **إزاي** كل نوع طائرة (ركاب / هليكوبتر) بينفذها من جوّه.

## ملحوظة
`getBalance()` هنا Getter بس من غير Setter مباشر — لأن التعديل على
الرصيد مش مفروض يحصل بقيمة عشوائية زي `setBalance(x)`، لازم يمر عبر
عمليات ليها منطق (`deposit`/`withdraw`). ده فرق مهم عن مثال
`getName`/`setName` البسيط: مش كل Encapsulation لازم يكون فيها Setter
مباشر — أحيانًا التحكم في العملية نفسها (زي الإيداع/السحب) أدق وأصح
من مجرد السماح بتغيير القيمة مباشرة.
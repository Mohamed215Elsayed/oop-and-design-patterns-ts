# Single Responsibility Principle (SRP)

## المبدأ

每个 class 应该只有一个改变的理由。换句话说：一个 class 应该只有一个职责（responsibility）。

## المشكلة (`bad-example.ts`)

`AreaCalculator` 同时负责：
1. 计算总面积（核心职责）
2. 格式化输出（`output()` 方法）

如果我们需要支持 JSON API 或 HTML 报告，就必须修改同一个 class，添加 `toJSON()`、`toHTML()` 等方法。

## الحل (`good-example.ts`)

将职责分离到两个独立的 class：
- `AreaCalculator`：只负责计算
- `AreaPrinter`：只负责格式化输出

这样每个 class 只有一个改变的理由。

# simple-expect

A very simple Jest inspired `expect` function that asserts the return value of a function given some parameters and `console.log` the result.

## How to use (Deno)

```ts
import { expect } from "https://deno.land/x/simple_expect@1.0.1/mod.ts";
// ...
expect(myFunction).withParams([7, 11, 15], 9).toBe([0, 1]);
expect(myOtherFunction).withParams("(([]){})").toBeTrue();
```

Results:

```
✅ [7, 11, 15], 9
❌ "(([]){})" | expected: true - received: false
```

# simple-expect

A very simple Jest inspired `expect` function that asserts the return value of a function given some parameters and `console.log` the result.

## How to use (Deno)

```ts
import { expect } from "https://deno.land/x/simple_expect@1.1.0/mod.ts";

expect(myFunction).withParams([7, 11, 15], 9).toBe([0, 1]);
expect(myOtherFunction).withParams("(([]){})").toBeTrue();

expect(myTrickyFunction).run(({ withParams }) => {
  withParams([]).toBe("default result");
  withParams(["b", "s", "p"]).toBe("tricky result");
});
```

Results:

```
✅ [7, 11, 15], 9
❌ "(([]){})" | expected: true - received: false
✅ []
✅ ["b", "s", "p"]
```

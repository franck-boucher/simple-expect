import { details } from "./utils.ts";

export function expect<T extends unknown[]>(func: (...args: T) => unknown) {
  if (typeof func !== "function")
    throw Error("Must pass a function as parameter to 'expect'");

  const compare = (expected: unknown, ...params: T) => {
    const result = func(...params);
    const jParams = params.map((param) => JSON.stringify(param)).join(", ");
    const sParams = jParams ? " " + jParams : "";

    if (JSON.stringify(result) === JSON.stringify(expected)) {
      console.log("✅" + sParams);
    } else {
      console.log("❌" + sParams + details(expected, result));
    }
  };

  const withParams = (...params: T) => {
    return {
      toBe: (expected: unknown) => compare(expected, ...params),
      toBeTrue: () => compare(true, ...params),
      toBeFalse: () => compare(false, ...params),
    };
  };

  return { withParams };
}

import { expect } from "./mod.ts";
import {
  describe,
  afterAll,
  it,
  beforeEach,
} from "https://deno.land/std@0.139.0/testing/bdd.ts";
import {
  spy,
  assertSpyCall,
  Spy,
} from "https://deno.land/std@0.139.0/testing/mock.ts";
import { details } from "./utils.ts";

describe("expect works with a function", () => {
  const consoleLogBackup = console.log;
  let consoleLog: Spy;

  afterAll(() => {
    console.log = consoleLogBackup;
  });

  beforeEach(() => {
    consoleLog = spy();
    console.log = consoleLog;
  });

  it("that returns a boolean", () => {
    const returnTrue = () => true;
    const errorDetails = details(false, true);

    expect(returnTrue).withParams().toBe(true);
    assertSpyCall(consoleLog, 0, { args: ["✅"] });

    expect(returnTrue).withParams().toBe(false);
    assertSpyCall(consoleLog, 1, { args: ["❌" + errorDetails] });

    expect(returnTrue).withParams().toBeTrue();
    assertSpyCall(consoleLog, 2, { args: ["✅"] });

    expect(returnTrue).withParams().toBeFalse();
    assertSpyCall(consoleLog, 3, { args: ["❌" + errorDetails] });
  });

  it("that returns a string", () => {
    const good = "test";
    const bad = "other";
    const returnTrue = () => good;

    expect(returnTrue).withParams().toBe(good);
    assertSpyCall(consoleLog, 0, { args: ["✅"] });

    expect(returnTrue).withParams().toBe(bad);
    assertSpyCall(consoleLog, 1, { args: ["❌" + details(bad, good)] });

    expect(returnTrue).withParams().toBeTrue();
    assertSpyCall(consoleLog, 2, { args: ["❌" + details(true, good)] });

    expect(returnTrue).withParams().toBeFalse();
    assertSpyCall(consoleLog, 3, { args: ["❌" + details(false, good)] });
  });

  it("that returns a number", () => {
    const good = 3;
    const bad = 2;
    const returnTrue = () => good;

    expect(returnTrue).withParams().toBe(good);
    assertSpyCall(consoleLog, 0, { args: ["✅"] });

    expect(returnTrue).withParams().toBe(bad);
    assertSpyCall(consoleLog, 1, { args: ["❌" + details(bad, good)] });

    expect(returnTrue).withParams().toBeTrue();
    assertSpyCall(consoleLog, 2, { args: ["❌" + details(true, good)] });

    expect(returnTrue).withParams().toBeFalse();
    assertSpyCall(consoleLog, 3, { args: ["❌" + details(false, good)] });
  });

  it("that returns an object", () => {
    const good = { a: 1, b: 2 };
    const bad = { c: 3, d: 4 };
    const returnTrue = () => good;

    expect(returnTrue).withParams().toBe(good);
    assertSpyCall(consoleLog, 0, { args: ["✅"] });

    expect(returnTrue).withParams().toBe(bad);
    assertSpyCall(consoleLog, 1, { args: ["❌" + details(bad, good)] });

    expect(returnTrue).withParams().toBeTrue();
    assertSpyCall(consoleLog, 2, { args: ["❌" + details(true, good)] });

    expect(returnTrue).withParams().toBeFalse();
    assertSpyCall(consoleLog, 3, { args: ["❌" + details(false, good)] });
  });

  it("that returns an array", () => {
    const good = [1, 0, 9];
    const bad = [0, 9];
    const returnTrue = () => good;

    expect(returnTrue).withParams().toBe(good);
    assertSpyCall(consoleLog, 0, { args: ["✅"] });

    expect(returnTrue).withParams().toBe(bad);
    assertSpyCall(consoleLog, 1, { args: ["❌" + details(bad, good)] });

    expect(returnTrue).withParams().toBeTrue();
    assertSpyCall(consoleLog, 2, { args: ["❌" + details(true, good)] });

    expect(returnTrue).withParams().toBeFalse();
    assertSpyCall(consoleLog, 3, { args: ["❌" + details(false, good)] });
  });

  it("that can accept parameters", () => {
    const defaultInput = "default";
    const returnBoolean = (str?: string) => {
      return str || defaultInput;
    };

    expect(returnBoolean).withParams().toBe(defaultInput);
    assertSpyCall(consoleLog, 0, { args: ["✅"] });

    const customInput = "custom";
    expect(returnBoolean).withParams(customInput).toBe(customInput);
    assertSpyCall(consoleLog, 1, { args: ['✅ "' + customInput + '"'] });
  });

  it("that can be asserted multiple times", () => {
    const defaultInput = "default";
    const customInput = "custom";
    const returnBoolean = (str?: string) => {
      return str || defaultInput;
    };

    expect(returnBoolean).run(({ withParams }) => {
      withParams().toBe(defaultInput);
      withParams(customInput).toBe(customInput);
    });

    assertSpyCall(consoleLog, 0, { args: ["✅"] });
    assertSpyCall(consoleLog, 1, { args: ['✅ "' + customInput + '"'] });
  });
});

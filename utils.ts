export function details(expected: unknown, result: unknown) {
  const sExpected = "expected: " + JSON.stringify(expected);
  const sReceived = "received: " + JSON.stringify(result);
  return " | " + sExpected + " - " + sReceived;
}

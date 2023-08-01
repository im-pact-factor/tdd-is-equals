function getType(value: any): string {
  return Object.prototype.toString.call(value);
}

function isObjectEqual(
  a: Record<string, any>,
  b: Record<string, any>
): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }
  for (const key of keysA) {
    if (!b.hasOwnProperty(key)) {
      return false;
    }
    if (!isEquals(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEquals(a: any, b: any): boolean {
  if (a === b) return true;
  const typeA = getType(a);
  const typeB = getType(b);

  if (typeA !== typeB) return false;

  switch (typeA) {
    case "[object Number]":
      return a === b || (a !== a && b !== b);
    case "[object Object]":
      return isObjectEqual(a, b);
    case "[object Array]":
      return isObjectEqual(a, b);
    case "[object Date]":
      return a.getTime() === b.getTime();
    default:
      return false;
  }
}

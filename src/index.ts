function getType(value: any): string {
  return Object.prototype.toString.call(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEquals(a: any, b: any): boolean {
  const typeA = getType(a);
  const typeB = getType(b);

  if (typeA !== typeB) {
    return false;
  }
  if (a === null || b === null) {
    return a === b;
  }
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness
  if (typeA === "[object Number]") {
    return a === b || (a !== a && b !== b);
  }
  if (typeA === "[object Object]" || typeA === "[object Array]") {
    for (const key in a) {
      if (!isEquals(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }
  if (typeA === "[object Date]") {
    return a.getTime() === b.getTime();
  }
  return a === b;
}

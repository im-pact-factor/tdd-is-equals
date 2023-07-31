import { isEquals } from ".";

describe("isEquals", () => {
  const number = 1;
  const string = "string";
  const boolean = true;
  const bigInt = BigInt(1);
  const symbol = Symbol(1);
  const set = new Set();
  const map = new Map();

  it("参数类型不同不相等", () => {
    expect(isEquals(number, string)).toBe(false);
    expect(isEquals(number, boolean)).toBe(false);
    expect(isEquals(number, null)).toBe(false);
    expect(isEquals(number, undefined)).toBe(false);
    expect(isEquals(number, {})).toBe(false);
    expect(isEquals(number, bigInt)).toBe(false);
    expect(isEquals(number, symbol)).toBe(false);

    expect(isEquals(string, boolean)).toBe(false);
    expect(isEquals(string, null)).toBe(false);
    expect(isEquals(string, undefined)).toBe(false);
    expect(isEquals(string, {})).toBe(false);
    expect(isEquals(string, bigInt)).toBe(false);
    expect(isEquals(string, symbol)).toBe(false);

    expect(isEquals(boolean, null)).toBe(false);
    expect(isEquals(boolean, undefined)).toBe(false);
    expect(isEquals(boolean, {})).toBe(false);
    expect(isEquals(boolean, bigInt)).toBe(false);
    expect(isEquals(boolean, symbol)).toBe(false);

    expect(isEquals(null, undefined)).toBe(false);
    expect(isEquals(null, {})).toBe(false);
    expect(isEquals(null, bigInt)).toBe(false);
    expect(isEquals(null, symbol)).toBe(false);

    expect(isEquals(undefined, {})).toBe(false);
    expect(isEquals(undefined, bigInt)).toBe(false);
    expect(isEquals(undefined, symbol)).toBe(false);

    expect(isEquals({}, bigInt)).toBe(false);
    expect(isEquals({}, symbol)).toBe(false);

    expect(isEquals(bigInt, symbol)).toBe(false);
    expect(isEquals(map, set)).toBe(false);
  });

  it("参数是基本类型并且值相等则相等", () => {
    expect(isEquals("1", 1)).toBe(false);
    expect(isEquals(1, 2)).toBe(false);
    expect(isEquals("1", "2")).toBe(false);

    expect(isEquals(1, 1)).toBe(true);
    expect(isEquals("1", "1")).toBe(true);
    expect(isEquals(null, null)).toBe(true);
    expect(isEquals(true, true)).toBe(true);
    expect(isEquals(undefined, undefined)).toBe(true);
    expect(isEquals(BigInt(1), BigInt(1))).toBe(true);
    expect(isEquals(Symbol(1), Symbol(1))).toBe(false);
  });

  it("NaN 与 NaN 相等", () => {
    expect(isEquals(NaN, NaN)).toBe(true);
  });

  it("+0 与 -0 相等", () => {
    expect(isEquals(+0, -0)).toBe(true);
  });

  it("两个对象所有字段相等则相等", () => {
    expect(isEquals({}, {})).toBe(true);
    expect(isEquals([], [])).toBe(true);
    expect(isEquals([1, 2], [1, 2])).toBe(true);
    expect(isEquals({ a: 1 }, { a: 1 })).toBe(true);
    expect(isEquals({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(isEquals(new Date(1), new Date(1))).toBe(true);
    expect(isEquals(new Date(), new Date())).toBe(true);
  });

  it("两个对象字段不同则不相等", () => {
    expect(isEquals([1, 2], [1, 3])).toBe(false);
    expect(isEquals({ a: 1 }, { a: 2 })).toBe(false);
    expect(isEquals({ a: 1, b: 2 }, { a: 1 })).toBe(false);
  });

  it("null 和 undefined 不相等", () => {
    expect(isEquals(null, undefined)).toBe(false);
  });
});

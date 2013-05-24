# jasmine

## 测试准则
黑盒测试, 测试外部借口

## suite
套件 - describe()

## specification
it() 一个spec描述该套间一小部分应该做的,只应当测试一个案例或情景

## Matchers
	toEqual, toBe(===)
	toBeTruthy, toBeFalsy => expect({}).toBeTruthy();
	expect(foo).not.toEqual(bar)
	toContain
	toBeDefined, toBeUndefined. toBeNull, toBeNaN
	expect(12.34).toBeCloseTo(12.3, 1); // success
	expect("foo bar").toMatch(/bar/);
	toBeGreaterThan, toBeLessThan

## spy
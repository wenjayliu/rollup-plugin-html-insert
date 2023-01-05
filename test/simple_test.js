import test from 'ava';

const testfn = (a, b) => a + b

test('hello ava simple', t => {
  t.is(testfn(1, 1), 2)
  t.pass();
});
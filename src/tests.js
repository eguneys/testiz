const testutils = require('./testutils');

const { log, ok, is, not } = testutils;

function tests() {
  log('passing tests');
  ok('true is ok', true);
  is('three is three', 3, 3);
  not('three is not four', 3, 4);

  log('failing tests');
  is('three is two', 3, 2);
  ok('null is ok', null);
}

tests();

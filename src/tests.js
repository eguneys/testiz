const testutils = require('./testutils');

const { log, ok, is, not, throws } = testutils;

function tests() {
  log('passing tests');
  ok('true is ok', true);
  is('three is three', 3, 3);
  not('three is not four', 3, 4);

  log('failing tests');
  is('three is two', 3, 2);
  ok('null is ok', null);

  log('throwing tests');

  throws('should throw bad exception should pass', 'bad exception', () => {
    throw new Error("bad exception lkaf");
  });

  throws('should not throw bad exception should fail', 'bad exception', () => {
    throw new Error("lkaf");
  });

  throws('should not throw should fail', 'bad exception', () => {});

}

tests();

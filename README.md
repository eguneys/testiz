  
Simple testing library with no excessive syntax.

### Install

   yarn install testiz --dev

    
### Usage

    // node
    const { log, ok, is, not } = require('testiz');

    // browser
    import { testBrowser } from 'testiz';
    const { log, ok, is, not } = testBrowser;
    
    
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
    # testiz

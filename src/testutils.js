const chalk = require('chalk');

function Testutils(opts) {
  const { passMessage,
          failMessage,
          logMessage } = opts;

  const ok = runtest(matcher((a) => a !== null && a !== undefined, '[is null or undefined]'));

  const not = runtest(matcher((a, b) => a !== b, '==='));

  const is = runtest(matcher((a, b) => a === b, '!=='));

  const isabove = runtest(matcher((a, b) => a >= b, '>=!'));

  const deep_is = runtest(matcher((a, b) => {
    if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') return objectCompare(a, b);
    else return a === b;
  }, '!=='));

  const throws = runtestPlus(matcher((emsg, f) => {
    var caught;
    try {
      f();
    } catch(err) {
      caught = err;
    }
    if (!caught) return { err: 'didnt throw' };
    if (!caught.message.match(emsg)) return { err: 'throwed ' + caught.message };
    return {};
  }, ''));

  function matcher(f, s) {
    return { matcher: f, onfail: s };
  }

  function runtest({ matcher, onfail }) {
    return function(msg, a, b) {
      var passfail = '';
      var res = '';
      if (matcher(a, b)) {
        passfail = passMessage;
      } else {
        passfail = failMessage;
        res += JSON.stringify(a) + ` ${onfail} ` + JSON.stringify(b);
      }
      res = msg + ' ' + res;
      console.log(passfail(res));
    };
  }

  function runtestPlus({ matcher, onfail }) {
    return function(msg, ...args) {
      var passfail = '';
      var res = '';
      var { err } = matcher(...args);
      if (!err) {
        passfail = passMessage;
      } else {
        passfail = failMessage;
        res += onfail + ' ' + err;
      }
      res = msg + ' ' + res;
      console.log(passfail(res));
    };
  }

  function log(msg) {
    console.log(logMessage(msg));
  }

  return {
    ok,
    not,
    is,
    isabove,
    deep_is,
    throws,
    matcher,
    runtest,
    log
  };
};

const browserOptions = {
  logMessage: (msg) => '%c ## background: yellow; ' + msg,
  failMessage: (msg) => '%cfail background: red; ' + msg,
  passMessage: (msg) => '%cpass background: green; ' + msg
};

const nodeOptions = {
  logMessage: (msg) => chalk.yellow(' ## ') + ' ' + msg,
  failMessage: (msg) => chalk.red('fail ') + ' ' + msg,
  passMessage: (msg) => chalk.green('pass ') + ' ' + msg
};

module.exports = Testutils(nodeOptions);
module.exports.testBrowser = Testutils(browserOptions);
module.exports.browserOptions = browserOptions;
module.exports.Testutils = Testutils;

function objectCompare(obj1, obj2) {
	//Loop through properties in object 1
	for (var p in obj1) {
		//Check property exists on both objects
		if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
 
		switch (typeof (obj1[p])) {
			//Deep compare objects
			case 'object':
				if (!objectCompare(obj1[p], obj2[p])) return false;
				break;
			//Compare function code
			case 'function':
				if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
				break;
			//Compare values
			default:
				if (obj1[p] != obj2[p]) return false;
		}
	}
 
	//Check object 2 for any extra properties
	for (var p in obj2) {
		if (typeof (obj1[p]) == 'undefined') return false;
	}
	return true;
};

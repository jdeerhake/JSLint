// node-lint.js
// 2010-11-16
/*
2010, John Deerhake, jdeerhake.com

Node.js wrapper for JSLint
This is the Node companion to fulljslint.js (http://www.jslint.com/fulljslint.js).

Based on Douglas Crockford's rhino.js (http://www.jslint.com/rhino/rhino.js)
*/

/*global JSLINT, require, process */
/*members argv, puts, exit */

var fs = require('fs'),
    sys = require('sys');

(function (a) {
    var e, i, input,
        inFiles = process.argv.slice(2),
        defaults = {
            bitwise: true,
            eqeqeq: true,
            immed: true,
            newcap: true,
            nomen: true,
            onevar: true,
            plusplus: true,
            regexp: true,
            undef: true,
            white: false
        },
        lintIt = function (filename) {
            return function (err, data) {
                if (err) {
                    sys.puts("jslint: " + err);
                } else if (!JSLINT(data, defaults)) {
                    sys.puts('jslint: Errors found in ' + filename);
                    for (i = 0; i < JSLINT.errors.length; i += 1) {
                        e = JSLINT.errors[i];
                        if (e) {
                            sys.puts('\tLint at line ' + e.line + ' character ' + e.character + ': ' + e.reason);
                            sys.puts('\t\t' + (e.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
                            sys.puts('');
                        }
                        sys.puts('');
                    }
                } else {
                    sys.puts("jslint: No problems found in " + filename);
                }
            };
        };
        
    if (inFiles.length === 0) {
        sys.puts("Usage: node-lint.js file1.js [file2.js ...]");
        process.exit(1);
    } else {
        for (i = 0; i < inFiles.length; i += 1) {
            fs.readFile(inFiles[i], 'utf-8', lintIt(inFiles[i]));
        }
    }
}(process.argv));

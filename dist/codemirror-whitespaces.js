//! codemirror-whitespaces

(function(mod) {
  if (typeof exports === 'object' && typeof module === 'object') {
    return mod(require('codemirror/lib/codemirror'));
  }

  if (typeof define === 'function' && define.amd) {
    return define(['codemirror/lib/codemirror'], mod);
  }

  // eslint-disable-next-line no-undef
  mod(CodeMirror);
})(function(CodeMirror) {
  CodeMirror.defineOption('showWhitespaces', false, function(cm, val, prev) {
    if (prev === CodeMirror.Init) {
      prev = false;
    }

    if (prev && !val) {
      cm.removeOverlay('whitespaces');
    }

    if (!prev && val) {
      cm.addOverlay({
        name: 'whitespaces',
        token: (function(memo) {
          return function(stream) {
            var peek = stream.peek();
            stream.next();

            if (peek == '\x09') {
              return 'whitespace-tab ' + (stream.eol() ? 'whitespace-eol' : (memo = !memo) ? 'whitespace-odd' : 'whitespace-even');
            }

            if (peek == '\x20') {
              var count = 1;
              while (stream.peek() == ' ' && count < 16) {
                stream.next();
                count++;
              }

              return 'whitespace-spc whitespace-spc-' + count + ' ' + (stream.eol() ? 'whitespace-eol' : (memo = !memo) ? 'whitespace-odd' : 'whitespace-even');
            }

            if (stream.eol()) {
              return 'whitespace-eol';
            }
          }
        })(false)
      });
    }
  });
});

var jade = require('jade');
var util = require('util');

//inherit from Jades Compiler
var CompileWithCsrf = function (node, options) {
  jade.Compiler.call(this, node, options);
};

//inherit prototype from Compiler prototype
util.inherits(CompileWithCsrf, jade.Compiler);

CompileWithCsrf.prototype.visitTag = function (tag) {
  if (tag.name === 'form' && tag.getAttribute('method').match(/post/i)) {
    var csrfInput = new jade.nodes.Tag('input')
      .setAttribute('type', '"hidden"')
      .setAttribute('name', '"_csrf"')
      .setAttribute('value', '_csrf');

    tag.block.push(csrfInput);
  }

  jade.Compiler.prototype.visitTag.call(this, tag);

};

module.exports = CompileWithCsrf;

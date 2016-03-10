module.exports = exports['default'] = Root;

function Root() {
  if (!(this instanceof Root)) return new Root();
  this._modules = {};
  return this;
}

Root.prototype.set = function set(id, variables) {
  Object.defineProperty(this._modules, id, {
    value: Object.freeze(variables)
  });
  return this;
};

Root.prototype.get = function get(id, props, variables) {
  props = props || {};
  variables = variables || {};

  // hack so we can pass objects as props to children in ESS
  // like we do in jade, e.g. `div&props({foo: 1})`
  if (props.props) props = props.props;

  var values = Object.assign({}, this._modules[id], props);

  for (var k in variables) {
    var conf = variables[k];
    if (!(conf.constructor.name === 'Object' && typeof conf.value !== 'undefined')) conf = {
      value: conf,
    };

    if (!conf.type) {
      conf.type = conf.value.constructor.name;
    }

    if (typeof values[k] === 'undefined') {
      values[k] = conf.value;
    } else if (values[k].constructor.name !== conf.type) {
      var msg = [
        'Type mismatch for module property \'' + k + '\'.',
        'Expected \'' + conf.type + '\' but got \'' + values[k].constructor.name + '\'.'
      ].join(' ');
      if (conf.strict) throw new Error(msg);
      else console.warn(msg);
    }
  }

  return values;
};

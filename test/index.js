var Root = require('..');
var should = require('should');

describe('root', function() {
  var count = 0;
  var root = new Root();

  it('should set module properties', function() {
    var id = count++;
    var vars = root.set(id, {
      bar: 'a',
      foo: 'b'
    }).get(id, {
      foo: 'c'
    }, {
      qux: 'd'
    });
    vars.should.eql({
      bar: 'a',
      foo: 'c',
      qux: 'd'
    });
  });

  it('should make set properties immutable', function() {
    var id = count++;
    var r = root.set(id, {
      foo: 1
    });
    r._modules[id].foo = 10;
    r._modules[id].foo.should.eql(1);
  });

  it('should allow for custom types', function() {
    var id = count++;
    var vars = root.set(id, {
      foo: new TestClass(1)
    }).get(id, null, {
      foo: new TestClass(2)
    });

    vars.foo.should.be.an.instanceOf(TestClass);
    vars.foo.value.should.eql(1);

    function TestClass(value) {
      this.value = value;
      return this;
    }
  });

  it('should fail when property types do not match and strict is true', function() {
    (() => {
      var id = count++;
      root.set(id, {
        foo: 'a'
      }).get(id, null, {
        foo: {
          value: 1,
          strict: true
        }
      });
    }).should.throw();

    (() => {
      var id = count++;
      root.get(id, {
        foo: 'a'
      }, {
        foo: {
          value: 1,
          strict: true
        }
      });
    }).should.throw();
  });
});

# root

Assign and resolve component variables.

## Example

Start by putting your variables in a single file

`button.js`

```javascript
export default function(root, props) {
  root.get(module.id, props, {
    size: 10
  });
}
```

Then retrieve variables with `get`

```javascript
var values = root.get(require.resolve('button.js'));
// values.size === 10
```

You can configure values through the `root.js` to override defaults

```javascript
var root = require('ui-kit-root')();

root.set(require.resolve('button.js'), {
  size: 50
});
```

...or pass props as the second argument to override default values and `root.js` values

```jade
import Button from 'button.js'

var configuredValues = Button(__, {})
// configuredValues.size === 50

var newValues = Button(__, {size: 20})
// newValues.size === 20
```

## License

MIT

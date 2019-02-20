# ampersand-react-adapter

Higher order component for react classes to easily listen for changes and re-render from ampersand models/collections.


## How it works

This auto-listens to any ampersand model or collection that is passed to it as a `prop`. And re-renders the component on changes. It also unregisters the listener when the component is unmounted.

You can also optionally create a method in your component called: `getObservedItems`.

This will get called to determine which things should be watched.

Or you can explicitly call `watch` on the component and pass an ampersand model, state, or collection object.

If it's a collection, it listens to `'add remove reset sort'` events. If it's a `State` object, it listens to `'change'` events.

## install
[//]: # (TODO ishan 2019-02-20 Update the installation instructions)
```
npm install ampersand-react-mixin
```

## example
[//]: # (TODO ishan 2019-02-20 Update the example usage) 
```javascript
var React = require('react');
var ampersandMixin = require('ampersand-react-mixin');

module.exports = React.createClass({
    mixins: [ampersandMixin],
    render: function () {
        return (
            <div></div>
        )
    }
})

```

## license

MIT

## NOTE
This is an ongoing effort to take the original `ampersand-react-mixin` library and port it to React high-order component

# ampersand-react-mixin

Mixin for react classes to easily listen for changes and re-render from ampersand models/collections.

**Note the `0.x.x` version range. Per semver conventions, this is still in very much in progress, should be considered volatile**

Published for feedback, experiementation.

Once it hits `1.0.0` we'll add it to the main ampersand site, etc.

## how it works?

This auto-listens to any ampersand model or collection that is passed to it as a `prop`. And re-renders the component on changes. It also unregisters the listener when the component is unmounted.

You can also optionally create a method in your component called: `getObservedItems`.

This will get called to determine which things should be watched.

Or you can explicitly call `watch` on the component and pass an ampersand model, state, or collection object.

If it's a collection it listens to `'add remove reset'` if it's a `State` object it listens to `'change'`

## install

```
npm install ampersand-react-mixin
```

## example

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


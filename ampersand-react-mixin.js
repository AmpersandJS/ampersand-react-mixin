var events = require('ampersand-events');
var bind = require('lodash.bind');
var result = require('lodash.result');
var forEach = require('lodash.foreach');

var deferbounce = function (fn) {
    var triggered = false;
    return function () {
        var self = this;
        if (!triggered) {
            triggered = true;
            setTimeout(function() {
                fn.call(self);
                triggered = false;
            }, 0)
        }
    }
};

module.exports = events.createEmitter({

    watch: function (modelOrCollection, opts) {
        var events;

        if (modelOrCollection !== null && typeof modelOrCollection === 'object'){
          if (modelOrCollection.isCollection) {
              events = 'add remove reset';
          } else if (modelOrCollection.isState) {
              events = 'change';
          }
        }

        if (!events){
          return;
        }

        this.listenTo(modelOrCollection, events, deferbounce(bind(this.forceUpdate, this)));

        if (opts.reRender) this.forceUpdate();
    },

    componentDidMount: function () {
        var watched = this.getObservedItems && this.getObservedItems();
        if (watched) {
            forEach(watched, this.watch, this);
        }
        if (this.autoWatch !== false) {
            forEach(this.props, this.watch, this);
        }
    },

    componentWillUnmount: function () {
        this.stopListening();
    }
});

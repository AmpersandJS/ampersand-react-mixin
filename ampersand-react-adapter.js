import Events from 'ampersand-events';
import bind from 'lodash/bind';
// import forEach from 'lodash/forEach';
import React from 'react';

var deferbounce = function (fn) {
	var triggered = false;
	return function () {
		var self = this;
		if (!triggered) {
			triggered = true;
			setTimeout(function () {
				fn.call(self);
				triggered = false;
			}, 0)
		}
	}
};

var safeForceUpdate = function () {
	if (this.isMounted()) {
		this.forceUpdate();
	}
};

let ampersandReactAdapter = (WrappedComponent) => {
	return class extends React.Component {

		constructor(props) {
			super(props);
			this._isMounted = false;
			Events.createEmitter(this);
		}

		watch(modelOrCollection, opts) {
			var events;

			if (modelOrCollection !== null && typeof modelOrCollection === 'object') {
				if (modelOrCollection.isCollection) {
					events = 'add remove reset sort';
				} else if (modelOrCollection.isState) {
					events = 'change';
				}
			}

			if (!events) {
				return;
			}

			this.listenTo(modelOrCollection, events, deferbounce(bind(safeForceUpdate, this)));

			if (opts.reRender) safeForceUpdate.call(this);
		}

		componentDidMount() {
			this._isMounted = true;
			var watched = this.getObservedItems && this.getObservedItems();
			if (watched) {
				// forEach(watched, this.watch, this);
				for (let watchedObject of watched) {
					this.watch(watchedObject, this);
				}
			}
			if (this.autoWatch !== false) {
				// forEach(this.props, this.watch, this);
				for (let propKey of Object.keys(this.props)) {
					this.watch(this.props[propKey], this);
				}
			}
		}

		componentWillUnmount() {
			this.stopListening();
			this._isMounted = false;
		}

		isMounted() {
			return this._isMounted;
		}

		render() {
			// return <WrappedComponent {...this.props} />;
			return React.createElement(WrappedComponent, {...this.props}, null);
		}
	}
};
export default ampersandReactAdapter;

// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// Component
var Header = React.createClass({
	getInitialState: function() {
		return {
			data: []
		};
	},
	render: function() {
		return (
			<div>
				header
			</div>
		);
	}
});

module.exports = Header;

import React from 'react'
import { render } from 'react-dom'
var GlobMenu  = require('./menu.jsx');

// Component
var Nav = React.createClass({
	render: function() {
		var menuAPI = this.props.apiPath + 'wp-api-menus/v2/menu-locations/glob-api';
		return (
			<div className="menu">
				<GlobMenu apiPath={menuAPI} prefix='glob' />
			</div>
		);
	}
});

module.exports = Nav;

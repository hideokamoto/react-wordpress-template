import React from 'react'
import { render } from 'react-dom'

// Component
var PostNav = React.createClass({
	getNextPageNavigation: function() {
		console.log(this.state.per_page);
		console.log(this.state.page);
	},
	getDefaultProps: function() {
		return {
			initialPage: 1,
			initialPerPage: 10
		}
	},
	getInitialState: function() {
		return {
			page: this.props.initialPage,
			per_page: this.props.initialPerPage
		};
	},
	render: function() {
		this.getNextPageNavigation();
		return (
			<a className="archiveNext page-header postList">
				<h3>Lead More {this.state.per_page} Posts</h3>
			</a>
		);
	}
});

module.exports = PostNav;

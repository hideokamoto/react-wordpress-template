import React from 'react'
import { render } from 'react-dom'

// Component
var NavList = React.createClass({
	render: function() {
		return (
			<div className="menuList">
				<a href="/" className="menuItem">{this.props.data.name}</a>
				<a href="/about" className="menuItem hidden-xs">About</a>
				<a href="/contributing-to-wordpress" className="menuItem hidden-xs">Contributing WordPress</a>
			</div>
		);
	}
});


var Nav = React.createClass({
	loadPostsFromServer: function() {
		$.ajax({
			type: "GET",
			url: this.props.apiPath,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {
			data: []
		};
	},
	componentDidMount: function() {
		this.loadPostsFromServer();
	},
	render: function() {
		return (
			<div className="menu">
				<NavList data={this.state.data} />
			</div>
		);
	}
});

module.exports = Nav;

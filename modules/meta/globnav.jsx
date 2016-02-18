import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

// Component
var NavList = React.createClass({
	render: function() {
		return (
			<div className="menuList">
				<Link to="/" className="menuItem">{this.props.data.name}</Link>
				<Link to="/blog" className="menuItem">Blog</Link>
				<Link to="/about" className="menuItem">About</Link>
				<Link to="/contributing-to-wordpress" className="menuItem">Contributing WordPress</Link>
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

// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// Component
var MenuItem = React.createClass({
	render: function() {
		return(
			<a className="menuItem" href={this.props.item.url}>{this.props.item.title}</a>
		);
	}
});

var MenuList = React.createClass({
	render: function() {
		var menuNodes = this.props.data.map(function (item) {
			return (
				<MenuItem item={item} key={item.id}/ >
			);
		});
		return (
			<div className="menuList">
				{menuNodes}
			</div>
		);
	}
});

var Menu = React.createClass({
	loadPostsFromServer: function() {
		$.ajax({
			type: "GET",
			url: this.props.apiPath + 'wp-api-menus/v2/menu-locations/menu-api',
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
				<MenuList data={this.state.data} />
			</div>
		);
	}
});

module.exports = Menu;

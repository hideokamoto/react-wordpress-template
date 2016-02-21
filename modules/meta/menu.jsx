// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// Component
var MenuItem = React.createClass({
	render: function() {
		var ClassName = this.props.prefix + 'MenuItem';
		return(
			<a className={ClassName} href={this.props.item.url}>{this.props.item.title}</a>
		);
	}
});

var MenuList = React.createClass({
	render: function() {
		var prefix = this.props.prefix;
		var ClassName = prefix + 'MenuList';
		var menuNodes = this.props.data.map(function (item) {
			return (
				<MenuItem item={item} key={item.id} prefix={prefix}/ >
			);
		});
		return (
			<div className={ClassName}>
				{menuNodes}
			</div>
		);
	}
});

var Menu = React.createClass({
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
			<MenuList data={this.state.data} prefix={this.props.prefix}/>
		);
	}
});

module.exports = Menu;

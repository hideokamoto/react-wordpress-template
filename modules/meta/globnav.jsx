import React from 'react'
import { render } from 'react-dom'

// hidden-xs
// Component
var GlobMenuItem = React.createClass({
	render: function() {
		var ClassName = this.props.prefix + 'MenuItem hidden-xs';
		return(
			<a className={ClassName} href={this.props.item.url}>{this.props.item.title}</a>
		);
	}
});

var GlobMenuList = React.createClass({
	render: function() {
		var prefix = this.props.prefix;
		var ClassName = prefix + 'MenuList';
		var titleClassName = prefix + 'MenuItem';
		var titleNode = <a className={titleClassName} href={this.props.menu.url}>{this.props.menu.name}</a>;
		var menuNodes = this.props.data.map(function (item) {
			return (
				<GlobMenuItem item={item} key={item.id} prefix={prefix}/ >
			);
		});
		return (
			<div className={ClassName}>
				{titleNode}
				{menuNodes}
			</div>
		);
	}
});

var GlobMenu = React.createClass({
	loadPostsFromServer: function() {
		$.ajax({
			type: "GET",
			url: this.props.apiPath,
			dataType: 'json',
			cache: false,
			success: function( data ) {
				this.setState({ data: data });
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});

		$.ajax({
			type: "GET",
			url: this.props.rootAPI,
			dataType: 'json',
			cache: false,
			success: function( menu ) {
				this.setState({ menu: menu });
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {
			data: [],
			menu: []
		};
	},
	componentDidMount: function() {
		this.loadPostsFromServer();
	},
	render: function() {
		return (
			<GlobMenuList data={this.state.data} prefix={this.props.prefix} menu={this.state.menu}/>
		);
	}
});

var Nav = React.createClass({
	render: function() {
		var menuAPI = this.props.apiPath + 'wp-api-menus/v2/menu-locations/glob-api';
		return (
			<div className="menu">
				<GlobMenu apiPath={menuAPI} prefix='glob' rootAPI={this.props.apiPath}/>
			</div>
		);
	}
});

module.exports = Nav;

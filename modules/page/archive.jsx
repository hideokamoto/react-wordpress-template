import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

// Component
var Page = React.createClass({
	render: function() {
		var linkAddress = '/' + this.props.post.slug;
		var date = new Date(this.props.post.date_gmt).toLocaleDateString();
		return(
			<Link to={{ pathname: linkAddress, state: { postId: this.props.post.id } }} className="postList page-header">
				<p>{date}</p>
				<h3 className="postTitle">{this.props.post.title.rendered}</h3>
			</Link>
		);
	}
});

var PageList = React.createClass({
	render: function() {
		var pageNodes = this.props.postData.map(function (post) {
			return (
				<Page post={post} key={post.id}/ >
			);
		});
		return (
			<div className="contentInner">
				{pageNodes}
			</div>
		);
	}
});

var PageArchive = React.createClass({
	loadPostsFromServer: function() {
		$.ajax({
			type: "GET",
			url: this.props.apiPath + 'pages',
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
			<PageList postData={this.state.data} />
		);
	}
});

module.exports = PageArchive;

import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

// Component
var Post = React.createClass({
	render: function() {
		return(
			<div>
				<h3 className="page-header">{this.props.post.title.rendered}</h3>
				<div dangerouslySetInnerHTML={{__html: this.props.post.excerpt.rendered}} />
			</div>
		);
	}
});

var PostList = React.createClass({
	render: function() {
		var postNodes = this.props.postData.map(function (post) {
		console.log(post);
			return (
				<Post post={post} key={post.id}/ >
			);
		});
		return (
			<div className="postList contentInner">
				{postNodes}
			</div>
		);
	}
});

var PostArchive = React.createClass({
	loadPostsFromServer: function() {
		$.ajax({
			url: this.props.apiPath + 'posts',
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
			<PostList postData={this.state.data} />
		);
	}
});

module.exports = PostArchive;

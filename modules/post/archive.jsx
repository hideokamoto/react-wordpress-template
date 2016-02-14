import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

// Component
var Post = React.createClass({
	render: function() {
		var linkAddress = '/blog/' + this.props.post.slug;
		return(
			<Link to={{ pathname: linkAddress, state: { postId: this.props.post.id } }} className="postList page-header">
				<h3 className="postListTitle">{this.props.post.title.rendered}</h3>
				<div dangerouslySetInnerHTML={{__html: this.props.post.excerpt.rendered}} />
			</Link>
		);
	}
});

var PostList = React.createClass({
	render: function() {
		var postNodes = this.props.postData.map(function (post) {
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
			type: "GET",
			url: this.props.apiPath + 'posts',
			dataType: 'json',
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

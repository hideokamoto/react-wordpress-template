import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

// Component
var PostNav  = require('./nav.jsx');

var Post = React.createClass({
	render: function() {
		var linkAddress = '/blog/' + this.props.post.slug;
		var date = new Date(this.props.post.date_gmt).toLocaleDateString();
		return(
			<Link to={{ pathname: linkAddress, state: { postId: this.props.post.id } }} className="postList page-header">
				<p>{date}</p>
				<h3 className="postTitle">{this.props.post.title.rendered}</h3>
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
			<div>
				{postNodes}
			</div>
		);
	}
});

var PostArchive = React.createClass({
	loadPostsFromServer: function() {
		var initialQuery = '?per_page=' + this.state.per_page;
		var apiPath = this.props.apiPath + 'posts' + initialQuery + '&' + this.state.query;
		$.ajax({
			type: "GET",
			url: apiPath,
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
			data: [],
			query: '',
			per_page: 10,
			default_per_page: 10,
			page: 1,
		};
	},
	componentDidMount: function() {
		this.loadPostsFromServer();
	},
	addNextPage: function( next ) {
		this.setState({ per_page: next.per_page, page: next.page } );
		this.forceUpdate( this.loadPostsFromServer );
	},
	render: function() {
		return (
			<div className="contentInner">
				<PostList postData={this.state.data} />
				<PostNav
					page={this.state.page}
					perPage={this.state.default_per_page}
					onClickNextPage={this.addNextPage}/>
			</div>
		);
	}
});

module.exports = PostArchive;

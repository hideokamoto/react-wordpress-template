import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

// Component
const PostNav  = require('./nav.jsx');
const SearchForm  = require('../search.jsx');

var Post = React.createClass({
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

var PostList = React.createClass({
	render: function() {
		var postCount = Object.keys(this.props.postData).length;
		if ( 0 === postCount ) {
			var postNodes = <div className="postList page-header"></div>;
		} else {
			var postNodes = this.props.postData.map(function (post) {
				return (
					<Post post={post} key={post.id}/ >
				);
			});
		}
		return (
			<div>
				{postNodes}
			</div>
		);
	}
});

var PostArchive = React.createClass({
	getTermsQuery: function() {
		if ( 'tag' == this.props.type ) {
			var query = 'filter[tag]=';
		} else if ( 'category' == this.props.type ) {
			var query = 'filter[category_name]=';
		} else {
			return false;
		}
		query += this.props.slug;
		return query;
	},
	getTermTitle: function() {
		if ( 'tag' == this.props.type ) {
			var title = 'Tags:';
		} else if ( 'category' == this.props.type ) {
			var title = 'Category:';
		} else {
			return false;
		}
		title += this.props.slug;
		var html = <h2 className="page-header text-center">{title}</h2>;
		return html;
	},
	loadPostsFromServer: function() {
		var termsQuery = this.getTermsQuery();
		var initialQuery = '?per_page=' + this.state.per_page;
		var apiPath = this.props.apiPath + 'posts' + initialQuery + '&' + this.state.query;
		if ( termsQuery ) {
			apiPath += termsQuery;
		}
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
	changeSearch: function( searchWords ) {
		var query = 'search=' + searchWords + '&';
		this.setState({ query: query } );
		this.forceUpdate( this.loadPostsFromServer );
	},
	render: function() {
		var termNode = this.getTermTitle();
		var postCount = Object.keys(this.state.data).length;
		if ( postCount < this.state.default_per_page ) {
			var PostNavNode = '';
		} else {
			var PostNavNode = <PostNav page={this.state.page} perPage={this.state.default_per_page} onClickNextPage={this.addNextPage}/>;
		}
		return (
			<div className="contentInner">
				{termNode}
				<SearchForm onChangeSearch={this.changeSearch}/>
				<PostList postData={this.state.data} />
				{PostNavNode}
			</div>
		);
	}
});

module.exports = PostArchive;

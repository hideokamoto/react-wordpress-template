// Define
var API  = rootAPI + 'wp/v2/';

// Load Reacts
import React from 'react'
import { render } from 'react-dom'

/* Load Component */
const Footer = require('../modules/meta/footer.jsx');
const Nav  = require('../modules/meta/globnav.jsx');
const Intro  = require('../modules/top/intro.jsx');
const PostArchive = require('../modules/post/archive.jsx');

const Home = React.createClass({
  render() {
    return (
		<div className="fullHeight">
			<div className="content topimg fullHeight" id="top">
				<Intro apiPath={rootAPI}/>
			</div>
			<PostArchive apiPath={API}/>
			<Footer apiPath={rootAPI}/>
		</div>
    )
  }
})

const TermArchiveRow = React.createClass({
  render() {
    return (
      <div className="content" >
		<PostArchive apiPath={API} slug={this.props.slug} type={this.props.type}/>
		<Footer apiPath={rootAPI}/>
      </div>
    )
  }
})

const PostSingle = require('../modules/post/single.jsx');
const PostSingleRow = React.createClass({
  render() {
    return (
      <div className="content" >
		<PostSingle apiPath={API} ID={this.props.ID}/>
		<Footer apiPath={rootAPI}/>
      </div>
    )
  }
})

const Page = require('../modules/page/page.jsx');
const About = React.createClass({
  render() {
    return (
      <div className="content" >
		<Page apiPath={API} slug='about'/>
		<Footer apiPath={rootAPI}/>
      </div>
    )
  }
})
const Contribute = React.createClass({
  render() {
    return (
      <div className="content" >
		<Page apiPath={API} slug='contributing-to-wordpress'/>
		<Footer apiPath={rootAPI}/>
      </div>
    )
  }
})

const NotFound = React.createClass({
	render() {
		return(
			<p>Not Found</p>
		)
	}
});


const App = React.createClass({
  render() {
	if ( 404 == pageType ) {
		var node = <NotFound />;
	} else if ( 'home' == pageType ) {
		var node = <Home />;
	} else if ( 'post' == pageType ) {
		var node = <PostSingleRow ID={ID} />
	} else if ( 'page' == pageType ) {
		var node = <Page ID={ID} apiPath={API}/>
	} else if ( 'tag' == pageType ) {
		var node = <TermArchiveRow slug={termType} type="tag" />
	} else if ( 'category' == pageType ) {
		var node = <TermArchiveRow slug={termType} type="category" />
	}
    return (
      <div className="fullHeight">
	  	<Nav apiPath={rootAPI}/>
		{node}
      </div>
    )
  }
});

//Router
render( ( <App /> ), document.getElementById('app'));

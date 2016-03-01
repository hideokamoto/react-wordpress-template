//Redirect
if('/' != location.pathname) {
	var redirect_url = location.origin + '/#' + location.pathname + location.search;
	if (document.referrer) {
		var referrer = "referrer=" + encodeURIComponent(document.referrer);
		redirect_url = redirect_url + (location.search ? '&' : '?') + referrer;
	}
	location.href = redirect_url;
}


// Define
var rootAPI = 'http://wp-kyoto.net/wp-json/';
var API  = rootAPI + 'wp/v2/';

// Load Reacts
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

/*Load Component
var Header  = require('../modules/meta/header.jsx');
var Menu  = require('../modules/meta/menu.jsx');
*/
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
const CatArchiveRow = React.createClass({
	render() {
		return (
			<TermArchiveRow slug={this.props.params.slug} type="category" />
		)
	}
})
const TagArchiveRow = React.createClass({
	render() {
		return (
			<TermArchiveRow slug={this.props.params.slug} type="tag" />
		)
	}
})

const PostSingle = require('../modules/post/single.jsx');
const PostSingleRow = React.createClass({
  render() {
    return (
      <div className="content" >
		<PostSingle apiPath={API} slug={this.props.params.slug}/>
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

const App = React.createClass({
  render() {
    return (
      <div className="fullHeight">
	  	<Nav apiPath={rootAPI}/>
        {this.props.children}
      </div>
    )
  }
})

//Router
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
		<IndexRoute component={Home}/>
		<Route path="/about" component={About} />
		<Route path="/contributing-to-wordpress" component={Contribute} />
		<Route path="/:slug" component={PostSingleRow} />

		<Route path="/tag/" component={TagArchiveRow} />
		<Route path="/category/" component={CatArchiveRow} />
		<Route path="/tag/:slug" component={TagArchiveRow} />
		<Route path="/category/:slug" component={CatArchiveRow} />
    </Route>
  </Router>
), document.getElementById('app'))

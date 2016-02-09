// Define
var rootAPI = 'http://wp-kyoto.net/wp-json/';
var API  = rootAPI + 'wp/v2/';

// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

//Load Component
var Header  = require('../modules/meta/header.jsx');
var Menu  = require('../modules/meta/menu.jsx');
var Intro  = require('../modules/top/intro.jsx');
var Archive = require('../modules/post/archive.jsx');

// Render
if ( document.getElementById('top') ) {
	ReactDOM.render(
		<Intro apiPath={rootAPI}/>,
		document.getElementById('top')
	);
}
if ( document.getElementById('menu') ) {
	ReactDOM.render(
		<Menu apiPath={rootAPI}/>,
		document.getElementById('menu')
	);
}

if ( document.getElementById('header') ) {
	ReactDOM.render(
		<Header apiPath={rootAPI}/>,
		document.getElementById('header')
	);
}

if ( document.getElementById('content') ) {
	ReactDOM.render(
		<Archive apiPath={API}/>,
		document.getElementById('content')
	);
}

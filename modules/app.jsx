// Define
var rootAPI = 'http://wp-kyoto.net/wp-json/';
var API  = rootAPI + 'wp/v2/';

// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

//Load Component
var Header  = require('../modules/meta/header.jsx');
var Intro  = require('../modules/top/intro.jsx');
var Archive = require('../modules/post/archive.jsx');

// Render
ReactDOM.render(
	<Intro apiPath={rootAPI}/>,
	document.getElementById('top')
);
/*
ReactDOM.render(
	<Header apiPath={rootAPI}/>,
	document.getElementById('header')
);

ReactDOM.render(
	<Archive apiPath={API}/>,
	document.getElementById('content')
);
*/

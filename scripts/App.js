import React, { Component } from 'react';
import VideoComponent from './VideoComponent.jsx';

export default class App extends Component {
  
  
  render() {
  	const videoJsOptions = {
	  autoplay: false,
	  controls: true,
	  sources: [{
	    src: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4', //'http://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8','application/x-mpegURL'
	    type: 'video/mp4'
	  }]
	}
    return (
      // Add your component markup and other subcomponent references here.
      <h1>Hello, World!       <VideoComponent {...videoJsOptions}/></h1>

    );
  }
}

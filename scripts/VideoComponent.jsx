import React from 'react';
import videojs from 'video.js';
import '../node_modules/video.js/dist/video-js.css';
import VjsCuepoints from './vjsCuepoints.js';

export default class VideoPlayer extends React.Component {

  constructor(props) {
    super(props);
    videojs.registerPlugin('cuepoints', VjsCuepoints);
    console.log('cuepoints', this);
    this.flag = true;
  }

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this);
          this.cuepoints();
    this.addCuepoint({
      namespace: "logger",
      start: 0,
      end: 30,
      onStart: function(params){
        if(params.error){
          console.error("Error at second 0");
        }else{
          console.log("Log at second 0");
        }
      },
      onEnd: function(params){
        console.log("Action ends at second 30");
      },
      params: {error: false}
    });
    });

 // let players = videojs.getPlayers();
 // players[0].ready(function(){
 //    this.cuepoints();
 //    this.addCuepoint({
 //      namespace: "logger",
 //      start: 0,
 //      end: 30,
 //      onStart: function(params){
 //        if(params.error){
 //          console.error("Error at second 0");
 //        }else{
 //          console.log("Log at second 0");
 //        }
 //      },
 //      onEnd: function(params){
 //        console.log("Action ends at second 30");
 //      },
 //      params: {error: false}
 //    });
 //    });
  }
   // videojs(this.videoNode.id_)
  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  };

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    const torender = this.flag;
    const content = this.flag ?       <div data-vjs-player>
        <video ref={ node => this.videoNode = node } className="video-js"></video>
      </div> : <div></div>;
    return (
      <span>{content} </span>
    )
  }
}
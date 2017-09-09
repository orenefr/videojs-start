export default class Cuepoint {
  constructor(player, options) {
    this.player = player;
    let opts = options || {};
    this.namespace = opts.namespace || "";
    this.start = opts.start || 0;
    this.end = opts.end || -1;
    this.startFn = opts.onStart || function() {};
    this.endFn = opts.onEnd || function() {};
    this.params = opts.params || {};
    this.fired = false;
  }

  _process() {
    //Check if current time is between start and end
    if (this.player.currentTime() >= this.start && (this.end < 0 || this.player.currentTime() < this.end)) {
        if (this.fired) { //Do nothing if start has already been called
            return;
        }
        this.fired = true; //Set fired flag to true
        this._start(); //Call start function
    } else {
        if (!this.fired) { //Do nothing if end has already been called
            return;
        }
        this.fired = false; //Set fired flat to false
        this._end(); //Call end function
    }
  };

  _start() {
    this.startFn.call(this, this.params);
  };

  _end() {
    this.endFn.call(this, this.params);
  };

  activate() {
    this.processHandler = () => {
        this._process();
    };
    this.player.on("timeupdate", this.processHandler);
  };

  suspend() {
    this.fired = false;
    this.player.off("timeupdate", this.processHandler);
  };

  destroy() {
    this.player.off("timeupdate", this.processHandler);
  };

}


// Cuepoint.prototype.start = 0;

// Cuepoint.prototype.end = -1;

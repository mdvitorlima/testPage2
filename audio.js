const beep = (function () {
    let ctxClass = window.audioContext ||window.AudioContext || window.AudioContext || window.webkitAudioContext
    let ctx = new ctxClass();
    return function (duration, type, finishedCallback) {
  
        duration = +duration;
  
        // Only 0-4 are valid types.
        type = (type % 5) || 0;
        
        if (typeof finishedCallback != "function") {
            finishedCallback = function () {};
        }
  
        let osc = ctx.createOscillator();
  
        osc.type = type;
        //osc.type = "sine";
        
        osc.connect(ctx.destination);
        if (osc.noteOn) osc.noteOn(0);
        if (osc.start) osc.start();
        
        setTimeout(function () {
            if (osc.noteOff) osc.noteOff(0);
            if (osc.stop) osc.stop();
            finishedCallback();
        }, duration);
  
    };
  })();
  
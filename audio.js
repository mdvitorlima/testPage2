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
  
  const myAudioContext = new AudioContext();
  
  function beep2(duration, frequency){
    return new Promise((resolve, reject) => {      

        try{
            let osc1 = myAudioContext.createOscillator();
            let g1 = myAudioContext.createGain();
            osc1.connect(g1);

            osc1.type= "square";
            osc1.frequency.value = frequency;
                       
            g1.connect(myAudioContext.destination);

            g1.gain.value = 1;

            osc1.start(myAudioContext.currentTime);
            osc1.stop(myAudioContext.currentTime + duration);

            osc1.onended = () => {
                resolve();
            };
        }catch(error){
            reject(error);
        }
    });
}
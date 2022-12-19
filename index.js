'use strict';

/** @const */
const vOpts = {
  dom: {
    body: document.querySelector('body'),
    start: document.querySelector('#inicio'),
    readout: document.querySelector('#readout'),
  },
  watchId: null,
  wakeLock: null
};

let throttlePause;

document.querySelector('#inicio').addEventListener('click', (event) => {
  if (vOpts.watchId) {
    navigator.geolocation.clearWatch(vOpts.watchId);

    if (vOpts.wakeLock) {
      vOpts.wakeLock.cancel();
    }

    vOpts.watchId = null;
    vOpts.dom.start.textContent = 'Iniciar';
    vOpts.dom.start.classList.toggle('selected');
  } else {
    const options = {
      enableHighAccuracy: true
    };
    vOpts.watchId = navigator.geolocation.watchPosition(atualizaPosicao,
      null, options);

      IniciarWakeLock();

    vOpts.dom.start.textContent = 'Parar';
    vOpts.dom.start.classList.toggle('selected');
  }
});


const IniciarWakeLock = () => {
  try {
    navigator.getWakeLock("screen").then((wakeLock) => {
      vOpts.wakeLock = wakeLock.createRequest();
    });
  } catch(error) {

  }
}

const atualizaPosicao = (position) => {

  let velocidade = position.coords.speed;

  vOpts.dom.readout.textContent = Math.round(
    velocidade * 3.6);

    if(velocidade > 38)
    {
      //beep(1000, 80, function () {});
      throttle(updateThrottleCount, 3000);
    }
};

const throttle = (callback, time) => {
  if (throttlePause) return;

  throttlePause = true;
  setTimeout(() => {
    callback();
    throttlePause = false;
  }, time);
};

const updateThrottleCount = () => {
  beep(1000, 80, function () {});
};

const beep = (function () {
  var ctxClass = window.audioContext ||window.AudioContext || window.AudioContext || window.webkitAudioContext
  var ctx = new ctxClass();
  return function (duration, type, finishedCallback) {

      duration = +duration;

      // Only 0-4 are valid types.
      type = (type % 5) || 0;

      if (typeof finishedCallback != "function") {
          finishedCallback = function () {};
      }

      var osc = ctx.createOscillator();

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

 document.getElementsByTagName("button")[1].addEventListener("click", function () {
  var button = this;
  button.disabled = true;
  beep(1000, 80, function () {
      button.disabled = false;
  });



});

const startServiceWorker = () => {
  navigator.serviceWorker.register('/testPage2/service-worker2.js', {
    scope: '/testPage2/'
  });
}

startServiceWorker();

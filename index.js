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
  vOpts.dom.readout.textContent = Math.round(
    position.coords.speed * 3.6);
};

const startServiceWorker = () => {
  navigator.serviceWorker.register('/testPage2/service-worker2.js', {
    scope: '/testPage2/'
  });
}

startServiceWorker();

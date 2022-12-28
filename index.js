'use strict';

/** @const */
const vOpts = {
  dom: {
    body: document.querySelector('body'),
    start: document.querySelector('#inicio'),
    readout: document.querySelector('#readout'),
    version: document.querySelector('#jsVersion')
  },
  watchId: null,
  wakeLock: null
};

var throttlePause;
var velocidadeLimite = 30;
const throttleRange = document.getElementById("throttle-range");
const throttleTimeText = document.getElementById("throttle-time");


window.addEventListener(
  'error',
  (error) => {
    alert('error: ' +  error.message);
  },
  true
);

throttleRange.addEventListener(
  "input",
  () => {
    throttleTimeText.innerHTML = throttleRange.value;
    velocidadeLimite = throttleRange.value;
  },
  false
);

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
  
  vOpts.dom.version.textContent = "2.5";
  
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
    
    if(Math.round(velocidade * 3.6) > velocidadeLimite)
    {
      document.getElementById("divAlert").style.backgroundColor = "#FF0000";
      document.getElementById("divAlert").style.color = "#FFFFFF";
      document.getElementById("divAlert").style.fontSize = 22;      
      //document.getElementById("divAlert").textContent = "VELOCIDADE MAX ATINGIDA";
      document.getElementById("textAlert2").textContent = "VELOCIDADE MAX ATINGIDA 2";
      beep(1000, 80, function () {});
    }
    else
    {
      document.getElementById("divAlert").style.backgroundColor = "#f1f1f1";
      //document.getElementById("divAlert").textContent = "";
    }
    
};

document.getElementsByTagName("button")[1].addEventListener("click", function () {
  beep(1000, 80, function () {});

      document.getElementById("divAlert").style.backgroundColor = "#FF0000";
      document.getElementById("divAlert").style.color = "#FFFFFF";
      document.getElementById("divAlert").style.fontSize = 22;      
      document.getElementById("textAlert2").textContent = "VELOCIDADE MAX ATINGIDA 2";
});


const startServiceWorker = () => {
  navigator.serviceWorker.register('/testPage2/service-worker2.js', {
    scope: '/testPage2/'
  });
}

startServiceWorker();

'use strict';

/** @const */
const vOpts = {
  dom: {
    //start: document.querySelector('#inicio'),
    //readout: document.querySelector('#readout'),
    //version: document.querySelector('#jsVersion')
  },
  //watchId: null,
  //wakeLock: null
};

var throttlePause;
var velocidadeLimite = 30;
const throttleRange = document.getElementById("throttle-range");
const throttleTimeText = document.getElementById("throttle-time");

var watchId = null;
var wakeLock = null;

const start = document.querySelector('#inicio');
//const readout = document.querySelector('#readout');
const version = document.querySelector('#jsVersion');


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
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);

    if (wakeLock) {
      wakeLock.cancel();
    }
    
    watchId = null;
    start.textContent = 'Iniciar';
    start.classList.toggle('selected');
  } else {
    const options = {
      enableHighAccuracy: true
    };
    
    watchId = navigator.geolocation.watchPosition(atualizaPosicao,
      null, options);

    IniciarWakeLock();
    
    start.textContent = 'Parar';
    start.classList.toggle('selected');
  }
  
  version.textContent = "2.5";
  
});


const IniciarWakeLock = () => {
  try {
    navigator.getWakeLock("screen").then((wakeLock) => {
      wakeLock = wakeLock.createRequest();
    });
  } catch(error) {

  }
}

const atualizaPosicao = (position) => {

  let velocidade = position.coords.speed;

  document.querySelector('#readout').textContent = Math.round(velocidade * 3.6);
    
    if(Math.round(velocidade * 3.6) > velocidadeLimite)
    {
      document.getElementById("divAlert").style.backgroundColor = "#FF0000";
      document.getElementById("divAlert").style.color = "#FFFFFF";
      document.getElementById("divAlert").style.fontSize = 22;      
      document.getElementById("divAlert").textContent = "VELOCIDADE MAX ATINGIDA";
      beep(1000, 80, function () {});
    }
    else
    {
      document.getElementById("divAlert").style.backgroundColor = "#f1f1f1";
      document.getElementById("divAlert").textContent = "";
    }
    
};

document.getElementsByTagName("button")[1].addEventListener("click", function () {
  beep(1000, 80, function () {});

      document.getElementById("divAlert").style.backgroundColor = "#FF0000";
      document.getElementById("divAlert").style.color = "#FFFFFF";
      document.getElementById("divAlert").style.fontSize = 22; 
      document.getElementById("divAlert").textContent = "VELOCIDADE MAX ATINGIDA";     
});


const startServiceWorker = () => {
  navigator.serviceWorker.register('/testPage2/service-worker2.js', {
    scope: '/testPage2/'
  });
}

startServiceWorker();

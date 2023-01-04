var watchId = null;
var wakeLock = null;

window.addEventListener(
  'error',
  (error) => {
    alert('error: ' +  error.message);
  },
  true
);

document.getElementById("max-speed").addEventListener(
  "input",
  () => {
    document.getElementById("max-speed-label").innerHTML = document.getElementById("max-speed").value;
  },
  false
);

document.querySelector('#btn-start').addEventListener('click', (event) => {

  if (watchId) {
    navigator.geolocation.clearWatch(watchId);

    if (wakeLock) {
      wakeLock.cancel();
    }
    
    watchId = null;
    event.target.textContent = "Start!";
    event.target.classList.toggle('selected');
  } else {
    const options = {
      enableHighAccuracy: true
    };
    
    watchId = navigator.geolocation.watchPosition(checkSpeed, null, options);

    IniciarWakeLock();
    event.target.textContent = 'Stop';
    event.target.classList.toggle('selected');
  }
  
});

const IniciarWakeLock = () => {
  try {
    navigator.getWakeLock("screen").then((wakeLock) => {
      wakeLock = wakeLock.createRequest();
    });
  } catch(error) {

  }
}

const checkSpeed = (position) => {

  let currentSpeed_Kmh =  position.coords.speed * 3.6;
  let maxSpeed_Kmh = document.getElementById("max-speed").value;
  
  document.querySelector('#current-speed').textContent = Math.round(currentSpeed_Kmh);

  let div_alert = document.getElementById("div-alert");
    
    if(currentSpeed_Kmh > maxSpeed_Kmh)
    {
      div_alert.style.backgroundColor = "#FF0000";
      div_alert.style.color = "#FFFFFF";
      div_alert.style.fontSize = 22;      
      div_alert.textContent = "VELOCIDADE MAX ATINGIDA";
      beep2(0.2, 2600);
    }
    else
    {
      div_alert.style.backgroundColor = "#f1f1f1";
      div_alert.textContent = "";
    }
    
};


document.getElementsByTagName("button")[1].addEventListener("click", function () {
  beep2(0.2, 2600);

      //document.getElementById("divAlert").style.backgroundColor = "#FF0000";
      //document.getElementById("divAlert").style.color = "#FFFFFF";
      //document.getElementById("divAlert").style.fontSize = 22; 
      //document.getElementById("divAlert").textContent = "VELOCIDADE MAX ATINGIDA";     
}); 


const startServiceWorker = () => {
  navigator.serviceWorker.register('/testPage2/service-worker2.js', {
    scope: '/testPage2/'
  });
}

startServiceWorker();

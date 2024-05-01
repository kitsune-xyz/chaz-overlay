const audio = new Audio('konga.mp3');
audio.volume = 0.5;
let dittoContainer = null;
let creationInterval = null;
const maxDivs = 20;
const divQueue = [];

let availableNames = [];
let usedNames = new Set();

function updateAvailableNames() {
    availableNames = Array.from(viewerNames).filter(name => !usedNames.has(name));
    if (availableNames.length === 0) {  
        usedNames.clear();
        availableNames = Array.from(viewerNames);
    }
}

function getRandomName() {
    updateAvailableNames();  
    if (availableNames.length === 0) {
        return "Lurker";  
    }
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const name = availableNames.splice(randomIndex, 1)[0];
    usedNames.add(name);
    return name;
}

function createFloatingDiv() {
  const div = document.createElement('div');
  div.className = 'miniditto fade-in';
  if (Math.random() > 0.5) {
      div.classList.add('moveRight');
  } else {
      div.classList.add('moveLeft');
  }

  const nameTag = document.createElement('div');
  nameTag.className = 'nameTag';
  nameTag.textContent = getRandomName();  

  div.appendChild(nameTag);

  const size = Math.floor(Math.random() * 50) + 60;
  const maxTop = 100 - (size / window.innerHeight * 100);
  div.style.cssText = `width: ${size}px; height: ${size}px; top: ${Math.random() * maxTop}vh;`;

  if (dittoContainer) {
      dittoContainer.appendChild(div);
      divQueue.push(div);  

      
      if (divQueue.length > maxDivs) {
          const oldestDiv = divQueue.shift();  
          oldestDiv.classList.replace('fade-in', 'fade-out'); 
          setTimeout(() => oldestDiv.remove(), 1000);  
      }
  }
}


function konga() {
    if (!dittoContainer) {
        dittoContainer = document.createElement('div');
        dittoContainer.className = 'ditto';
        const mainDitto = document.createElement('div');
        mainDitto.className = 'mainditto';
        dittoContainer.appendChild(mainDitto); 
        document.body.appendChild(dittoContainer);
        audio.play();
        creationInterval = setInterval(createFloatingDiv, 1000);
    }
}

function removeDittoElements() {
    clearInterval(creationInterval); 
    divQueue.forEach(el => {
        el.classList.replace('fade-in', 'fade-out'); 
        setTimeout(() => el.remove(), 1000);
    });
    divQueue.length = 0; 
    audio.pause();
    audio.currentTime = 0;
    if (dittoContainer) {
        dittoContainer.querySelector('.mainditto').remove();
        dittoContainer.remove();
        dittoContainer = null;
    }
}

let viewerNames = new Set(); 

ComfyJS.onChat = (user, message, flags, self, extra) => {
  if (!self) {  
      viewerNames.add(user);
  }
};

ComfyJS.onJoin = (user, self, extra) => {
  if (!self) {
      viewerNames.add(user);
  }
};

ComfyJS.onCommand = (user, command, message, flags) => {
    if (flags.broadcaster) {
        if (command === "konga") {
            konga();
        } else if (command === "stop") {
            removeDittoElements();
        }
    }
}


ComfyJS.Init("chaz88p");
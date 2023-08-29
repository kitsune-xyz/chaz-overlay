const lastFMAPI = "e256889460be228684924e974a356380"

let dittoContainer = null;
const audio = new Audio('konga.mp3');
audio.volume = 0.5;


function createFloatingDiv() {
const div = document.createElement('div');
div.className = 'miniditto';
const randomSize = Math.floor(Math.random() * 50) + 60;
if (Math.random() < 0.5) {
 div.classList.add('right');
}
div.style.width = `${randomSize}px`;
div.style.height = `${randomSize}px`;
div.style.opacity = Math.random().toFixed(2);
const randomVerticalPosition = Math.floor(Math.random() * (100 - randomSize)) + 'vh';
div.style.top = randomVerticalPosition;
div.addEventListener('animationend', () => {
 div.remove();
});
document.querySelector('.ditto').appendChild(div);
}

function konga() {
dittoContainer = document.createElement('div');
dittoContainer.className = 'ditto';

const mainDitto = document.createElement('div');
mainDitto.className = 'mainditto';

const miniDitto = document.createElement('div');
miniDitto.className = 'miniditto';

dittoContainer.appendChild(mainDitto);
dittoContainer.appendChild(miniDitto);

document.body.appendChild(dittoContainer);
audio.play();
setInterval(createFloatingDiv, 1000);
}

function removeDittoElements() {
  const dittoElements = document.querySelectorAll('.miniditto');
  dittoElements.forEach(element => element.remove());
  audio.pause();
  audio.currentTime = 0;
  const mainDitto = document.querySelector('.mainditto');
  if (mainDitto) {
  mainDitto.remove();
  }
  if (dittoContainer) {
  dittoContainer.remove();
  dittoContainer = null;
  }
}

ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
  if( flags.broadcaster || flags.mod && command === "konga" ) {
    konga();
  } else if( flags.broadcaster && command === "stop" ) {
    removeDittoElements();
  }
}

ComfyJS.Init( "chaz88p" );


// const client = new tmi.Client({
// 	options: { debug: true },
// 	identity: {
// 		username: 'chaz88pbot',
// 		password: 'oauth:7kbl0yx35mdc6lncuom3dc9ia2cnpj'
// 	},
// 	channels: [ 'wintrfox' ]
// });




// client.connect();

// client.on('message', (channel, tags, message, self) => {
// 	if(self) return;

// 	if(message.toLowerCase() === '!song') {
//     const request = new XMLHttpRequest();

//     request.open('GET', 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=+chaz88p&api_key='+lastFMAPI+'&format=json');
//     request.send(); 

//     request.onload = () => {
//         if (request.status === 200) {
//             var song = JSON.parse(request.response).recenttracks.track[0].name;
//             var artist = JSON.parse(request.response).recenttracks.track[0].artist["#text"];
//             client.say(channel, `@${tags.username}, Last/Current song is ${song} by ${artist}`);
//         } 
//     };

//     request.onerror = () => {
//       console.log("error")
//     };

// 	}
// });


// function sendMessage() {
//     const request = new XMLHttpRequest();
//     request.open("POST", "https://discord.com/api/webhooks/1136972854987079750/iCzkOXlhkKfccEXN_0Fag62z2Pw8aAq6Dj8bJJ1yvek0iV7raUEZe5meIhM7sgUyJNkR");

//     request.setRequestHeader('Content-type', 'application/json');

//     const params = {
//       username: "Live Announcement",
//       avatar_url: "",
//       content: "Chaz is now live! https://twitch.tv/chaz88p"
//     }

//     request.send(JSON.stringify(params));
//   };

//   async function checkIfLive(username) 
//   {
//       do 
//       {
//           const response = await fetch(`https://twitch.tv/${username}`);
//           const sourceCode = await response.text();
  
//           while (sourceCode.includes("isLiveBroadcast")) 
//           {
//               console.log(`${username} is live`);
//           }
//       }
    
//   }
  
//   let username = "chaz88p";
//   checkIfLive(username);

// webhook
// https://discord.com/api/webhooks/1136972854987079750/iCzkOXlhkKfccEXN_0Fag62z2Pw8aAq6Dj8bJJ1yvek0iV7raUEZe5meIhM7sgUyJNkR`
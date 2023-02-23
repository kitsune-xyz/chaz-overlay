const audio = new Audio('./sounds/greetings.mp3');
const greetings = document.querySelector('.greetings');
const greetingusername = document.querySelector('.username');

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  // channels: ["wintrfox"],
  channels: ["chaz88p"],
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	if(self) return;
  var user = tags['display-name'];
  var usermsg = message;
  if(tags['first-msg']) {
    var newmsg = "First time chatter " + user + " says " + usermsg;
  }
  if ('speechSynthesis' in window) {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10];
    msg.voiceURI = 'native';
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1;
    msg.text = newmsg;
    msg.lang = 'en-US';
    } else {
      console.log("Speech Synthesis is not supported by your browser. 😣")
  }
	console.log(`${tags['display-name']}: ${message}`, tags);
	// if(message.toLowerCase() === '!tba') { }
  greetingusername.innerHTML = "Greetings <span>" + user + "!</span>";
  if(tags['first-msg']) {
    greetings.classList.add('anim');
    setTimeout(() => {
      audio.play();
    }, 500);
    setTimeout(() => {
      greetings.classList.remove('anim');
    }, 3000);
    // speechSynthesis.speak(msg);
  }
  if(tags['returning-chatter']) {
    console.log("returning chatter");
  }

});
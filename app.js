const audio = new Audio('');

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: ["chaz88p"],
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	if(self) return;
  var user = tags['display-name'];
  var usermsg = message;
  var newmsg = "First time chatter " + user + " says " + usermsg;
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
	// if(message.toLowerCase() === '!tba') {
	// }
  if(tags['first-msg']) {
    audio.play();
    speechSynthesis.speak(msg);
  }
  if(tags['returning-chatter']) {
    console.log("returning chatter");
  }
});
const lastFMAPI = "e256889460be228684924e974a356380"

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'chaz88pbot',
		password: 'oauth:7kbl0yx35mdc6lncuom3dc9ia2cnpj'
	},
	channels: [ 'wintrfox' ]
});


client.connect();


client.on('message', (channel, tags, message, self) => {
	if(self) return;

	if(message.toLowerCase() === '!song') {
    const request = new XMLHttpRequest();

    request.open('GET', 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=+chaz88p&api_key='+lastFMAPI+'&format=json');
    request.send(); 

    request.onload = () => {
        if (request.status === 200) {
            // console.log("Success");
            var song = JSON.parse(request.response).recenttracks.track[0].name;
            var artist = JSON.parse(request.response).recenttracks.track[0].artist["#text"];
            client.say(channel, `@${tags.username}, Last/Current song is ${song} by ${artist}`);
        } 
    };

    request.onerror = () => {
      console.log("error")
    };

	}
});
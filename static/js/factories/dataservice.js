console.log("loaded data service");

angular.module('myapp', ['ngMaterial']).service('DataService', [function DataService(){
	var songs = []; // array of howl objects
	var feedz_ = [];
	var loadedOnce = false;
	var loadState = false;
	var help = "Here are some helpful shortcuts:    Space: Play/Pause  comma: Previous  period: Next. \
		Be sure to check out our soundcloud at soundcloud.com/burncartel.";
	var timeoutID = 0;

	var currentTrack = {
		title: 'Welcome to FireFeed.',
		id: -1,
		index: -1,
		playingBool: false,
		audio: null,
		pos: 0,
		permalink_url: '',
		howl: []
	};

	self = this;

	this.getPlayedBefore = function(){
		return feedz_[currentTrack.index].state.playedBefore;
	};

	this.setInitialLoadState = function(){

		loadedOnce = true;
		// console.log("setting loaded once to " + loadedOnce);

	};

	this.getInitialLoadState = function(){
		// console.log("returning " + loadedOnce);
		return loadedOnce;
	};

	this.getAudioObj = function(){

		return currentTrack.audio;

	};

	this.setTimeout = function(id){
		timeoutID = id;
	};
	this.getPos = function(){
		currentTrack.pos = currentTrack.audio.currentTime;
		return currentTrack.pos;
	};

	this.getDur = function(){
		return currentTrack.audio.duration;
	};

	this.getHelp = function(){
		return help
	};

	self.toggle = function(){

		if(currentTrack['index'] == -1){ // just start this shit off...
			// console.log('playin first of all...');
			feedz_[0].state.playedBefore = true;
			currentTrack.index = 0;
			currentTrack.title = feedz_[0].track.title;
			currentTrack.playingBool = true;


			// currentTrack.audio = new Audio(feedz_[0].track.url);
			// currentTrack.audio.play();
			songs[currentTrack.index].play();

		}
		else if(currentTrack.playingBool){
			self.pauseCurrentTrack();
			// currentTrack['audio'].pause();

			// currentTrack['playingBool'] = false;

		}
		else{
			// currentTrack.audio.play();
			songs[currentTrack.index].play();
			currentTrack.playingBool = true;
		}


	};

	this.setTrackPos = function(pos){
		feedz_[currentTrack.index].state.pos = pos;
		// console.log('set to ' + feedz_[currentTrack['index']].state.pos);
	};

	this.getFeedSize = function(){
		return feedz_.length;
	};

	this.setLoadState = function(lstate){
		loadState = lstate;
	};

	this.getLoadState = function(){
		// console.log("load state is " + loadState);
		return loadState;
	};



	this.getPlayState = function(){
		return currentTrack.playingBool;
	};




	self.pauseCurrentTrack = function(idtho){


		// just set track pos..

		console.log('pausing.');
		currentTrack.playingBool = false;

		songs[currentTrack.index].pause();
		// currentTrack.audio.pause();
	};

	self.playAndUpdateTrack = function(idtho){
			console.log('play and update track..');
			self.pauseCurrentTrack();

			currentTrack.index = idtho;
			currentTrack.title = feedz_[idtho].track.title;
			// currentTrack.audio = new Audio(feedz_[idtho].track.url);


			songs[currentTrack.index].play();
			// currentTrack.audio.play();

			currentTrack.playingBool = true;

	}

	function playPause(idtho){

		if( (currentTrack['playingBool'] == false) && (idtho != currentTrack['index'] ) ){
			self.playCurrentTrack(idtho); // diff track, from pause state. also first time
			console.log('diff track from pause state');
			// console.log("has this been played before?" + this.getPlayedBefore());
		}
		else if( (currentTrack['playingBool'] == true) && (idtho != currentTrack['index'] ) ){
			self.playAndUpdateTrack(idtho); //diff track, from play state
			console.log('diff track from play state');
			// console.log("has this been played before?" + DataService.getPlayedBefore());
		}
		else if(idtho == currentTrack['index'] ) // same track, played or paused..
		{
			console.log('just toggling');
			self.toggle();

			// console.log("has this been played before?" + DataService.getPlayedBefore());

		}
		else{
			console.log('WHAT???.');
		}
	};

	self.getFeedCheat = function(){



	}

	self.hasNext = function(){
		var newIndex = currentTrack['index'];
		newIndex++;
		// console.log( newIndex + ' less than ?? ' + DataService.getFeedSize() );

		if( newIndex < feedz_.length )
			playPause(newIndex);
		else
			self.getFeedCheat();
		//	location.reload(); // this is actually getting more at getfeedcheat

	};

	self.playCurrentTrack = function(idtho){

		// MAKE IT SO WE DON'T PAUSE FIRST BEFORE CHANGING SONG.

		currentTrack.index = idtho;
		currentTrack.title = feedz_[idtho].track.title;

		console.log("PLAYING");
		// current
		songs[currentTrack.index].play();


		// currentTrack.howl.push(songs[feedz_[idtho]]);
		// currentTrack.howl[0].play();
		// currentTrack.audio = new Audio(feedz_[idtho].track.url);
		// currentTrack.audio.play(); CHANGED


		currentTrack.playingBool = true;
		console.log('now playing ' + currentTrack.title);

	};

	this.getCurrentTrack = function(idtho){
		return currentTrack.title;
	};

	this.getCurrentTrackIndex = function(){
		return currentTrack.index;
	}

	this.addFeed = function(st){
		var toPush = JSON.parse(JSON.stringify(st))
		feedz_.push(toPush);
		this.addHowlers(toPush);
		// st['state']['audioObject'].play();
	};

	this.addHowlers = function(newSongs){

		songs.push(
				new Howl({
					urls: [newSongs['track']['url']],
					buffer: true,
					volume: 0.5,
					onload:function(){
						console.log(newSongs['track']['title'] + " was loaded!");
						// this.play();
						// songs[0].play();
					},
					onplay: function(){
						console.log(newSongs['track']['title'] + " is being played at " + this.pos());

					},
					onend: function(){
						console.log("\n\n\t track considered over at " + this.pos() + " \n\n");
						self.hasNext();

					}
				})
			);


		console.log("just added " + songs[0]);

		// }// for loop
	};

	this.getFeed = function(){
		return feedz_;
	};

}]);

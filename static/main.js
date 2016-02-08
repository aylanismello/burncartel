var app = angular.module('myapp', []);

// window.onkeydown = function(e) {
// 		return !(e.keyCode == 32); //disable spacebar..
// };

function DataService(){
	var feedz_ = [];
	var loadState = false;

	var currentTrack = {
		title: 'Welcome to FireFeed.',
		id: -1,
		index: -1,
		playingBool: false,
		audio: null
	};



	this.toggle = function(){


		if(currentTrack['index'] == -1){ // just start this shit off...
			console.log('playin first of all...');
			currentTrack['index'] = 0;
			currentTrack['title'] = feedz_[0].track.title;
			currentTrack['playingBool'] = true;
			currentTrack['audio'] = new Audio(feedz_[0].track.url);
			currentTrack['audio'].play();

		}
		else if(currentTrack['playingBool']){
			currentTrack['audio'].pause();

			currentTrack['playingBool'] = false;

		}
		else{
			currentTrack['audio'].play();
			currentTrack['playingBool'] = true;
		}


	};

	this.getFeedSize = function(){
		return feedz_.length;
	};

	this.setLoadState = function(){
		loadState = true;
	};

	this.getLoadState = function(){
		return loadState;
	};



	this.getPlayState = function(){
		return currentTrack['playingBool'];
	};

	this.pauseCurrentTrack = function(idtho){
		console.log('pausing.');
		currentTrack['playingBool'] = false;
		currentTrack['audio'].pause();
	};

	this.playAndUpdateTrack = function(idtho){
			console.log('play and update track..');
			this.pauseCurrentTrack();

			currentTrack['index'] = idtho;
			currentTrack['title'] = feedz_[idtho].track.title;
			currentTrack['audio'] = new Audio(feedz_[idtho].track.url);
			currentTrack['audio'].play();
			currentTrack['playingBool'] = true;

	}

	this.playCurrentTrack = function(idtho){

		// MAKE IT SO WE DON'T PAUSE FIRST BEFORE CHANGING SONG.

		currentTrack['index'] = idtho;
		currentTrack['title'] = feedz_[idtho].track.title;
		currentTrack['audio'] = new Audio(feedz_[idtho].track.url);
		currentTrack['audio'].play();
		currentTrack['playingBool'] = true;
		console.log('now playing ' + currentTrack['title']);

	};

	this.getCurrentTrack = function(idtho){
		return currentTrack['title'];
	};

	this.getCurrentTrackIndex = function(){
		return currentTrack['index'];
	}

	this.addFeed = function(st){
		var toPush = JSON.parse(JSON.stringify(st))
		feedz_.push(toPush);
		// st['state']['audioObject'].play();
	};

	this.getFeed = function(){
		return feedz_;
	};

}

app.service('DataService', [DataService]);

app.controller('getCtrl', function($scope, $http, DataService){
	var self = this;

	// $scope joins controller with views
	self.shout = function(){
		alert("SHOUT!");
	};

	self.setLoadState = function(){
		DataService.setLoadState();
	};

	self.getLoadState= function(){
		console.log(DataService.getLoadState());
		return DataService.getLoadState();
	};

	self.feed = {
		id: 0,
		username: '',
		avatar_url: '',
		track: {
			id: 0,
			title: '',
			url: '',
			artwork_url: ''
		},
		state: {
			playBool: 0,
			playText: '',
			audioObject: null
		}

	};

	$scope.feedz = []; //gonna contains all the self.feeds...

	self.getFeed = function(){
		return DataService.getFeed();
	}


	$http.get("/getfeed").
	then(function(response){
		console.log("HELLOO");
		var r = response.data.myjson;
		console.log('my feeds start with user ' + r[0].username)
		$scope.feeds = r;
		self.prepWork();
		console.log('set that state tho');
		DataService.setLoadState();
	});




	self.prepWork = function(){
		// for all shit in feeds do this:
		for(var i = 0; i < $scope.feeds.length; i++){
			self.feed["id"] = $scope.feeds[i].id;
			self.feed["username"] = $scope.feeds[i].username;
			self.feed["avatar_url"] = $scope.feeds[i].avatar_url;
			self.feed["track"] = $scope.feeds[i].track;
			self.feed["track"]["url"] = $scope.feeds[i].track.url;


			self.feed["state"]["playBool"] = false;
			self.feed["state"]["playText"] = 'unplayed.';
			console.log("Adding " + self.feed['track']['url'] + " of audio of type " + self.feed['state']['audioObject']);
			DataService.addFeed(self.feed);
		}

	}

});

app.controller('playCtrl', function(DataService){
	var self = this;

	self.shout = function(){
		alert('SHOUT');
	};

	self.hasNext = function(){

		var newIndex = DataService.getCurrentTrackIndex();
		newIndex++;
		console.log( newIndex + ' less than ?? ' + DataService.getFeedSize() );
		if( newIndex < DataService.getFeedSize() )
			self.playPause(newIndex);


	};

	self.hasPrev = function(){
		var newIndex = DataService.getCurrentTrackIndex();
		newIndex--;
		if(0 <= newIndex)
			self.playPause(newIndex);
	};

	self.toggle = function(){ // for pausing/playing from BC play button
		DataService.toggle();
	};

	self.getAnimateState = function(){ // for turning BC logo movement on/off
		if(DataService.getPlayState())
			return "animated infinite pulse";
		else
			return ""
	};

	self.isPlaying = function(i){ // to show on/off visuals on track art

		if(DataService.getCurrentTrackIndex() == i)
			return 'playing';
		else
			return 'paused';

	};

	self.getCurrentTrack = function(){
		return DataService.getCurrentTrack();
	};

	self.ok = function() {
		alert('ok!');
	};


	self.playPause = function(idtho){



		console.log('playin ' + idtho);

		if( (DataService.getPlayState() == false) && (idtho != DataService.getCurrentTrackIndex() ) ){
			DataService.playCurrentTrack(idtho); // diff track, from pause state.
			console.log('diff track from pause state');
		}
		else if( (DataService.getPlayState() == true) && (idtho != DataService.getCurrentTrackIndex() ) ){
			DataService.playAndUpdateTrack(idtho); //diff track, from play state
			console.log('diff track from play state');
		}
		else if(idtho == DataService.getCurrentTrackIndex() ) // same track, played or paused..
		{
			console.log('just toggling');
			self.toggle();

		}
		else{
			console.log('WHAT???.');
		}

	};
});

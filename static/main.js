var app = angular.module('myapp', []);


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



	this.setLoadState = function(){
		loadState = true;
	};

	this.getLoadState = function(){
		return loadState;
	};


	//if first time being played? do that later.. inefficient 4 now.
	this.setCurrentTrack = function(idtho){


	};

	this.getAudio = function(idtho){

		return feedz_[idtho].state.audioObject;
	}

	this.getPlayState = function(){
		return currentTrack['playingBool'];
	};

	this.pauseCurrentTrack = function(idtho){
		currentTrack['playingBool'] = false;
		currentTrack['audio'].pause();
		// feedz_[idtho].pause();
	};

	this.playCurrentTrack = function(idtho){

		if(idtho != currentTrack['index']){ // new song, do all this shit again.
			if(currentTrack['index'] != -1){
				console.log('change song midway..');
				currentTrack['audio'].pause();//stop old song.
			}


			currentTrack['index'] = idtho;
			currentTrack['title'] = feedz_[idtho].track.title;
			console.log('i should play' + feedz_[idtho]['track']['title']);
			currentTrack['audio'] = new Audio(feedz_[idtho]['track']['url']);
			currentTrack['audio'].play();

			currentTrack['playingBool'] = true;

		}
		else{
			currentTrack['audio'].play();
			currentTrack['playingBool'] = true;
		}

	};

	this.getCurrentTrack = function(idtho){
		return currentTrack['title'];
	};

	this.getCurrentTrackID = function(){
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
		// console.log('my data is ' + r.items);
		console.log('my feeds start with user ' + r[0].username)
		// here is where we convert the array of dicts into some we use here...
		// $scope.feeds = r.items;
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
			// self.feed["state"]["audioObject"] = new Audio(self.feed["track"]["url"]);

			console.log("Adding " + self.feed['track']['url'] + " of audio of type " + self.feed['state']['audioObject']);
			// self.feed["state"]["audioObject"].play();

			// var toPush = JSON.parse(JSON.stringify(self.feed))
			// $scope.feedz.push(toPush);
			DataService.addFeed(self.feed);


		}

	}

});

app.controller('playCtrl', function(DataService){
	var self = this;

	self.getAnimateState = function(){
		if(DataService.getPlayState())
			return "animated infinite pulse";
		else
			return ""
	};

	self.isPlaying = function(i){

		var c = DataService.getCurrentTrackID();


		if(c == i)
			return 'playing';
		else
			return 'paused';

	};

	self.getCurrentTrack = function(){
		return DataService.getCurrentTrack();
	};



	self.playPause = function(idtho){

		if(DataService.getPlayState())
			DataService.pauseCurrentTrack(idtho);
		else // if paused.. play
			DataService.playCurrentTrack(idtho);

		};
});

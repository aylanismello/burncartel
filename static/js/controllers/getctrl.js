angular.module('myapp', ['ngMaterial']).controller('getCtrl', function($scope, $http, DataService){

	console.log("whatt");
	var self = this;



	$scope.getNewBurn = function(){
		console.log('querying new bern.');

	};

	self.getFeedCheat = function(){
		DataService.setLoadState(false);
		$http.get("/getfeed").
			then(function(response){


				// console.log("setting load state to false");
				console.log("HELLOO. CALLING SERVER AGAIN 4 MORE\n\n");
				var r = response.data.myjson;
				console.log('my feeds start with user ' + r[0].username)
				$scope.feeds = r;
				self.prepWork();
				console.log('set that to tru tho');
				DataService.setLoadState(true);
		});

		// location.reload();
	};


	self.echo = function(i){
		console.log('echoQQ');
		return i;
	};
	// $scope joins controller with views
	self.shout = function(){
		alert("SHOUT!");
	};

	self.setInitialLoadState = function(){
		DataService.setInitialLoadState();
	}

	self.getInitialLoadState = function(){
		// console.log("returning " + DataService.getInitialLoadState());
		return DataService.getInitialLoadState();
	}

	self.setLoadState = function(lstate){
		// console.log("setting shit to " + lstate);
		DataService.setLoadState(lstate);
	};



	self.getLoadState= function(){
		// console.log(DataService.getLoadState());
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
			artwork_url: '',
			permalink_url: ''
		},
		state: {
			playBool: 0,
			playText: '',
			audioObject: null,
			position: 0,
			playedBefore: false
		}

	};

	$scope.feedz = []; //gonna contains all the self.feeds...

	self.getFeed = function(){
		return DataService.getFeed();
	};

	self.getFeedTho = function(i){
		console.log('just received ' + i);
	};

	$http.get("/getfeed").
		then(function(response){

			console.log("HELLOO. CALLING SERVER FIRST TIME \n\n");
			var r = response.data.myjson;
			console.log('my feeds start with user ' + r[0].username)
			$scope.feeds = r;
			self.prepWork();
			// console.log('set that state tho');
			DataService.setLoadState(true);
			DataService.setInitialLoadState();
			//calling next one now


		}, function errorCallback(response){
			 var msg = "there was an error called " + response.status + " \n data: " + response.data +
				 "\nheader: " + response.headers + "\nconfig: " + response.config + "\nstatusText: " + response.statusText;
				alert("SO SRY 4 DA JANKINESS:( plz refresh!) \n\n NERD_INFOZ: \n\n" + msg);


					console.log("there was an error called " + response.status + " \n data: " + response.data +
						"\nheader: " + response.headers + "\nconfig: " + response.config + "\nstatusText: " + response.statusText);


		});




	self.prepWork = function(){
		// for all shit in feeds do this:
		for(var i = 0; i < $scope.feeds.length; i++){
			self.feed["id"] = $scope.feeds[i].id;

			self.feed["username"] = $scope.feeds[i].username;
			self.feed["avatar_url"] = $scope.feeds[i].avatar_url;
			self.feed["track"] = $scope.feeds[i].track;

			if(!$scope.feeds[i].track.artwork_url)
				self.feed.track.artwork_url= $scope.feeds[i].avatar_url;

			self.feed["state"]["playBool"] = false;
			self.feed["state"]["playText"] = 'unplayed.';
			console.log("Adding " + self.feed['track']['title'] + " by " + self.feed['username']);

			DataService.addFeed(self.feed);
		}

	}

});

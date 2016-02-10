var app = angular.module('myapp', ['ngMaterial']);

function DataService(){
	var feedz_ = [];
	var loadState = false;
	var help = "Here are some helpful shortcuts:    Space: Play/Pause  comma: Previous  period: Next. \
		Be sure to check out our soundcloud at soundcloud.com/burncartel.";


	var currentTrack = {
		title: 'Welcome to FireFeed.',
		id: -1,
		index: -1,
		playingBool: false,
		audio: null,
		pos: 0
	};

	this.getHelp = function(){
		return help
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
			this.pauseCurrentTrack();
			// currentTrack['audio'].pause();

			// currentTrack['playingBool'] = false;

		}
		else{
			currentTrack['audio'].play();
			currentTrack['playingBool'] = true;
		}


	};

	this.setTrackPos = function(pos){
		feedz_[currentTrack['index']].state.pos = pos;
		console.log('set to ' + feedz_[currentTrack['index']].state.pos);
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


		// just set track pos..

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




app.controller('Genres', ['$scope', function($scope) {

	$scope.doThis = function(){
		console.log("WASSUP");
	};

	$scope.data = {
	 availableOptions: [
		 {id: '0', name: 'Future Beats'},
		 {id: '1', name: 'Electro'},
		 {id: '2', name: 'Trap'}
	 ],
	 selectedOption: {id: '0', name: 'Future Beats'} //This sets the default value of the select in the ui
	 };
}]);

app.controller('AppCtrl', function($scope, $interval, $mdDialog, $mdMedia, DataService){


	// FOR DIALOG BOX


	$scope.status = '  ';
 $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
 $scope.showAlert = function(ev) {
	 // Appending dialog to document.body to cover sidenav in docs app
	 // Modal dialogs should fully cover application
	 // to prevent interaction outside of dialog
	 $mdDialog.show(
		 $mdDialog.alert()
			 .parent(angular.element(document.querySelector('#popupContainer')))
			 .clickOutsideToClose(true)
			 .title('FireFeed')
			 .textContent(DataService.getHelp())
			 .ariaLabel('Alert Dialog Demo')
			 .ok('Fsho.')
			 .targetEvent(ev)
	 );
 };
 $scope.showConfirm = function(ev) {
	 // Appending dialog to document.body to cover sidenav in docs app
	 var confirm = $mdDialog.confirm()
				 .title('Alert')
				 .textContent('All of the banks have agreed to forgive you your debts.')
				 .ariaLabel('Lucky day')
				 .targetEvent(ev)
				 .ok('Please do it!')
				 .cancel('Sounds like a scam');
	 $mdDialog.show(confirm).then(function() {
		 $scope.status = 'You decided to get rid of your debt.';
	 }, function() {
		 $scope.status = 'You decided to keep your debt.';
	 });
 };
 $scope.showAdvanced = function(ev) {
	 var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
	 $mdDialog.show({
		 controller: DialogController,
		 templateUrl: 'dialog1.tmpl.html',
		 parent: angular.element(document.body),
		 targetEvent: ev,
		 clickOutsideToClose:true,
		 fullscreen: useFullScreen
	 })
	 .then(function(answer) {
		 $scope.status = 'You said the information was "' + answer + '".';
	 }, function() {
		 $scope.status = 'You cancelled the dialog.';
	 });
	 $scope.$watch(function() {
		 return $mdMedia('xs') || $mdMedia('sm');
	 }, function(wantsFullScreen) {
		 $scope.customFullscreen = (wantsFullScreen === true);
	 });
 };




	/**
	 * Turn off or on the 5 themed loaders
	 */



			var self = this,  j= 0, counter = 0;
      self.modes = [ ];
      self.activated = true;
      self.determinateValue = 30;





      self.toggleActivation = function() {
          if ( !self.activated ) self.modes = [ ];
          if (  self.activated ) j = counter = 0;
      };
      // Iterate every 100ms, non-stop
      $interval(function() {
        // Increment the Determinate loader
        self.determinateValue += 1;
        if (self.determinateValue > 100) {
          self.determinateValue = 30;
        }
        // Incrementally start animation the five (5) Indeterminate,
        // themed progress circular bars
        if ( (j < 5) && !self.modes[j] && self.activated ) {
          self.modes[j] = 'indeterminate';
        }
        if ( counter++ % 4 == 0 ) j++;
      }, 100, 0, true);


			$scope.color = {
			    red: Math.floor(Math.random() * 255),
			    green: Math.floor(Math.random() * 255),
			    blue: Math.floor(Math.random() * 255)
			  };
			  $scope.rating1 = 0;
			  $scope.rating2 = 1;
			  $scope.rating3 = 2;
			  $scope.disabled1 = 3;
			  $scope.disabled2 = 4;

    });

app.controller('Effects', function($scope){

	this.userState = '';
			 this.states = {'abbrev': 'California', 'abbrev': 'here'};

	$scope.demo = {
		 showTooltip : false,
		 tooltipDirection : 'up'
	};

});



app.controller('getCtrl', function($scope, $http, DataService){
	var self = this;

	$scope.getNewBurn = function(){
		console.log('querying new bern.');

	};

	self.getFeedCheat = function(){
		location.reload();
	};


	self.echo = function(i){
		console.log('echoQQ');
		return i;
	};
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
			artwork_url: 'http://cdn0.dailydot.com/uploaded/images/original/2015/4/5/fire.jpg'
		},
		state: {
			playBool: 0,
			playText: '',
			audioObject: null,
			position: 0
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
		else
			location.reload();



	};

	self.hasPrev = function(){
		var newIndex = DataService.getCurrentTrackIndex();
		newIndex--;
		if(0 <= newIndex)
			self.playPause(newIndex);
	};

	self.key = function(e){
		console.log(e.charCode);
		if (e.charCode == 32) {
    	e.preventDefault();
			DataService.toggle();
  	}
		else if(e.charCode == 46){ //right
			self.hasNext();
		}
		else if(e.charCode == 44){ //left
			self.hasPrev();
		}


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
			DataService.playCurrentTrack(idtho); // diff track, from pause state. also first time
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

app.controller('playCtrl', function(DataService){
	var self = this;




	self.shout = function(){
		alert('SHOUT');
	};

	self.hasNext = function(){

		DataService.hasNext();
		// var newIndex = DataService.getCurrentTrackIndex();
		// newIndex++;
		// console.log( newIndex + ' less than ?? ' + DataService.getFeedSize() );
		//
		// if( newIndex < DataService.getFeedSize() )
		// 	self.playPause(newIndex);
		// else
		// 	location.reload();



	};

	self.hasPrev = function(){
		var newIndex = DataService.getCurrentTrackIndex();
		newIndex--;
		if(0 <= newIndex)
			self.playPause(newIndex);
	};

	self.key = function(e){
		// console.log(e.charCode);
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


		// var x = DataService.getAudioObj();
		// console.log("got this: " + x);
		// x.onended = function(){
		// 	alert("SONG IS OVER AS FUCK");
		// };


		console.log('playin ' + idtho);



		if( (DataService.getPlayState() == false) && (idtho != DataService.getCurrentTrackIndex() ) ){
			DataService.playCurrentTrack(idtho); // diff track, from pause state. also first time
			console.log('diff track from pause state');
			console.log("has this been played before?" + DataService.getPlayedBefore());
		}
		else if( (DataService.getPlayState() == true) && (idtho != DataService.getCurrentTrackIndex() ) ){
			DataService.playAndUpdateTrack(idtho); //diff track, from play state
			console.log('diff track from play state');
			console.log("has this been played before?" + DataService.getPlayedBefore());
		}
		else if(idtho == DataService.getCurrentTrackIndex() ) // same track, played or paused..
		{
			console.log('just toggling');
			self.toggle();
			console.log("has this been played before?" + DataService.getPlayedBefore());

		}
		else{
			console.log('WHAT???.');
		}

	};
});

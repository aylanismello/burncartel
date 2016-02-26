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

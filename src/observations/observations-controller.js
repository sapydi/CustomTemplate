
angular.module('unileverUSApp.controllers').controller('ObservationsController', ObservationsController);

function ObservationsController($scope, $ionicPopover, $ionicPopup, jsonServiceStub, userInfoService, $state, backendService) {
  this.observations = jsonServiceStub.getObservations();
  this.userName = userInfoService.getUserName();
  this.floorCode = 'No floor selected for study.';
  this.buildingName = '';
  this.buildingId = '';
  this.selectedObservation = '';

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
      $scope.popover.show($event);
   };

   $scope.closePopover = function() {
      $scope.popover.hide();
   };

   this.showPreview = function(observation){
	   this.selectedObservation = observation;
       this.floorCode = observation.floor;
       this.buildingName = observation.building;
       this.buildingId = observation.id;
   };

   this.gotoStudy = function(){
   		if(this.selectedObservation){
            $scope.showConfirm(this.selectedObservation);
   			/*$state.go('app.single', this.buildingId);*/
   		}else{
   			$ionicPopup.alert({
				         title: 'oops !!',
				         template: 'Select a floor to start the study.'
             });
   		}
   }

   //Cleanup the popover when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.popover.remove();
   });

   // Execute action on hide popover
   $scope.$on('popover.hidden', function() {
      // Execute action
   });

   // Execute action on remove popover
   $scope.$on('popover.removed', function() {
      // Execute action
   });


  $scope.showConfirm = function(selectedObservation) {

      var confirmPopup = $ionicPopup.confirm({
         title: 'Start Study !!',
         template: 'Are you sure?'
      });

      confirmPopup.then(function(res) {
         if(res) {
            console.log('Sure!');
            backendService.getOrderAndPurchaseOrderLines(true).then(function(result){
                                // Check if any errors exists
                                if (result.errorMessage == null || result.errorMessage == ''){
                                    $log.debug("Response details : " + JSON.stringify(result));
                                    console.log("Response details : " + JSON.stringify(result));
                                } else {
                                     $log.error("error : " + JSON.stringify(result.errorMessage));
                                     console.log("Error details : " + JSON.stringify(result));
                                }
                            }).catch(function(error){
                                $log.error("getOrderAndPurchaseOrderLines error occured : " + JSON.stringify(error));
                                console.log("Error details : " + JSON.stringify(error));
                            });

            $state.go('app.observation', {observation: selectedObservation});
         } else {
            console.log('Not sure!');
         }
      });
  	};
    this.logout = function() {
      $scope.closePopover();
      $state.go('login',null);
   };
};

$(function(){
  $('body').on('click','ion-list ion-item',function(){
      $(this).addClass('active');
      $(this).siblings('ion-item').removeClass('active');
  });
});


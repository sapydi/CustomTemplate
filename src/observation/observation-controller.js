angular.module('unileverUSApp.controllers').controller('ObservationController', ObservationController);

function ObservationController($scope, $ionicPopup, $stateParams, $state) {

	this.observation = angular.fromJson($stateParams.observation);
	console.log("I forgot... ");
    // Triggered on a button click, or some other target
    $scope.showPopup = function() {
    $scope.data = {}
    

   // An elaborate, custom popup
   var finishPopup = $ionicPopup.show({
     templateUrl: 'templates/finishStudy.html',
     title: 'Finish Study',
     subTitle: '',
     scope: $scope,

     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
         	console.log("Hello");
           if (!$scope.data.date) {
            console.log("Hello");
             //e.preventDefault(); //don't allow the user to close unless the data is entered.
           } else {
            $state.go('app.observations', null );
             //return $scope.data.date;
           }
         }
       },
     ]
   });

   finishPopup.then(function(res) {
     $state.go('app.observations',null);
     console.log('Tapped!', res);
   });
   /*$timeout(function() {
      finishPopup.close(); //close the popup after 3 seconds for some reason
   }, 3000);*/
  };
};
$(document).on('click','#space-list-tgl',function(){
  $('#space-list').toggleClass('active').css('top',$('#observation-header').outerHeight());
  $(this).toggleClass('ion-ios-fastforward ion-ios-rewind');
  if($(window).width() < 520){
    $('#space-list-right').removeClass('active ');
  }
});
$(document).on('click','#space-list-right-tgl',function(){
  $('#space-list-right').toggleClass('active').css('top',$('#observation-header').outerHeight()+20);
    if($(window).width() < 520){
    $('#space-list-tgl').removeClass('ion-ios-rewind').addClass('ion-ios-fastforward');
    $('#space-list').removeClass('active ');
  }
});


djelloApp.controller('CardCtrl', ['dataService', '$scope', '$stateParams', function( dataService, $scope, $stateParams){

  $scope.card_title = "";
  $scope.card_description = "";
  console.log('card controller');
  console.log( $stateParams );

  $scope.addCard = function(cardValid) {
    if (cardValid) {
    console.log('trying to add card');
    
      var newCard = {
        title: $scope.card_title,
        description: $scope.card_description,
        list_id: $scope.currentList.id,
        completed: false
      }
      dataService.addCard( newCard );
      console.log( newCard);
    }
    $scope.list_title = "";
  }

  // $scope.removeCard = function(cardObj) {
  //   console.log("Here");
  //   dataService.deleteCard(cardObj);
  // };

}]);

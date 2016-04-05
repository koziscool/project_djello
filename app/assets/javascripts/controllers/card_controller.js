djelloApp.controller('CardCtrl', ['boardService', 'listService', '$scope', '$stateParams', 'Restangular' , function( boardService, listService, $scope, $stateParams, Restangular){

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
      boardService.addCard( newCard );
      console.log( newCard);
      // Restangular.all('cards').post(newCard).then(
      //   function(response)  {
      //     console.log("Card was added")
      //   },
      //   function(response)  {
      //      alert("Could not add your card: " + $scope.card_title + " to the list " + $scope.currentList.title);
      //  });
    }
    $scope.list_title = "";
  }

}]);

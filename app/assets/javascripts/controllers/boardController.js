
djelloApp.controller('BoardCtrl', ['dataService', '$scope', '$stateParams', '$state', function( dataService, $scope, $stateParams, $state){

  $scope.boards = dataService.getBoards(); 
  $scope.currentBoard = dataService.getCurrentBoard();
 
  if( $scope.currentBoard) {
    $scope.lists = $scope.currentBoard.lists
  }


  $scope.selectBoard = function(boardObj) {
    console.log('trying to select board')
    console.log(boardObj);
    dataService.updateCurrentBoard( boardObj.id );
    $scope.currentBoard = boardObj;
  }

  $scope.createBoard = function(boardValid) {
    var newBoard = {title: $scope.board_title, user_id: currentUser.id };
   
    if (boardValid) {
      dataService.create(newBoard).then( function() {
        console.log(' created ok');
        $scope.currentBoard = dataService.getCurrentBoard();
        console.log( 'current board')
        console.log( $scope.currentBoard );
        // $scope.lists = listService.getBoardLists();
        $scope.lists = $scope.currentBoard.lists;

      });  
    }
  }

  $scope.deleteBoard = function(boardObj) {
    dataService.destroy(boardObj).then(function () {
      $scope.currentBoard = dataService.getCurrentBoard();
      $scope.lists = $scope.currentBoard.lists;
      // $scope.lists = listService.getBoardLists();
    });
  }

  $scope.removeList = function(listObj) {
   console.log("In delete list") ;
    Restangular.one("lists/" + listObj.id).remove().then(
      function(res)  {
          $scope.lists.splice($scope.lists.indexOf(listObj), 1);
          alert("Deleted your list: " + listObj.title);
      },
       function(res)  {
        alert("Could not delete your list: " + listObj.title);
      }
    )
  }

  $scope.addList = function( listValid ) {

    console.log('adding list');
    var newList = {title: $scope.list_title, 
                   board_id: $scope.currentBoard.id
                  };

    if (listValid) {
      console.log('in if block');
      dataService.addList( newList );
    }
    $scope.list_title = "";
  }

  $scope.newCard = function(listObj) {
    console.log("trying to add card");
    $scope.currentList = listObj;
    $state.go("board.card");

  }

  $scope.removeCard = function(cardObj) {
    console.log("Here");
    Restangular.one("cards/" + cardObj.id).remove().then(
      function(res)  {
        console.log("Card deleted");
      },
      function(res)  {
        alert("Could not delete your card: " + cardObj.title);
      })
  }
}]);

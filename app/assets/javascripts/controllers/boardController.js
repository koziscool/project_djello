
djelloApp.controller('BoardCtrl', ['Restangular', 'boardService', 'listService', '$scope', '$stateParams', 'allBoards', function( Restangular, boardService, listService, $scope, $stateParams, allBoards){

  $scope.boards = allBoards; 
  $scope.currentBoard = allBoards[0];

  listService.populateboardLists($scope.currentBoard);

  //$scope.lists = $scope.currentBoard.lists;
  $scope.lists = listService.getBoardLists();
  $scope.list_cards = {};

  console.log($scope.currentBoard);
  console.log($scope.currentBoard.lists[0]);


  $scope.selectBoard = function(boardObj) {
    $scope.currentBoard = $scope.boards[$scope.boards.indexOf(boardObj)];
    listService.populateboardLists($scope.currentBoard );

    $scope.lists = listService.getBoardLists();
  
  }

  $scope.createBoard = function() {
    console.log("Board Created");
  }

  $scope.deleteBoard = function(boardObj) {
 
     Restangular.one("boards/" + boardObj.id).remove().then(
       function(res)  {
          $scope.boards.splice($scope.boards.indexOf(boardObj), 1);
          console.log("Board Deleted");
       },
       function(res)  {
        console.log("Board NOT Deleted");
     }      
    ) 
  }

}]);

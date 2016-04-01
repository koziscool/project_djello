
djelloApp.controller('BoardCtrl', ['boardService', 'listService', '$scope', '$stateParams', 'allBoards', function( boardService, listService, $scope, $stateParams, allBoards){

  $scope.boards = allBoards; 
  $scope.currentBoard = allBoards[2];

  listService.populateboardLists($scope.currentBoard);

  //$scope.lists = $scope.currentBoard.lists;
  $scope.lists = listService.getBoardLists();

  console.log($scope.currentBoard);
  console.log($scope.currentBoard.lists[0]);


  $scope.selectBoard = function(boardObj) {
    $scope.currentBoard = $scope.boards[$scope.boards.indexOf(boardObj)];
    listService.populateboardLists($scope.currentBoard );

    $scope.lists = listService.getBoardLists();
    
    console.log("Selected Lists");
    console.log($scope.lists);
  }

}]);

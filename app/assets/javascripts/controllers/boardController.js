
djelloApp.controller('BoardCtrl', ['boardService', 'listService', '$scope', '$stateParams', 'allBoards', function( boardService, listService, $scope, $stateParams, allBoards){

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
    
    console.log("Selected Lists");
    console.log($scope.lists);
      
    console.log("In Checking");
    console.log($scope.lists[0].cards);
    //$scope.populateListCards;
  }

  $scope.populateListCards = function() {
    for ( var i = 0; i < $scope.lists.length ; i++) {
      key = $scope.list[i].id;
      $scope.list_cards[key] =  $scope.list[i].cards;
    }
    console.log("In here");
    console.log($scope.list_cards);
  }  
}]);

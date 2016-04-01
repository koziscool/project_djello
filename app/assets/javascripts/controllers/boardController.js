
djelloApp.controller('BoardCtrl', ['boardService', '$scope',  '$stateParams',function(boardService, $scope, $stateParams){

  boardService.getIndex();
  $scope.boards = boardService.index;
  $scope.currentBoard = $scope.boards[0];

}]);
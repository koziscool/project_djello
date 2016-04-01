
djelloApp.controller('BoardCtrl', ['boardService', '$scope',  '$stateParams', 'allBoards', function( boardService, $scope, $stateParams, allBoards){

  console.log( allBoards );
  $scope.currentBoard = allBoards[0];
  console.log($scope.currentBoard);

}]);
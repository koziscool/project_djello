
djelloApp.controller('ListCtrl', ['boardService', 'listService', '$scope', '$stateParams', function( boardService, listService, $scope, $stateParams){

  $scope.lists = listService.getBoardLists();

}]);

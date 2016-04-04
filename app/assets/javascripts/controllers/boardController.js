
djelloApp.controller('BoardCtrl', ['Restangular', 'Auth', 'boardService', 'listService', '$scope', '$stateParams', 'allBoards', function( Restangular, Auth, boardService, listService, $scope, $stateParams, allBoards){


  $scope.boards = allBoards; 
  $scope.currentBoard = allBoards[0];

  listService.populateboardLists($scope.currentBoard);

  console.log("Boards");
  console.log(allBoards);
  console.log($scope.currentBoard);

  //$scope.lists = $scope.currentBoard.lists;
  $scope.lists = listService.getBoardLists();
  $scope.list_cards = {};

  $scope.board_title = "";

  $scope.list_title = "";
  $scope.list_board_id = $scope.currentBoard.id

  console.log($scope.currentBoard);
  console.log($scope.currentBoard.lists[0]);
  
  $scope.refreshBoard = function(boardIndex) {
    $scope.currentBoard = $scope.boards[boardIndex];
    listService.populateboardLists($scope.currentBoard);
    $scope.lists = listService.getBoardLists();
  }


  $scope.selectBoard = function(boardObj) {
    $scope.refreshBoard($scope.boards.indexOf(boardObj));
  }

  $scope.createBoard = function(boardValid) {

    var newBoard = {title: $scope.board_title, user_id: 1};
    if (boardValid) {
      Restangular.all('boards').post(newBoard).then(
        function(response)  {
          $scope.boards.unshift(response);
          $scope.refreshBoard(0);
        },
        function(response)  {
          alert("Could not add your board: " + board_title);
       });
    }
  }

  $scope.deleteBoard = function(boardObj) {
     Restangular.one("boards/" + boardObj.id).remove().then(
       function(res)  {
          index = $scope.boards.indexOf(boardObj)
          $scope.boards.splice(index, 1);
          $scope.refreshBoard(0);
       },
       function(res)  {
        alert("Could not delete your board: " + boardObj.title);
     }      
    )
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

  $scope.addList = function(listValid) {

    var newList = {title: $scope.list_title, board_id: $scope.currentBoard.id};
    var index = $scope.boards.indexOf($scope.currentBoard);

    if (listValid) {
      Restangular.all('lists').post(newList).then(
        function(response)  {
          $scope.lists.push(response);
          $scope.refreshBoard(index);
        },
        function(response)  {
           alert("Could not add your list: " + list_title);
       });
    }
    $scope.list_title = "";
  }

}]);

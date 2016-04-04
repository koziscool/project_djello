
djelloApp.controller('BoardCtrl', ['Restangular', 'Auth', 'boardService', 'listService', '$scope', '$stateParams', '$state', 'allBoards', 'currentUser', function( Restangular, Auth, boardService, listService, $scope, $stateParams, $state, allBoards, currentUser){


  // console.log('all boards');
  // console.log(allBoards);

  // console.log('current user');
  // console.log(currentUser);

  // boardService.populateBoards(allBoards);

  $scope.boards = boardService.getBoards(); 
  console.log('scope boards');
  console.log($scope.boards);

  $scope.currentBoard = boardService.getCurrentBoard();

  console.log( 'current board')
  console.log( $scope.currentBoard );
  
  if( $scope.currentBoard) {

    listService.populateboardLists($scope.currentBoard);
    $scope.lists = listService.getBoardLists();
    
    console.log( 'current lists');
    console.log($scope.lists);


    $scope.currentList = "";
    $scope.list_cards = {};

    $scope.board_title = "";

    $scope.list_title = "";
    $scope.list_board_id = $scope.currentBoard.id
   
    $scope.card_title = "";
    $scope.card_description = "";
  }

  $scope.refreshBoard = function(boardIndex) {
    boardService.refreshBoard(boardIndex);
    $scope.currentBoard = boardService.getCurrentBoard();
    $scope.lists = listService.getBoardLists();
  }

  $scope.selectBoard = function(boardObj) {
    $scope.refreshBoard(boardService.getIndexOfBoard(boardObj));
  }

  $scope.createBoard = function(boardValid) {

    var newBoard = {title: $scope.board_title, user_id: 1};
   
    if (boardValid) {
      boardService.create(newBoard).then( function() {
        console.log(' created ok');
        $scope.currentBoard = boardService.getCurrentBoard();
        console.log( 'current board')
        console.log( $scope.currentBoard );
        $scope.lists = listService.getBoardLists();
      });  
    }
  }

  $scope.deleteBoard = function(boardObj) {
    boardService.destroy(boardObj).then(function () {
      $scope.currentBoard = boardService.getCurrentBoard();
      $scope.lists = listService.getBoardLists();
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

  $scope.addList = function(listValid) {

    var newList = {title: $scope.list_title, 
                   board_id: $scope.currentBoard.id
                  };

    var index = $scope.boards.indexOf($scope.currentBoard);

    if (listValid) {
      Restangular.all('lists').post(newList).then(
        function(response)  {
          $scope.lists.push(response);
          listService.addList(response);
          $scope.refreshBoard(index);
        },
        function(response)  {
           alert("Could not add your list: " + list_title);
       });
    }
    $scope.list_title = "";
  }

  $scope.newCard = function(listObj) {
    //console.log("In Here");
    Restangular.all('users').getList().then(
      function(response)  {
          $scope.users = response;
          $scope.currentList = listObj;
          $state.go("board.card");
      }
    ); 
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

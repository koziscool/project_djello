
djelloApp.factory('boardService', ['Restangular', 'listService', function(Restangular,listService) {

    var obj = {};
    var currentBoard;
    var boards = {};
    var lists = {};
    var cards = {};

    // obj.index = [];

    obj.getIndex = function(){
        if (boards.length){
          return boards;
        }
        return Restangular.all("boards").getList().then(function(boardData){
          boardData.forEach( function(boardObj){
            boards[boardObj.id] = boardObj;
            currentBoard = boardObj;

            boardObj.lists.forEach( function(list){
              lists[list.id] = list;
                list.cards.forEach( function(card){
                  cards[card.id] = card;
                });
            });
          });
        });
    };

    obj.getBoards = function() {
       return boards;
    };

    obj.getLists = function() {
    }

    obj.addList = function( listObj ) {
        currentBoard.lists.push( listObj );
        // console.log('add list boardservice')
        // console.log( currentBoard );
        obj.createListToDB( listObj );
    };

    obj.createListToDB = function( listObj ) {
      console.log('trying to add to db');
      return Restangular.all("lists").post( listObj );
    };

    obj.addCard = function( cardObj ) {
        // console.log(cardObj)
        // console.log(lists);
        var currentList = lists[cardObj.list_id]
        currentList.cards.push( cardObj );
        // console.log('add list boardservice')
        // console.log( currentBoard );
        obj.createCardToDB( cardObj, currentList );
    };

    obj.createCardToDB = function( cardObj, currentList ) {
      console.log('trying to add to db');
      return Restangular.all("cards").post( cardObj ).then(
        function(response)  {
          console.log("Card was added")
        },
        function(response)  {
           alert("Could not add your card: " + cardObj.title + " to the list " + currentList.title);
       });
    };


    // obj.populateBoards = function(allBoards) {
    //    for (var i = 0; i < allBoards.length; i++) { 
    //      boards.push(allBoards[i]);
    //    }  
    //    currentBoard = allBoards[0];
    // }


    obj.getCurrentBoard = function() {
       return currentBoard;
    }

    // obj.getIndexOfBoard = function(boardObj) {
    //   return boards.indexOf(boardObj);
    // }

    obj.updateCurrentBoard = function( id ) {
        currentBoard = boards.id;
    }

    // obj.refreshBoard = function(boardIndex) {
    //   currentBoard = boards[boardIndex];
    //   console.log("In ref");
    //   console.log(currentBoard);
    //   listService.populateboardLists(currentBoard);
    // }

    obj.show = function( id ) {
      return Restangular.one( "boards", id).get();
    };

    obj.update = function( boardObj ){
      boardObj.put();
    };

    obj.create = function ( boardObj ) {
        return Restangular.all('boards').post(boardObj).then(
          function(response)  {
            console.log('new board obj');
            console.log(response);
            boards.unshift(response);
            obj.updateCurrentBoard( 0 );
            // obj.refreshBoard(0);
            console.log('all boards');
            console.log(boards);

        },
        function(response)  {
          alert("Could not add your board: " + boardObj.title);
       });
    };

    obj.destroy = function (boardObj) {
      return Restangular.one("boards", boardObj.id).remove();//.then(
    //     function(res)  {
    //       index = boards.indexOf(boardObj);
    //       boards.splice(index, 1);
    //       obj.refreshBoard(0);
    //     },
    //     function(res)  {
    //       alert("Could not delete your board: " + boardObj.title);
    //   }      
    // )
    };

    return obj;
}]);

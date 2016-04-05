
djelloApp.factory('dataService', ['Restangular', function(Restangular) {

    var obj = {};
    var _currentBoard;
    var _boards = {};
    var _lists = {};
    var _cards = {};

    obj.getIndex = function(){
        if (_boards.length){
          return _boards;
        }
        return Restangular.all("boards").getList().then(function(boardData){
          boardData.forEach( function(boardObj){
            _boards[boardObj.id] = boardObj;
            _currentBoard = boardObj;

            boardObj.lists.forEach( function(list){
              _lists[list.id] = list;
                list.cards.forEach( function(card){
                  _cards[card.id] = card;
                });
            });
          });
        });
    };

    obj.getBoards = function() {
       return _boards;
    };

    obj.getLists = function() {
    }

    obj.addList = function( listObj ) {
        _currentBoard.lists.push( listObj );
        _lists[listObj.id] = listObj;
        // console.log('add list boardservice')
        // console.log( _currentBoard );
        obj.createListToDB( listObj );
    };

    obj.createListToDB = function( listObj ) {
      console.log('trying to add to db');
      return Restangular.all("lists").post( listObj );
    };

    obj.addCard = function( cardObj ) {
        // console.log(cardObj)
        // console.log(lists);
        var currentList = _lists[cardObj.list_id]
        currentList.cards.push( cardObj );
        _cards[cardObj.id] = cardObj;
        // console.log('add list boardservice')
        // console.log( _currentBoard );
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
    //      _boards.push(allBoards[i]);
    //    }  
    //    _currentBoard = allBoards[0];
    // }


    obj.getCurrentBoard = function() {
       return _currentBoard;
    }

    // obj.getIndexOfBoard = function(boardObj) {
    //   return _boards.indexOf(boardObj);
    // }

    obj.updateCurrentBoard = function( id ) {
        _currentBoard = _boards.id;
    }

    // obj.refreshBoard = function(boardIndex) {
    //   _currentBoard = _boards[boardIndex];
    //   console.log("In ref");
    //   console.log(_currentBoard);
    //   listService.populateboardLists(_currentBoard);
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
            _boards.unshift(response);
            obj.updateCurrentBoard( 0 );
            // obj.refreshBoard(0);
            console.log('all boards');
            console.log(_boards);

        },
        function(response)  {
          alert("Could not add your board: " + boardObj.title);
       });
    };

    obj.destroy = function (boardObj) {
      return Restangular.one("boards", boardObj.id).remove();//.then(
    //     function(res)  {
    //       index = _boards.indexOf(boardObj);
    //       _boards.splice(index, 1);
    //       obj.refreshBoard(0);
    //     },
    //     function(res)  {
    //       alert("Could not delete your board: " + boardObj.title);
    //   }      
    // )
    };

    return obj;
}]);

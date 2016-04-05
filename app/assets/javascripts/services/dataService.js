
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
      console.log('trying to add to db');
      return Restangular.all("lists").post( listObj ).then(
          function(response)  {
            listObj.cards = [];
            listObj.id = response.id;
            console.log(listObj);
            _currentBoard.lists.push( listObj );
            _lists[listObj.id] = listObj;
        },
        function(response)  {
          alert("Could not add your list: " + listObj.title);
       });;
    };


    obj.deleteList = function( listObj ) {
        delete _lists[listObj.id];
        console.log(_currentBoard.lists.length);
        _currentBoard.lists = _currentBoard.lists.filter( function(listItem){
            return listItem.id !== listObj.id;
        });
        console.log(_currentBoard.lists.length);
        Restangular.one("lists", listObj.id).remove().then(
          function(res)  {
              console.log("Deleted your list: " + listObj.title);
          },
           function(res)  {
            alert("Could not delete your list: " + listObj.title);
          }
        )
    };


    obj.addCard = function( cardObj ) {
        var currentList = _lists[cardObj.list_id];
        currentList.cards.push( cardObj );
        _cards[cardObj.id] = cardObj;
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

    obj.deleteCard = function( cardObj ) {
        var currentList = _lists[cardObj.list_id];
        delete _cards[cardObj.id];
        console.log(currentList.cards.length);
        currentList.cards = currentList.cards.filter( function(cardItem){
            return cardItem.id !== cardObj.id;
        });
        console.log(currentList.cards.length); 

        Restangular.one("cards", cardObj.id).remove().then(
          function(res)  {
            console.log("Card deleted");
          },
          function(res)  {
            alert("Could not delete your card: " + cardObj.title);
          })
    };

    obj.getCurrentBoard = function() {
       return _currentBoard;
    }

    obj.updateCurrentBoard = function( id ) {
        _currentBoard = _boards[id];
    }

    obj.show = function( id ) {
      return Restangular.one( "boards", id).get();
    };

    obj.update = function( boardObj ){
      boardObj.put();
    };

    obj.addBoard = function ( boardObj ) {
        return Restangular.all('boards').post(boardObj).then(
          function(response)  {
            boardObj.id = response.id;
            boardObj.created_at = response.created_at;
            boardObj.updated_at = response.updated_at;
            boardObj.lists = [];
            _boards[response.id] = boardObj;

            obj.updateCurrentBoard( boardObj.id );
        },
        function(response)  {
          alert("Could not add your board: " + boardObj.title);
       });
    };

    obj.deleteBoard = function (boardObj) {
      delete _boards[boardObj.id];
      if( _currentBoard.id === boardObj.id){
        console.log('changing currentBoard');
        var keys = Object.keys( _boards );
        _currentBoard = _boards[keys[0]];
      }
      return Restangular.one("boards", boardObj.id).remove().then(
        function(response)  {
            console.log('deleted board ok')
        },
        function(res)  {
          alert("Could not delete your board: " + boardObj.title);
        }      
      );
    };

    return obj;
}]);


djelloApp.factory('boardService', ['Restangular', 'listService', function(Restangular,listService) {

    var obj = {};
    var currentBoard;
    var boards = [];

    // obj.index = [];

    obj.getIndex = function(){
        if (boards.length){
          return boards;
        }
        return Restangular.all("boards").getList().then(function(data){
          data.forEach( function(boardObj){
            boards.push( boardObj );
          });
         currentBoard = boards[0];
        });
    };

    obj.getBoards = function() {
       return boards;
    }


    // obj.populateBoards = function(allBoards) {
    //    for (var i = 0; i < allBoards.length; i++) { 
    //      boards.push(allBoards[i]);
    //    }  
    //    currentBoard = allBoards[0];
    // }


    obj.getCurrentBoard = function() {
       return currentBoard;
    }

    obj.getIndexOfBoard = function(boardObj) {
      return boards.indexOf(boardObj);
    }

    obj.refreshBoard = function(boardIndex) {
      currentBoard = boards[boardIndex];
      console.log("In ref");
      console.log(currentBoard);
      listService.populateboardLists(currentBoard);
    }

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
            obj.refreshBoard(0);
            console.log('all boards');
            console.log(boards);

        },
        function(response)  {
          alert("Could not add your board: " + boardObj.title);
       });
    };

    obj.destroy = function (boardObj) {
      return Restangular.one("boards/" + boardObj.id).remove().then(
        function(res)  {
          index = boards.indexOf(boardObj);
          boards.splice(index, 1);
          obj.refreshBoard(0);
        },
        function(res)  {
          alert("Could not delete your board: " + boardObj.title);
      }      
    )
    };

    return obj;
}]);

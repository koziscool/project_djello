
djelloApp.factory('listService', ['Restangular', function(Restangular){

    var obj = {};
    var currentList;
    var boardLists = [];

    obj.populateboardLists = function(boardObj){
      boardLists.splice(0,boardLists.length);
      for (var i = 0; i < boardObj.lists.length; i++) {
        boardLists.push(boardObj.lists[i]);
      }
    };

    obj.getBoardLists = function(){
      return boardLists;
    };

    obj.addList = function(list) {
      boardLists.push( list );
      console.log('oklahoma');
    };

    obj.createList = function(list) {

    };

    obj.removeList = function(list) {
      
    };

    return obj;
}]);

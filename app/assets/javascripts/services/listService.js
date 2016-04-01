
djelloApp.factory('listService', ['Restangular', function(Restangular){

    var obj = {};
    obj.boardlists;

    obj.populateboardLists = function(boardObj){
        obj.boardLists = boardObj.lists;
    };

    obj.getBoardLists= function(){
        return obj.boardLists;
    };

    return obj;
}]);

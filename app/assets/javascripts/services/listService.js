
djelloApp.factory('listService', ['Restangular', function(Restangular){

    var obj = {};
    obj.boardlists;

    obj.populateboardLists = function(boardObj){
        obj.boardLists = boardObj.lists;
    };

    obj.getBoardLists= function(){
        return obj.boardLists;
    };

    obj.show = function( id ) {
      return Restangular.one( "boards", id).get();
    };

    obj.update = function( boardObj ){
      boardObj.put();
    };

    obj.create = function ( boardObj ) {
      return Restangular.all( "boards").post( boardObj );
    };

    obj.destroy = function ( id ) {
        Restangular.one("boards", id).remove();
    };

    return obj;
}]);

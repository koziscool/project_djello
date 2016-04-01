
djelloApp.factory('boardService', ['Restangular', function(Restangular){

    var obj = {};
    obj.index = [];
    obj.getindex = function(){
        var idx = Restangular.all("boards").getList().then(function(data){
            obj.index = data;
        });
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
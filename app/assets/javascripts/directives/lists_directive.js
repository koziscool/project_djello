djelloApp.directive('showList', [ function() {
  // console.log('stock display directive');
  return def = {
    restrict: 'AE',
    scope: {
      list: '=',
      removeList: '&',
      addCard: '&',
      newCard: '&',
    },
    templateUrl: 'templates/directives/listLayout.html'
    link: function( scope ) {
      
    }
  };
}]);

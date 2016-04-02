djelloApp.directive('showList', [ function() {
  // console.log('stock display directive');
  return def = {
    restrict: 'AE',
    scope: {
      list: '=',
      removeList: '&',
      addCard: '&',
    },
    templateUrl: 'templates/directives/listLayout.html'
  };
}]);

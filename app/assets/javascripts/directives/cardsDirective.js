
djelloApp.directive('showCard', [ function() {
  // console.log('stock display directive');
  var def = {
    restrict: 'A',
    scope: {
      card: '=',
    },
    templateUrl: 'templates/directives/cardLayout.html',
  };
  return def;
}]);

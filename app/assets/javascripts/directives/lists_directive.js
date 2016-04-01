djelloApp.directive('showList', [ function() {
  // console.log('stock display directive');
  var def = {
    restrict: 'A',
    scope: {
      list: '=',
    },
    templateUrl: 'templates/directives/listLayout.html',
  };
  return def;
}]);

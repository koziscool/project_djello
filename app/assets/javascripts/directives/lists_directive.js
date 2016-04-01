list.directive('showList', [ function() {
  // console.log('stock display directive');
  var def = {
    restrict: 'A',
    scope: {
      pin: '=',
      flip: '&',
      delete: '&'
    },
    templateUrl: 'templates/directives/listLayout.html',
  };
  return def;
}]);

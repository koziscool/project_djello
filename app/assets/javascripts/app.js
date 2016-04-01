
var djelloApp = angular.module("djelloApp", ['ui.router', 'restangular'] )

.config(['$urlRouterProvider', '$stateProvider', 'RestangularProvider',
  function($urlRouterProvider, $stateProvider, RestangularProvider){

   RestangularProvider.setBaseUrl('/api/v1');
   RestangularProvider.setRequestSuffix('.json');
   RestangularProvider.setDefaultHttpFields({
       "content-type": "application/json"
   });

   $stateProvider
      .state('board', {
        url: '/board',
        templateUrl: '/templates/boardLayout.html',
        controller: 'BoardCtrl',
        resolve: {
          allBoards: ['Restangular', function(Restangular){
              return Restangular.all('boards').getList();
          }]
        }
      })
   //   .state('pins.index',{
   //     url: '',
   //     templateUrl: '/templates/pinsIndex.html',
   //     controller: 'pinsIndexCtrl',
   //     resolve: {
   //       pins: ['Restangular', function(Restangular){
   //         return Restangular.all('pins').getList().$object;
   //       }]
   //     }
   //   })
   //   .state('pins.show', {
   //     url: "/:id",
   //     templateUrl: '/templates/pinShow.html',
   //     params: {
   //      pinObj: null,
   //      id: null
   //    },
   //    controller: 'pinShowCtrl'
   //   })
   //   .state('pins.edit', {
   //     url: "/:id/edit",
   //     templateUrl: '/templates/pinEdit.html',
   //     params: {
   //      pinObj: null,
   //      id: null
   //    },
   //    controller: 'pinEditCtrl'
   //   })
   //   ;

     $urlRouterProvider.otherwise('/board');

 }]);

// .run(function($rootScope){
//  $rootScope.$on("$stateChangeError", console.log.bind(console));
// });
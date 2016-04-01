var djelloApp = angular.module("djelloApp", ['ui.router', 'ui.bootstrap', 'Devise'] )

.config(['$urlRouterProvider', '$stateProvider', 'RestangularProvider',
  function($urlRouterProvider, $stateProvider, RestangularProvider){

   AuthProvider.registerPath('path/on/server.json');
   AuthProvider.registerMethod('GET');
   AuthProvider.resourceName('user');

   RestangularProvider.setBaseUrl('/api/v1');
   RestangularProvider.setRequestSuffix('.json');
   RestangularProvider.setDefaultHttpFields({
       "content-type": "application/json"

   });

   // $stateProvider
   //    .state('pins', {
   //      url: '/pins',
   //      abstract: true,
   //      views: {
   //       '': {
   //          url: '',
   //          templateUrl: '/templates/pinsLayout.html'
   //        }
   //      }
   //    })
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

     $urlRouterProvider.otherwise('/pins');

 }]);

// .run(function($rootScope){
//  $rootScope.$on("$stateChangeError", console.log.bind(console));
// });
angular
  .module('demineoApp')
  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.when('/missions', {
          template: '<mission-list></mission-list>'
        })
        .when('/missions/:missionId', {
          template: '<mission-detail></mission-detail>'
        })
        .otherwise('/missions');
    }
]);

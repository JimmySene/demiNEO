angular
  .module('core.mission')
  .factory('Mission', ['$resource',
    function($resource) {
      return $resource('../missions:missionId', {}, {
        query: {
          method: 'GET',
          headers: {"Content-Type":"application/json; charset=utf-8"},
          isArray: true
          // timeout: 500
        },
        get: {
          method: 'GET',
          headers: {"Content-Type":"application/json; charset=utf-8"},
          isArray: true
        },
        update: {
          method: 'PUT',
          headers: {"Content-Type":"application/json; charset=utf-8"}
        }
      })
    }
])

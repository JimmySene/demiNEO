angular
  .module('core.agent')
  .factory('Agent', ['$resource',
    function($resource) {
      return $resource('../agents', {}, {
        query: {
          method: 'GET',
          headers: {"Content-Type":"application/json; charset=utf-8"},
          isArray: true
        }
      })
    }
])

'use strict';

(function() {

  angular.module('trombiApp')
    .controller('HomeController', ['$scope', '$state', 'Contributors',
    function($scope, $state, Contributors) {

      $scope.home = {
        logTo: function(type) {
          $state.go('login', {type: type});
        }
      };

      $scope.contributors = Contributors.owner;

    }]);

})();
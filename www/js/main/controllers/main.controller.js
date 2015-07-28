'use strict';

(function() {

  angular.module('trombiApp')
    .controller('MainController', ['$scope', '$timeout', 'Contributors',
    function($scope, $timeout, Contributors) {

      $scope.main = {
        
      };

      $scope.contributors = Contributors.owner;

    }]);

})();
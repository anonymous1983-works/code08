'use strict';

(function() {

  angular.module('trombiApp')
    .controller('MainController', ['$scope', '$timeout', '$filter', 'Contributors',
    function($scope, $timeout, $filter, Contributors) {

      var orderBy = $filter('orderBy');

      $scope.main = {};

      $scope.contributors = orderBy(Contributors.owner, 'firstname', false);

    }]);

})();
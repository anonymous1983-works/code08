'use strict';

(function() {

  angular.module('trombiApp')
    .controller('ListController', ['$scope', 'ContributorOwners',
      function($scope, ContributorOwners) {

        $scope.main = {};

        $scope.contributors = ContributorOwners;
        $scope.even = (ContributorOwners.length + 4) % 4;

      }]);

})();
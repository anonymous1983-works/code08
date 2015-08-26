'use strict';

(function() {

  angular.module('trombiApp')
    .controller('DetailController', ['$scope', '$timeout', '$filter', 'ContributorOwner',
      function($scope, $timeout, $filter, ContributorOwner) {

        $scope.main = {
          searchVisible: false,
          searchIcon: false,

          // Search
          search: function() {
            return true;
          }
        };

        $scope.contributor = ContributorOwner[0];

      }]);

})();
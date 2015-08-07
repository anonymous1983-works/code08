'use strict';

(function() {

  angular.module('trombiApp')
    .controller('ListController', ['$scope', '$timeout', '$filter', 'ContributorOwners',
      function($scope, $timeout, $filter, ContributorOwners) {

        var orderBy = $filter('orderBy');

        $scope.main = {
          searchVisible: false,
          searchIcon: false,

          // Search
          search: function() {
            return true;
          }
        };

        //ContributorProvider.getContributorOwners();

        $scope.contributors = orderBy(ContributorOwners, 'firstname', false);



      }]);

})();
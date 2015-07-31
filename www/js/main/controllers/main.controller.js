'use strict';

(function() {

  angular.module('trombiApp')
    .controller('MainController', ['$scope', '$timeout', '$filter', 'ContributorOwners',
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

      //var x = ContributorProvider.getContributorOwners();

      var x = ContributorOwners;

      $scope.contributors = orderBy(x, 'firstname', false);



    }]);

})();
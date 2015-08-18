'use strict';

(function () {

  angular.module('trombiApp')
    .controller('MainController', ['$scope', '$state', '$timeout', '$filter', '$stateParams',
      function ($scope, $state, $timeout, $filter, $stateParams) {

        var orderBy = $filter('orderBy');

        $scope.main = {
          searchVisible: false,
          searchIcon: false,
          searchInput: ($stateParams.q === '') ? '' : $stateParams.q,
          // Search
          search: function () {
            $state.go('main.listContributors', {
              q: $scope.main.searchInput
            }, {reload: true});
            return true;
          }
        };


      }]);

})();
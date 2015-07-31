'use strict';

(function () {

  angular.module('trombiApp')
    .provider('Contributor', [
      function () {

        this.contributorOwners = function ($http, $q) {

          var defer = $q.defer();
          var parms = {
            method: "GET",
            url: 'http://localhost:3000/owners'
          };
          $http(parms)
            .success(function (data) {
              // this callback will be called asynchronously
              // when the response is available
              return defer.resolve(data);
            });

          return defer.promise;

        };

        this.$get = function ($http, $q) {

          return {
            getContributorOwners: this.contributorOwners($http, $q)
          };

        };

      }
    ]);

})();
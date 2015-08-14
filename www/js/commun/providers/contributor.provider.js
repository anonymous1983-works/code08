'use strict';

(function () {

  angular.module('trombiApp')
    .service('ContributorFactory', ['$http', '$q', '$filter', 'TrombiConfig',
      function ($http, $q, $filter, TrombiConfig) {

        var cf = {

          contributorOwners: function () {

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

          },

          contributorOwnersByGroup: function () {

            var defer = $q.defer();
            var parms = {
              method: "GET",
              url: 'http://localhost:3000/owners'
            };
            $http(parms)
              .success(function (data) {
                // this callback will be called asynchronously
                // when the response is available
                var qData = [], temp = [], nbrGrpups = 0, g = 1;


                data = $filter('orderBy')(data, 'lastname', false);

                nbrGrpups = Math.round(data.length / TrombiConfig.nbrOfUserOfPage);

                angular.forEach(data, function (value, key) {
                  temp.push(value);
                  if ((key + 1) % 12 === 0 && g != nbrGrpups) {
                    qData.push(temp);
                    temp = [];
                    g++;
                  } else {
                    if (g === nbrGrpups && key === (data.length - 1)) {
                      qData.push(temp);
                    }
                  }
                });
                return defer.resolve(qData);
              });

            return defer.promise;

          },
          contributorOwner: function (contributorId) {

            var defer = $q.defer();
            var parms = {
              method: "GET",
              url: 'http://localhost:3000/owners/?rpid=' + contributorId
            };
            $http(parms)
              .success(function (data) {
                // this callback will be called asynchronously
                // when the response is available

                return defer.resolve(data);
              });

            return defer.promise;

          }

        };

        return {
          getContributorOwners: cf.contributorOwners,
          contributorOwnersByGroup: cf.contributorOwnersByGroup,
          contributorOwner: cf.contributorOwner
        };

      }
    ]);

})();
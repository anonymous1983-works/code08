'use strict';

(function () {

  angular.module('trombiApp')
    .service('ContributorFactory', ['$http', '$q',
      function ($http, $q) {

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
                var qData = [], temp = [], i = 1;

                angular.forEach(data, function (value) {
                  temp.push(value);
                  if (i % 12 === 0) {
                    qData.push(temp);
                    i = 0;
                    temp = [];
                  }
                  i++;
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


        this.currentContributorId = '';


        return {
          getContributorOwners: cf.contributorOwners,
          contributorOwnersByGroup: cf.contributorOwnersByGroup,
          contributorOwner: cf.contributorOwner
        };

      }
    ]);

})();
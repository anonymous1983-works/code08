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


        this.contributorOwnersGroupe = function ($http, $q) {

          var defer = $q.defer();
          var parms = {
            method: "GET",
            url: 'http://localhost:3000/owners'
          };
          $http(parms)
            .success(function (data) {
              // this callback will be called asynchronously
              // when the response is available

              console.log(data);

              var qdata = [], temp = [];

              var i = 1;

              angular.forEach(data, function(value) {
                temp.push(value);
                if(i % 12 === 0){
                  qdata.push(temp);
                  i = 0;
                  temp = [];
                }
                i++;
              });


              return defer.resolve(qdata);
            });

          return defer.promise;

        };

        this.$get = function ($http, $q) {

          return {
            getContributorOwners: this.contributorOwners($http, $q),
            contributorOwnersGroupe: this.contributorOwnersGroupe($http, $q)
          };

        };

      }
    ]);

})();
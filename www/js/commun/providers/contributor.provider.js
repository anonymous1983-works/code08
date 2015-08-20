'use strict';

(function () {

  angular.module('trombiApp')
    .service('ContributorFactory', ['$http', '$q', '$filter', 'TrombiConfig', 'TrombiRest', '$indexedDB', '$sessionStorage',
      function ($http, $q, $filter, TrombiConfig, TrombiRest, $indexedDB, $sessionStorage) {

        var cf = {

          contributorOwners: function () {

            var defer = $q.defer();
            var parms = {
              method: TrombiRest.request.contributor.all.method,
              url: TrombiRest.baseUrl + TrombiRest.request.contributor.all.url
            };
            $http(parms)
              .success(function (data) {
                // this callback will be called asynchronously
                // when the response is available

                return defer.resolve(data);
              });

            return defer.promise;

          },

          contributorOwnersByGroup: function (q) {

            var defer = $q.defer();
            var qData = [];
            var parms = {
              method: TrombiRest.request.contributor.all.method,
              url: TrombiRest.baseUrl + TrombiRest.request.contributor.all.url
            };

            if ($sessionStorage.indexedDB) {
              // this code will be execute
              // when the indexedDB persist

              $indexedDB.openStore('contributor', function (store) {
                store.getAll().then(function (data) {
                  store.closeDatabase;
                  qData = cf.dataSort(data, q); //sort data
                  return defer.resolve(qData);

                });
              });

            } else {

              $http(parms)
                .success(function (data) {
                  // this callback will be called asynchronously
                  // when the response is available

                  $indexedDB.openStore('contributor', function (store) {

                    angular.forEach(data, function (value) {
                      store.insert({
                        "rpid": value.rpid,
                        "uid": value.uid,
                        "login": value.login,
                        "title": value.title,
                        "firstname": value.firstname,
                        "lastname": value.lastname,
                        "phone": value.phone,
                        "internal_phone": value.internal_phone,
                        "department": value.department,
                        "office_name": value.office_name,
                        "localisation": value.localisation,
                        "position": value.position,
                        "url1": value.url1,
                        "url2": value.url2
                      }).then(function (e) {
                        console.log(e);
                      });
                    });

                    $sessionStorage.indexedDB = true; // The sessionStorage.indexdDb prove the indexedDB is persist

                  });

                  qData = cf.dataSort(data, q);

                  return defer.resolve(qData);
                });
            }

            return defer.promise;

          },

          dataSort: function (data, q) {

            var qData = [], temp = [], nbrGrpups = 0, g = 1;

            data = $filter('filter')(data, {'lastname': q});

            data = $filter('orderBy')(data, 'lastname', false);

            nbrGrpups = Math.round(data.length / TrombiConfig.nbrOfUserOfPage) ? Math.round(data.length / TrombiConfig.nbrOfUserOfPage) : 1;

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

            return qData;
          }

          ,

          contributorOwner: function (contributorId) {

            var defer = $q.defer();
            var parms = {
              method: TrombiRest.request.contributor.byId.method,
              url: TrombiRest.baseUrl + TrombiRest.request.contributor.byId.url + contributorId
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
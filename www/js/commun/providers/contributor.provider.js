'use strict';

(function () {

  angular.module('trombiApp')
    .service('ContributorFactory', ['$http', '$q', '$filter', 'TrombiConfig', 'TrombiRest', '$indexedDB', '$sessionStorage', 'CotributorModelService',
      function ($http, $q, $filter, TrombiConfig, TrombiRest, $indexedDB, $sessionStorage, CotributorModelService) {

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

              // Test if browser support the indexedDB
              if (window.indexedDB) {
                // If supported then get all data indexedDB in contributor model
                $indexedDB.openStore('contributor', function (store) {
                  store.getAll().then(function (data) {
                    store.closeDatabase;
                    qData = cf.dataSort(data, q); //sort data
                    return defer.resolve(qData);

                  });
                });
              } else {
                console.log('IndexedDB not supported ');
              }

            } else {
              $http(parms)
                .success(function (data) {
                  // this callback will be called asynchronously
                  // when the response is available

                  // Test if browser support the indexedDB
                  if (window.indexedDB) {
                    // If supported then add data to your indexedDB
                    // and set sessionStorage to true

                    CotributorModelService.add(data, function () {
                      $sessionStorage.indexedDB = true; // The sessionStorage.indexdDb prove the indexedDB is persist
                    });

                  }

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
          },

          contributorOwner: function (contributorId) {

            var defer = $q.defer();
            var parms = {
              method: TrombiRest.request.contributor.byId.method,
              url: TrombiRest.baseUrl + TrombiRest.request.contributor.byId.url + contributorId
            };

            // Test if browser support the indexedDB
            if (window.indexedDB) {
              // If supported then get all data indexedDB in contributor model

              CotributorModelService.findbyIndex('rpid_id', contributorId, function (data) {
                return defer.resolve(data);
                //return defer.resolve(data);
              });

            } else {
              $http(parms)
                .success(function (data) {
                  // this callback will be called asynchronously
                  // when the response is available
                  return defer.resolve(data);
                });
            }

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
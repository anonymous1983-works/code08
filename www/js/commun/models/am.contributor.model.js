'use strict';

(function () {

  angular.module('trombiApp')
    .config(['TrombiConfig', '$indexedDBProvider', function (TrombiConfig, $indexedDBProvider) {
      $indexedDBProvider
        .connection(TrombiConfig.indexedDb.name)
        .upgradeDatabase(TrombiConfig.indexedDb.version, function (event, db, tx) {
          var objStore = db.createObjectStore('contributor', {keyPath: 'rpid'});
          objStore.createIndex('rpid_id', 'rpid', {unique: false});
          objStore.createIndex('firstname_id', 'firstname', {unique: false});
          objStore.createIndex('lastname_id', 'lastname', {unique: false});
        });
    }])
    .service('CotributorModelService', ['$indexedDB', CotributorModelService]);

  function CotributorModelService ($indexedDB) {

    this.add = function (data, callback) {

      // Test if browser support the indexedDB
      if (window.indexedDB) {
        angular.forEach(data, function (value) {

          $indexedDB.openStore('contributor', function (store) {

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

        });

        if (callback && typeof(callback) === "function") {
          callback();
        }

      }

    };

    this.findbyIndex = function(index, value, callback){

      // Test if browser support the indexedDB
      if (window.indexedDB) {

        /*$indexedDB.openStore('contributor', function (store) {
          store.findWhere(store.query().$index(index).$eq(value)).then(function (data) {
            store.closeDatabase;
            callback(data);
          });
        });*/

        if (callback && typeof(callback) === "function") {
          callback();
        }

      }

    }

  }

})();
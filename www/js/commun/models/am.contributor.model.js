'use strict';

(function () {

  angular.module('trombiApp')
    .config(['TrombiConfig', '$indexedDBProvider', function (TrombiConfig, $indexedDBProvider) {
      $indexedDBProvider
        .connection(TrombiConfig.indexedDb.name)
        .upgradeDatabase(TrombiConfig.indexedDb.version, function (event, db, tx) {
          var objStore = db.createObjectStore('contributor', {keyPath: 'rpid'});
          objStore.createIndex('firstname_id', 'firstname', {unique: false});
          objStore.createIndex('lastname_id', 'lastname', {unique: false});
        });
    }]);
})();
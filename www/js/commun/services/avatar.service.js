'use strict';

(function () {

  angular.module('trombiApp')
    .service('AvatarService', ['TrombiPaths',
      function (TrombiPaths) {

        var as = {
          getRandomAvatar: function (title) {

            var avatar = {};

            if (title === 'men') {
              avatar = TrombiPaths.legoUsers.men[Math.floor(Math.random() * TrombiPaths.legoUsers.men.length)];
            } else {
              avatar = TrombiPaths.legoUsers.women[Math.floor(Math.random() * TrombiPaths.legoUsers.women.length)];
            }

            return avatar;
          }
        };

        return {
          getRandomAvatar: as.getRandomAvatar
        };
      }
    ]);

})();
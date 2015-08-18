/**
 * Created by abid on 31/07/2015.
 */

(function () {

  angular.module('trombiApp')
    .constant('TrombiPaths', {
      baseUrl: 'http://localhost:9000/',
      legoUsers: {
        men: [
          {
            url: "img/avatar/default/m.png"
          },
          {
            url: "img/avatar/default/m-1.png"
          },
          {
            url: "img/avatar/default/m-2.png"
          },
          {
            url: "img/avatar/default/m-6.png"
          },
          {
            url: "img/avatar/default/m-12.png"
          },
          {
            url: "img/avatar/default/m-18.png"
          }
        ],
        women: [
          {
            url: "img/avatar/default/mme-1.png"
          },
          {
            url: "img/avatar/default/mme.png"
          },
          {
            url: "img/avatar/default/mme-13.png"
          }
        ]
      }
    });

  angular.module('trombiApp')
    .constant('TrombiRest', {
      //baseUrl: 'http://trombi.intramundi.com/',
      baseUrl: 'http://localhost:3000/',
      request: {
        contributor: {
          all: {
            method: 'GET',
            //url: 'contributors.json'
            url: 'owners'
          },
          byId:{
            method: 'GET',
            url: 'owners/?rpid='
          }
        }
      }

    });

  angular.module('trombiApp')
    .constant('TrombiConfig', {
      nbrOfUserOfPage: 12
    });

})();

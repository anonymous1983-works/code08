'use strict';

(function () {

  angular.module('trombiApp')
    .directive('amCard', [function () {

      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/main/templates/card.html',

        scope: {
          data: '='
        },
        link: function (scope, elem) {

          var avatar = elem.children(1);
          console.log(avatar);
          avatar.css({backgroundImage: 'url(' + scope.data.url1 + ')'});

          //var elem = elem.children('.avatar');


        }
      };

    }]);

})();
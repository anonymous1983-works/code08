'use strict';

(function () {

  angular.module('trombiApp')
    .directive('amCard', ['$http', function ($http) {

      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/main/templates/card.html',

        scope: {
          data: '='
        },
        link: function (scope, elem) {

          var avatar = angular.element(elem[0].querySelectorAll('.avatar')[0]);

          // preload image
          var img = new Image();
          img.src = scope.data.url1;

          var unbind = function () {
            angular.element(img).off();
          };


          angular.element(img).on('load', function () {
            avatar.css({
              backgroundImage: 'url(' + scope.data.url1 + ')'
            });
            unbind();
          });

          angular.element(img).on('error', function () {
            errorImg();
            unbind();
          });

          var errorImg = function () {

            return true;
          };

          //var avatar = angular.element(elem[0].querySelectorAll('.avatar')[0]);

          //avatar.css({backgroundImage: 'url(' + scope.data.url1 + ')'});

          //var elem = elem.children('.avatar');


        }
      };

    }]);

})();
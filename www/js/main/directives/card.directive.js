'use strict';

(function () {

  angular.module('trombiApp')
    .directive('amCard', ['$http', 'TrombiPaths', 'TrombiConfig', 'AvatarService', function ($http, TrombiPaths, TrombiConfig, AvatarService) {

      return {
        restrict: 'E',
        replace: true,
        multiElement: true,
        transclude: true,
        templateUrl: 'js/main/templates/card.html',

        scope: {
          data: '=',
          index: '='
        },
        link: function (scope, elem) {

          scope.pagebreakafter = scope.index % TrombiConfig.nbrOfUserOfPage;
          scope.bgposition = ( scope.index / 12 ) * 584;

          var avatar = angular.element(elem[0].querySelectorAll('.avatar')[0]);
          var values_list = angular.element(elem[0].querySelectorAll('.values_list')[0]);

          // preload image
          var img = new Image();
          img.src = scope.data.url1;

          var unbind = function () {
            angular.element(img).off();
          };

          angular.element(img).on('load', function () {
            setAvatar(scope.data.url1);
            unbind();
          });

          angular.element(img).on('error', function () {
            errorImg();
            unbind();
          });

          var errorImg = function () {
            if (scope.data.title === 'M.') {
              setAvatar(TrombiPaths.baseUrl + AvatarService.getRandomAvatar('men').url);
            } else {
              setAvatar(TrombiPaths.baseUrl + AvatarService.getRandomAvatar('women').url);
            }
            return true;
          };

          var setAvatar = function(url){
            avatar.css({
              backgroundImage: 'url(' + url + ')'
            });
            avatar.find('img')[0].src = url;
          }


        }
      };

    }]);

})();
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
        }
      };

    }]);

})();
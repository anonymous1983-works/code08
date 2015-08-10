'use strict';

(function () {

  angular.module('trombiApp')
    .directive('amCardDetail', function () {

      return {
        restrict: 'E',
        replace: true,
        multiElement: true,
        transclude: true,
        templateUrl: 'js/main/templates/card-detail.html',

        scope: {
          data: '='
        },
        link: function (scope, elem) {

          scope.user = {
            _title: 'Hi, My name is',
            _value: scope.data.firstname + ' ' + scope.data.lastname
          };

          scope.toggleDetailUser = function (t, v) {
            return scope.user = {
              _title: t,
              _value: v
            }
          };

          scope.getEmail = function () {
            var email = scope.data.firstname + '.' + scope.data.lastname + '@amundi.com';
            var reg = new RegExp(" ", "g");
            email = email.toLowerCase().replace(reg, '');
            return email;
          };


          var avatar = angular.element(elem[0].querySelectorAll('.avatar')[0]);
          var values_list = angular.element(elem[0].querySelectorAll('.values_list')[0]).find('li');

          //var list_li = values_list.find('li');


          console.log(values_list);

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

        }

      }

    });

})();

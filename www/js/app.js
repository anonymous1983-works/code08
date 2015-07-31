'use strict';

(function() {

  angular.module('trombiApp', [
    'ui.router'
  ])

  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', '$compileProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $compileProvider) {

    $stateProvider

      .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'js/home/templates/home.html'
      })
      .state('main', {
        abstract: true,
        url: '/main',
        controller: 'MainController',
        templateUrl: 'js/main/templates/main.html',
        resolve:{
          ContributorOwners: ['Contributor', function (ContributorProvider) {
            return ContributorProvider.getContributorOwners;
          }]
        }
      })
        .state('main.list', {
          url: '/list',
          views: {
            'viewPageContainerHeader': {
              templateUrl: 'js/main/templates/header.html'
            },
            
            'viewPageContainerBodyCenter': {
              templateUrl: 'js/main/templates/body.html'
            }

          }
        })

    ;
    $urlRouterProvider.otherwise('/home');

    $locationProvider.html5Mode(false);
    $compileProvider.debugInfoEnabled(false);
  }])

  .run();

})();
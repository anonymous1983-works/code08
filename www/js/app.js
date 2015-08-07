'use strict';

(function () {

  angular.module('trombiApp', [
    'ui.router'
  ])

    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', '$compileProvider',
      function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $compileProvider) {

        $stateProvider

          .state('home', {
            url: '/home',
            controller: 'HomeController',
            templateUrl: 'js/home/templates/home.html'
          })
          .state('main', {
            abstract: true,
            url: '/main',
            templateUrl: 'js/main/templates/main.html'

          })
          .state('main.listContributors', {
            url: '/contributors',
            views: {
              'viewPageContainerHeader': {
                templateUrl: 'js/main/templates/header.html'
              },

              'viewPageContainerBodyCenter': {
                controller: 'ListController',
                resolve: {
                  ContributorOwners: ['ContributorFactory', function (ContributorFactory) {
                    return ContributorFactory.contributorOwnersByGroup();
                  }]
                },
                templateUrl: 'js/main/templates/body/list.body.html'
              }
            }
          })

          .state('main.detailContributor', {
            url: '/contributor/:contributorId',
            views: {
              'viewPageContainerHeader': {
                templateUrl: 'js/main/templates/header.html'
              },

              'viewPageContainerBodyCenter': {
                controller: 'DetailController',
                resolve: {
                  ContributorOwner: ['$stateParams', 'ContributorFactory', function ($stateParams, ContributorFactory) {
                    return ContributorFactory.contributorOwner($stateParams.contributorId);
                  }]
                },
                templateUrl: 'js/main/templates/body/detail.body.html'
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
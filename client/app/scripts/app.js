'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngResource',
    'ngRoute',
    'restangular'
  ])
  .config(function ($routeProvider,RestangularProvider) {

    RestangularProvider.setBaseUrl('https://localhost:3000');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl',
        controllerAs: 'movies'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).factory('MovieResangular',function(Restangular){
      return Restangular.withConfig(function(RestangularConfigure){
        id='_id'
      });

  }).factory('Movie',function(MovieRestangular){
    return MovieRestangular.service('movie');
  });

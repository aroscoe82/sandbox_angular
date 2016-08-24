'use strict';

angular
.module('membersApp.membersView', ['ui.router', 'ui.bootstrap'])
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/membersApp/members/partials/_base.html',
    controller: 'membersViewController'
  });

  $urlRouterProvider.otherwise('/');
})
.controller('membersViewController', function($http, $scope, filterFilter){

  $scope.list = [];
  $scope.pageSize = 5;
  
  $scope.init = function () {
    $http.get('app/membersApp/members/data/MOCK_DATA.json').success(function (data) {
      $scope.list = data;

      $scope.$watch('search', function (term) {
        // var obj = { first_name: term };

        // $scope.filterList = filterFilter($scope.list, obj);
        $scope.filterList = filterFilter($scope.list, term);
        $scope.currentPage = 1;
      });
    });
  };
})
.filter('start', function () {
  return function (input, start) {
    if (!input || !input.length) { return; }
    
    start = +start;
    return input.slice(start);
  };
});
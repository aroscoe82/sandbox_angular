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
.controller('membersViewController', function($http, $scope, filterFilter, $filter){

  $scope.list = [];
  $scope.pageSize = 25;
  $scope.sort = {       
    sortingOrder : 'email',
    reverse : false
  };

  // testing defined status
  $scope.setSomething = function(){
    $scope.sort = {       
      sortingOrder : 'first_name',
      reverse : true
    };
    $scope.setPage = 2;
    $scope.search = 'car';
  };
  
  $scope.init = function () {
    $http.get('app/membersApp/members/data/MOCK_DATA.json').success(function (data) {
      $scope.list = data;

      $scope.$watch('search', function (term) {
        $scope.filterList= $scope.list.filter(function(row){
          return (
            angular.lowercase(row.email).indexOf(angular.lowercase($scope.search) || '') !== -1 ||
            angular.lowercase(row.first_name).indexOf(angular.lowercase($scope.search) || '') !== -1 || 
            angular.lowercase(row.last_name).indexOf(angular.lowercase($scope.search) || '') !== -1);
        });
        $scope.currentPage = $scope.search ? $scope.setPage : 1;
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
})
.directive("customSort", function() {
return {
    restrict: 'A',
    transclude: true,    
    scope: {
      order: '=',
      sort: '='
    },
    template : 
      ' <div ng-click="sort_by(order)" style="color: #555555; cursor: pointer;">'+
      '    <span ng-transclude></span>'+
      '    <i ng-class="selectedCls(order)"></i>'+
      '</div>',
    link: function(scope) {
    // change sorting order
    scope.sort_by = function(newSortingOrder) {   
        var sort = scope.sort;
        
        if (sort.sortingOrder == newSortingOrder){
            sort.reverse = !sort.reverse;
        }                    

        sort.sortingOrder = newSortingOrder;        
    };
    
   
    scope.selectedCls = function(column) {
        if(column == scope.sort.sortingOrder){
            return ('fa fa-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
        }
        else{            
            return'fa fa-sort' 
        } 
    };      
  }// end link
}
});
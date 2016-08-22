'use strict';

angular
.module('membersApp.membersView', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/membersApp/members/partials/_base.html',
    controller: 'membersViewController'
  });

  $urlRouterProvider.otherwise('/');
})
.controller('membersViewController',[ '$http', '$scope', 'webtest', '$filter', function($http, $scope, webtest, $filter){

  $scope.sort = {       
    sortingOrder : 'id',
    reverse : false
  };

  $scope.gap = 5;

  $scope.filteredItems = [];
  $scope.groupedItems = [];
  $scope.itemsPerPage = 25;
  $scope.pagedItems = [];
  $scope.currentPage = 0;

  // load sample data from service
  $http.get('app/membersApp/members/data/MOCK_DATA.json').success(function (data) {
    $scope.items = data;
  });

  var searchMatch = function (haystack, needle) {
    if (!needle) {
      return true;
    }
    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
  };

  // init the filtered items
  $scope.search = function () {
      
      // $scope.filteredItems = $filter('filter')($scope.items, function (item) {
      //     for(var attr in item) {
      //         if (searchMatch(item[attr], $scope.query))
      //             return true;
      //     }
      //     return false;
      // });

      $http.get('app/membersApp/members/data/MOCK_DATA.json').success(function (data) {
        $scope.filteredItems = data;

        $scope.filteredItems = $filter('filter')($scope.items, function (item) {
          for(var attr in item) {
            if (searchMatch(item[attr], $scope.query))
              return true;
          }
          return false;
        });

        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }

        $scope.currentPage = 0;
        $scope.groupToPages();
      });

      // take care of the sorting order
      // if ($scope.sort.sortingOrder !== '') {
      //     $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
      // }
      // $scope.currentPage = 0;
      // now group by pages
      // $scope.groupToPages();
  };
    
  
    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];
        
        // for (var i = 0; i < $scope.filteredItems.length; i++) {
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.items[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.items[i]);
            }
        }
    };
    
    $scope.range = function (size,start, end) {
        var ret = [];        
        // console.log(size,start, end);
                      
        if (size < end) {
            end = size;
            start = size-$scope.gap;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }        
         // console.log(ret);        
        return ret;
    };
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    $scope.search();

}])
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
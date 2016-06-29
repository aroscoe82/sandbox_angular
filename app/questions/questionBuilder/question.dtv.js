angular
.module('questionsApp.questionBuilder')
.directive('slider', function () {
  return {
    restrict: 'EA',
    scope: {
      images: '=images',
      group: '=group',
      quest: '&',
    },
    controller: function ($scope) {
      $scope.group = $scope.group || 1;
      $scope.currentIndex = 0;
      $scope.direction = 'left';

      var init = function () {
        var images = [];
        var source = [];

        angular.copy($scope.images, source);

        for (var i = 0; i < source.length; i + $scope.group) {
          if (source[i]) {
            images.push(source.splice(i, $scope.group));
          }
        }
        $scope.setCurrent(0);
        $scope.slides = images;
        $scope.selected = '';
      };

      $scope.$watch('group', init);


      $scope.setCurrent = function (index) {
        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
        $scope.currentIndex = index;
      };

      $scope.isCurrent = function (index) {
        return $scope.currentIndex === index;
      };

      $scope.next = function () {
        $scope.direction = 'left';
        $scope.currentIndex = $scope.currentIndex < $scope.slides.length-1 ? ++$scope.currentIndex : 0;
      };

      $scope.prev = function () {
        $scope.direction = 'right';
        $scope.currentIndex = $scope.currentIndex > 0 ? --$scope.currentIndex : $scope.slides.length-1;
      };

      $scope.selectItem = function(item) {
        $scope.selected = item;
      };
    },
    templateUrl: "app/questions/questionBuilder/partials/questionSlider.html",
    //    template: '<div class="slides group-{{group}}"><div ng-repeat="slide in slides"><div ng-show="isCurrent($index)" class="slide slide-animation"><div ng-repeat="item in slide" class="image"><img ng-src="{{item.image}}" /></div></div></div><div class="controls"><div class="navigation"><a ng-click="prev()" class="prev">< Prev</a><a ng-click="next()" class="next">Next ></a></div><ul class="pagination"><li ng-repeat="slide in slides" ng-click="setCurrent($index)"><span>{{$index+1}}</span></li></ul></div></div>',
    link: function (scope, element, attrs) {
      scope.$watch('currentIndex', function (value, previousValue) {
        // console.log(value, previousValue);
      });
    }
  };
})
.directive('questionBuilder', function () {
  return {
    restrict: 'A',
    templateUrl: '/../app/questions/questionBuilder/partials/form.html',
    scope: {
      group: '=group'
    }
  }
  // return {
  //   // controller: function($scope){
  //           // $scope.save = function(){
  //           //     alert('save me..');
  //           //     $scope.group.submitted = true;
  //           // }

  //           // $scope.cancel = function(){
  //           //     alert('cancel me..');
  //           // }
  //         // },
  //         templateUrl: '/../app/questions/questionBuilder/partials/form.html',
  //         restrict: 'A',
  //         scope: {
  //           group:'='
  //         }
  //       };
      })
.directive('fieldDirective', function($http, $compile) {

  var getTemplateUrl = function(field) {
    var type = field.question_type;
    var templateUrl = '/../app/questions/questionBuilder/partials/questions/';
    var supported_questions = [
    'textbox',
    'radio',
    // 'radio_grid',
    'dropdown',
    // 'dropdown_grid',
    'checkboxes',
    'essay'
    // 'number',
    // 'slider',
    // 'slider_list',
    // 'likert_scale',
    // 'nps',
    // 'drag_drop_ranking',
    // 'ranking_grid'
    ]

    if (__indexOf.call(supported_questions, type) >= 0) {
      return templateUrl += type + '.html';
    }
  }

  var linker = function(scope, element) {
        // GET template content from path
        var templateUrl = getTemplateUrl(scope.field);
        $http.get(templateUrl).success(function(data) {
            element.html(data);
            $compile(element.contents())(scope);
        });
    }

    return {
        template: '<div ng-bind="field"></div>',
        restrict: 'EA',
        scope: {
            field: '='
        },
        link: linker
    };
  });
angular
.module('questionsApp.questionBuilder')
.directive('addNewQuestion', function($compile){
  return function(scope, element, attrs){
    element.bind("click", function(){
      scope.count++;
      angular.element(document.getElementById('newQuestion')).append($compile("<div question-builder></div>")(scope));
    });
  };
})
.directive('dynamicTemplate', function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      question: '=question'
    },
    template: '<div><div ng-include="var"></div></div>',
    controller: function($scope){
      var path = 'app/questions/questionBuilder/partials/questions/';
      // $scope.var = path + 'template1.html';
      $scope.var = path + $scope.question.question_type + '.' + $scope.question.question_view + '.html';
      $scope.change = function(where, view){
        $scope.question.question_view = view;
        $scope.var = path + where + '.' + view + '.html';
      };
    }
  };
})
.directive('questionSlider', function (QuestionService) {
  return {
    restrict: 'EA',
    scope: {
      images: '=images',
      group: '=group',
      buildquestion: '&'
    },
    controller: function ($scope, QuestionService) {
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
    templateUrl: '/../app/questions/questionBuilder/partials/questionBuilder.html',
    // scope: {
    //   newQuestion: '=newQuestion'
    // },
    controller: function ($scope) {
      // $scope.sortableOptions = {
      //   placeholder: 'ui-state-highlight'
      // };

      // add new option to the field
      $scope.addOption = function (question){
        if(!question.question_options)
          question.question_options = new Array();

        var lastOptionID = 0;

        if(question.question_options[question.question_options.length-1])
          lastOptionID = question.question_options[question.question_options.length-1].option_id;

        // new option's id
        var option_id = lastOptionID + 1;

        var newOption = {
          "option_id" : option_id,
          "option_title" : "Option " + option_id,
          "option_value" : option_id
        };

        // put new option into field_options array
        question.question_options.push(newOption);
      };

      // deletes particular question on button click
      $scope.deleteQuestion = function (question_id){
        for(var i = 0; i < $scope.group.group_questions.length; i++){
          if($scope.group.group_questions[i].question_id == question_id){
            $scope.group.group_questions.splice(i, 1);
            break;
          }
        }
      }

      // delete particular option
      $scope.deleteOption = function (question, option){
        for(var i = 0; i < question.question_options.length; i++){
          if(question.question_options[i].option_id == option.option_id){
            question.question_options.splice(i, 1);
            break;
          }
        }
      };

      $scope.showAddOptions = function (type){
        if(type == "radio" || type == "dropdown"){
          return true;
        }
        else{
          return false;
        }
      };
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
.directive('questionDirective', function($http, $compile) {

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
    ];

    if (__indexOf.call(supported_questions, type) >= 0) {
      return templateUrl += type + '.preview.html';
    }
  }

  var linker = function(scope, element) {
        // GET template content from path
        var templateUrl = getTemplateUrl(scope.question);
        $http.get(templateUrl).success(function(data) {
            element.html(data);
            $compile(element.contents())(scope);
        });
    }

    return {
        template: '<div ng-bind="question"></div>',
        restrict: 'EA',
        scope: {
            question: '='
        },
        link: linker
    };
  });
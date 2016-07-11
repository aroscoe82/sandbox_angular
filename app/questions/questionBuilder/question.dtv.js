angular
.module('questionsApp.questionBuilder')
// .directive('addNewQuestion', function($compile){
//   // injects directive for new question
//   return function(scope, element, attrs){
//     element.bind("click", function(){
//       // console.log("addNewQuestion");
//       scope.count++;
//       angular.element(document.getElementById('newQuestion')).append($compile("<div question-builder></div>")(scope));
//     });
//   };
// })
.directive('questionTemplate', function(){
  // question view : based on question_type and question_view changes template
  return {
    restrict: 'A',
    replace: true,
    scope: {
      question: '=question',
      // buildquestion: '&',
      savequestion: '&'
    },
    template: '<div><div ng-include="var"></div></div>',
    controller: function($scope){

      switch($scope.question.question_view){
        case 'create':
        var path = 'app/questions/questionBuilder/partials/';
        $scope.var = path + 'questionBuilder.html';
        break;
        default:
        var path = 'app/questions/questionBuilder/partials/questions/';
        $scope.var = path + $scope.question.question_type + '.' + $scope.question.question_view + '.html';
        break;
      };

      // $scope.var = path + 'template1.html';
      // $scope.var = path + $scope.question.question_type + '.' + $scope.question.question_view + '.html';

      $scope.change = function(where, view){
        $scope.question.question_view = view;
        var path = 'app/questions/questionBuilder/partials/questions/';
        $scope.var = path + where + '.' + view + '.html';
      };
      
      $scope.saveQuestion = function(question){
        console.log("save question");
        $scope.question.question_view = 'preview';
        var path = 'app/questions/questionBuilder/partials/questions/';
        $scope.var = path + question.question_type + '.' + 'preview' + '.html';
      };

      // create new question button click
      $scope.buildQuestion = function(item){
        // var newQuestion = {
        //   "question_id" : $scope.question.question_id,
        //   "question_title" : "Question Text",
        //   "question_type" : item.name,
        //   "question_value" : "",
        //   "question_required" : true,
        //   "question_disabled" : false,
        //   "question_view": 'create'
        // };

        // Amanda - need to know what values should be reset when swtiching between question types

        $scope.question.question_type = item.name;
        $scope.question.question_value = "";
        $scope.question.question_required = true;
        $scope.question.question_disabled = false;
      };
    }
  };
})
.directive('questionSlider', function (QuestionService, $compile) {
  // slider for question types
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

        // angular.copy($scope.images, source);
        angular.copy(QuestionService.fields, source);

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
.directive('createQuestion', function ($http, $templateCache, $compile) {
  return {    
   scope: {
    question: '=question',
    savequestion: '&'
  },
  restrict: 'A',
  link: function (scope, element, attrs) {
    var templateUrl = '/../app/questions/questionBuilder/partials/questions/';

    scope.$watch('question.question_type', function (newVal, oldVal) {
      if (newVal) {
        // console.log('question_type changed to ' + newVal);
        $http.get(templateUrl + newVal + '.edit.html').success(function(data) {
          element.html(data);
          $compile(element.contents())(scope);
        });
      }
    }, true);

    // scope.save = function(){
    //   console.log("save called");
    //   console.log("question: " + scope.question);
      // scope.saveQuestion({question: scope.question});
    // };
  },
  // controller: function ($scope){
  //   $scope.save = function(question){
  //     console.log("another save");
  //   };
  // }
};
})
// .directive('questionBuilder', function () {
//   return {
//     restrict: 'A',
//     templateUrl: '/../app/questions/questionBuilder/partials/questionBuilder.html',
//     // scope: {
//     //   newQuestion: '=newQuestion'
//     // },
//     controller: function ($scope) {
//       // $scope.sortableOptions = {
//       //   handle: '> .myHandle',
//       //   placeholder: 'ui-state-highlight'
//       // };

//       // add new option to the field
//       $scope.addOption = function (question){
//         if(!question.question_options)
//           question.question_options = new Array();

//         var lastOptionID = 0;

//         if(question.question_options[question.question_options.length-1])
//           lastOptionID = question.question_options[question.question_options.length-1].option_id;

//         // new option's id
//         var option_id = lastOptionID + 1;

//         var newOption = {
//           "option_id" : option_id,
//           "option_title" : "Option " + option_id,
//           "option_value" : option_id
//         };

//         // put new option into field_options array
//         question.question_options.push(newOption);
//       };

//       // deletes particular question on button click
//       $scope.deleteQuestion = function (question_id){
//         for(var i = 0; i < $scope.group.group_questions.length; i++){
//           if($scope.group.group_questions[i].question_id == question_id){
//             $scope.group.group_questions.splice(i, 1);
//             break;
//           }
//         }
//       }

//       // delete particular option
//       $scope.deleteOption = function (question, option){
//         for(var i = 0; i < question.question_options.length; i++){
//           if(question.question_options[i].option_id == option.option_id){
//             question.question_options.splice(i, 1);
//             break;
//           }
//         }
//       };

//       $scope.showAddOptions = function (type){
//         if(type == "radio" || type == "dropdown"){
//           return true;
//         }
//         else{
//           return false;
//         }
//       };
//     }
//   }
// });
.directive('questionDirective', function($http, $compile) {
  // preview question
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
        restrict: 'A',
        scope: {
          question: '=question'
        },
        link: linker
      };
    });
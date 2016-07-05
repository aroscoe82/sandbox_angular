var __indexOf = [].indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (i in this && this[i] === item) return i;
  }
  return -1;
};

angular
.module('questionsApp.questionBuilder', ['ui.router', 'ui.sortable'])
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/questions/questionBuilder/partials/builder_base.html',
    controller: 'questionGroupController'
  });

  $urlRouterProvider.otherwise('/');
})
.controller('questionGroupController',[ '$scope', 'QuestionService', function($scope, QuestionService){

  $scope.sortableOptions = {
    handle: '.myHandle',
    placeholder: 'ui-state-highlight',
    forcePlaceholderSize: true,
    opacity: 0.95,
    sort: function(event, ui) { ui.helper.addClass('ui-state-moveing'); }
  };

  // new form
  $scope.group = {};
  $scope.group.group_id = 1;
  $scope.group.group_name = 'Question Sandbox';
  $scope.group.group_questions = [];
  $scope.questionlastAddedID = 0;
  
  $scope.questionTypes = QuestionService.fields;

  $scope.addNewQuestion = function(location, position){
    // console.log("addNewQuestion clicked");
    // alert("not working yet");
    $scope.questionlastAddedID++;
    var defaultQuestion = {
      "question_id" : $scope.questionlastAddedID,
      "question_title" : "Question - " + ($scope.questionlastAddedID),
      "question_type" : $scope.questionTypes[0].name,
      "question_value" : "",
      "question_required" : true,
      "question_disabled" : false,
      "question_view" : 'preview',
    };

    switch(location){
      case 'top':
        $scope.group.group_questions.splice(0, 0, defaultQuestion)
        break;
      case 'mid':
        $scope.group.group_questions.splice(position, 0, defaultQuestion)
        break;
      default:
        $scope.group.group_questions.push(defaultQuestion);
        break;
    };
  };

    // create new question button click
  $scope.buildQuestion = function(item){
    var newField = {
      "question_id" : $scope.questionlastAddedID,
      "question_title" : "Question Text",
      "question_type" : item.name,
      "question_value" : "",
      "question_required" : true,
      "question_disabled" : false,
      "question_view": 'edit'
    };

    $scope.newQuestion = newField;
  };

  $scope.saveNewQuestion = function(item){
    $scope.questionlastAddedID++;
    item.question_id = $scope.questionlastAddedID;
    item.question_view = 'preview';
    $scope.group.group_questions.push(item);

    $scope.newQuestion = '';
    $scope.showQuestionBuilder = false;
  };

}]);
// .controller('questionBuilderController',[ '$scope', 'QuestionService', function($scope, QuestionService){

//   // $scope.questionTypes = QuestionService.fields;

//   $scope.addField = {};
//   $scope.addField.types = QuestionService.fields;
//   // $scope.addField.new = $scope.addField.types[0].name;
//   $scope.addField.lastAddedID = 0;

//   // create new question button click
//   $scope.buildQuestion = function(item){

//     // $scope.addField.lastAddedID++;
//     // var newField = {
//     //   "question_id" : $scope.addField.lastAddedID,
//     //   "question_title" : "Question - " + ($scope.addField.lastAddedID),
//     //   "question_type" : item.name,
//     //   "question_value" : "",
//     //   "question_required" : true,
//     //   "question_disabled" : false
//     // };

//     // $scope.newQuestion = newField;
//   };
// }]);
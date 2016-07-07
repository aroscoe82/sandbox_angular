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
    opacity: 0.95
  };

  // new form
  $scope.group = {};
  $scope.group.group_id = 1;
  $scope.group.group_name = 'Question Sandbox';
  $scope.group.group_questions = [];
  $scope.questionlastAddedID = 0;
  
  $scope.questionTypes = QuestionService.fields;

  $scope.addNewQuestion = function(location, position, view){
    $scope.questionlastAddedID++;
    var defaultQuestion = {
      "question_id" : $scope.questionlastAddedID,
      "question_title" : "Question - " + ($scope.questionlastAddedID),
      // "question_type" : $scope.questionTypes[0].name,
      // "question_value" : "",
      // "question_required" : true,
      // "question_disabled" : false,
      "question_view" : view,
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

  $scope.saveNewQuestion = function(newQuestion){
    console.log('newQuestion: ' + newQuestion);

    // $scope.questionlastAddedID++;
    // newQuestion.question_id = $scope.questionlastAddedID;
    // newQuestion.question_view = 'preview';
    // $scope.group.group_questions.push(item);

    // $scope.newQuestion = '';
    // $scope.showQuestionBuilder = false;
  };

}]);
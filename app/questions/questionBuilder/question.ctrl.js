var __indexOf = [].indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (i in this && this[i] === item) return i;
  }
  return -1;
};

angular
.module('questionsApp.questionBuilder', ['ui.router', 'ui.sortable', 'questionsApp.config', 'questionsApp.core'])
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/questions/questionBuilder/partials/builder_base.html',
    controller: 'questionGroupController'
  });

  $urlRouterProvider.otherwise('/');
})
.controller('questionGroupController',[ '$scope', 'QuestionService', 'QuestionGroupItemPost', 'questionGroup', function($scope, QuestionService, QuestionGroupItemPost, questionGroup){

  $scope.sortableOptions = {
    handle: '.myHandle',
    placeholder: 'ui-state-highlight',
    forcePlaceholderSize: true,
    opacity: 0.95
  };

  // new form
  $scope.group = {};
  $scope.group.group_id = questionGroup.getId();
  $scope.group.group_name = 'Question Sandbox';
  $scope.group.group_questions = [];
  $scope.questionlastAddedID = -1;
  
  $scope.questionTypes = QuestionService.fields;

  $scope.addNewQuestion = function(location, position, view){
    $scope.questionlastAddedID++;
    var defaultQuestion = {
      "question_id" : $scope.questionlastAddedID,
      "text" : "Question - " + ($scope.questionlastAddedID),
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

    $scope.save = function(question){
      var questionItem = new QuestionGroupItemPost(question);
      questionItem.$save(
        function(data) {
          $scope.questionlastAddedID = data.index;
          console.log("save in controller: " , data);

        }
      );
    };

    $scope.remove = function(question){
      console.log('remove question: ' , question);

      for(var i = 0; i < $scope.group.group_questions.length; i++){
        if($scope.group.group_questions[i].question_id == question.question_id){
          $scope.group.group_questions.splice(i, 1);
          console.log('Removed');
          break;
        }
      }
    };
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
  };

  // $scope.saveNewQuestion = function(newQuestion){
  //   console.log('newQuestion: ' + newQuestion);

    // $scope.questionlastAddedID++;
    // newQuestion.question_id = $scope.questionlastAddedID;
    // newQuestion.question_view = 'preview';
    // $scope.group.group_questions.push(item);

    // $scope.newQuestion = '';
    // $scope.showQuestionBuilder = false;
  // };

}]);
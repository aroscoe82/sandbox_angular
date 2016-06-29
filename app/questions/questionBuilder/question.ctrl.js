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
    controller: 'questionBuilderController'
  });

  $urlRouterProvider.otherwise('/');
})
.controller('questionBuilderController',[ '$scope', 'QuestionService', function($scope, QuestionService){
  
  $scope.sortableOptions = {
    placeholder: 'ui-state-highlight'
  };

  $scope.questionTypes = QuestionService.fields;

  // new form
  $scope.group = {};
  $scope.group.group_id = 1;
  $scope.group.group_name = 'Question Sandbox';
  $scope.group.group_questions = [];

  $scope.addField = {};
  $scope.addField.types = QuestionService.fields;
  // $scope.addField.new = $scope.addField.types[0].name;
  $scope.addField.lastAddedID = 0;

  // create new question button click
  $scope.addQuestion = function(itm){
    $scope.addField.lastAddedID++;
    var newField = {
      "question_id" : $scope.addField.lastAddedID,
      "question_title" : "Question - " + ($scope.addField.lastAddedID),
      "question_type" : itm.name,
      "question_value" : "",
      "question_required" : true,
      "question_disabled" : false
    };

    $scope.group.group_questions.push(newField);
  };

  this.dropCallback = function(event, ui, title, $index) {
    console.log("dropped");
  };

  // $scope.deleteQuestion = function(){
  //   console.log("testing");
  // };

  // // add new option to the question
  //   $scope.addOption = function (question){
  //       if(!question.question_options)
  //           question.question_options = new Array();

  //       var lastOptionID = 0;

  //       if(question.question_options[question.question_options.length-1])
  //           lastOptionID = question.question_options[question.question_options.length-1].option_id;

  //       // new option's id
  //       var option_id = lastOptionID + 1;

  //       var newOption = {
  //           "option_id" : option_id,
  //           "option_title" : "Option " + option_id,
  //           "option_value" : option_id
  //       };

  //       // put new option into field_options array
  //       question.question_options.push(newOption);
  //   }

    // decides whether field options block will be shown (true for dropdown and radio fields)
    $scope.showAddOptions = function (type){
        if(type == "radio" || type == "dropdown"){
          console.log('failure');
            return true;
        }
        else{
          console.log('failure');
            return false;
        }
    };

}]);
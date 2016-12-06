'use strict';

angular
.module('videoApp.wizard', ['ui.router', 'ui.bootstrap'])
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('wizard', {
    // abstract: true,
    url: '/wizard',
    views: {
      '@': {
        templateUrl: 'app/video_nowApp/video_now/partials/wizard.html',
        controller: 'wizardViewController'
      },
      'videoUpload@wizard': {
        templateUrl: 'app/video_nowApp/video_now/partials/_videoUpload.html',
        controller: 'stepController'
      },
      'attachFile@wizard': {
        templateUrl: 'app/video_nowApp/video_now/partials/_attachFile.html',
        controller: 'stepController'
      },
      'description@wizard': {
        templateUrl: 'app/video_nowApp/video_now/partials/_description.html',
        controller: 'stepController'
      }
    }
  });

  $urlRouterProvider.otherwise('/wizard');
})
.controller('wizardViewController', function($http, $scope, $state){

  $scope.steps = [
    {
      name: "videoUpload",
      desc: "Video Upload",
      completed: false,
      required: true,
    },
    {
      name: "attachFile",
      desc: "Attach File",
      completed: false,
      required: false,
    },
    {
      name: "description",
      desc: "Add Description",
      completed: false,
      required: true
    }
  ];

  $scope.activeState = $scope.steps.leftOffAt ? $scope.steps.leftOffAt : $scope.steps[0];

  $scope.changeMe = function(step){
    $scope.activeState = step;
  };

})
.controller('stepController', function($scope){

  $scope.tinymceOptions = {
      menubar: false,
      plugins: 'link hr code',
      toolbar: 'undo redo | formatselect bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | hr code'
    };

  $scope.save = function(idx){
    // save step
    // modify complete status
    $scope.$parent.$parent.steps[idx].completed = true;
    // move to next step
    $scope.$parent.$parent.activeState = $scope.$parent.$parent.steps[idx+1];
  };
});
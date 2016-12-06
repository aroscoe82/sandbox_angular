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
.filter('bytes', function() {
  return function(bytes, precision) {
    if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
    if (typeof precision === 'undefined') precision = 1;
    var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
    number = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
  }
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

  $scope.changeMe = function(idx){
    // if I've completed the step I can navigate to it
    if($scope.steps[idx].completed){
      $scope.activeState = $scope.steps[idx];  
    }
  };

})
.controller('stepController', function($scope){

  $scope.tinymceOptions = {
      menubar: false,
      plugins: 'link hr code',
      toolbar: 'undo redo | formatselect bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | hr code'
    };

  $scope.video_max = 100;
  $scope.progressPercentage = 42;

  $scope.save = function(idx){
    // save step
    // modify complete status
    $scope.$parent.$parent.steps[idx].completed = true;
    // move to next step
    $scope.$parent.$parent.activeState = $scope.$parent.$parent.steps[idx+1];
  };
});
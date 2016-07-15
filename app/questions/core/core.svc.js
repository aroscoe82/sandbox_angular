'use strict';

angular.module('questionsApp.core')
  .service('questionGroup', function() {
    var _questionGroupId;

    this.getId = function() {
      return _questionGroupId;
    };

    this.setId = function(id) {
      _questionGroupId = id;
    };
  });

angular.module('questionsApp.core')
  .factory('QuestionGroupItemPost', function($resource, questionConfig, questionGroup) {
    return $resource(questionConfig.apiURL + 'questionGroups/:id/items', {id: questionGroup.getId()}, {});
    // return $resource('http://sled.local'+questionConfig.apiURL + 'questionGroups/:id/items', {id: questionGroup.getId()}, {});
  });





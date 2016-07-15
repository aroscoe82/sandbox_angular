'use strict';

angular
  .module('questionsApp', [
    'ui.router',
    'questionsApp.config',
    'questionsApp.core',
    'questionsApp.questionBuilder'
  ])
  .run(function(questionGroup) {
    questionGroup.setId('hardcoded question id here');
  })
  .factory('securityTokenInjector', function($injector, questionConfig) {
    return {
      request: function(config) {
        config.headers['X-CU-Security'] = 'hardcoded security token here';
        config.headers['Authorization']='hardcoded session key here';
        return config;
      }
    };
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('securityTokenInjector');
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    // disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
  })
  .directive('ngReallyClick', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('click', function() {
          var message = attrs.ngReallyMessage;
          if (message && confirm(message)) {
            scope.$apply(attrs.ngReallyClick);
          }
        });
      }
    }
  })
  .filter('termReplace', function() {
    return function(input, replaceObject, uppercase) {
      var out = input;
      if (input && replaceObject){
        input = input || '';
        // replace is an object
        for ( var property in replaceObject ) {
          out = out.replace('{{'+property+'}}',replaceObject[property]);
        }
        // conditional based on optional argument
        if (uppercase) {
          out = out.toUpperCase();
        }

      }
      return out;
    };
  })
  .directive('cachedTemplate', function ($templateCache) {
    "use strict";
    return {
      restrict: 'A',
      terminal: true,
      compile: function (element, attr) {
        if (attr.type === 'text/ng-template') {
          var templateUrl = attr.cachedTemplate,
              text = element.html();
          $templateCache.put(templateUrl, text);
        }
      }
    };
  });

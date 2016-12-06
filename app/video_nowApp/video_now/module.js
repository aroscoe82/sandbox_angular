'use strict';

angular
  .module('videoApp.wizard', ['ui.router', 'ngResource'])
  .config([ '$provide', function($provide) {
    //reference https://github.com/angular-ui/ui-tinymce/pull/59
    $provide.decorator('uiTinymceDirective', ['$delegate', function($delegate) {
        $delegate[0].priority = 1;
        return $delegate;
    }]);
  }]);


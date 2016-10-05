angular.module('templates-modal', ['modal/templates/basic.html', 'modal/templates/profile.html']);

angular.module("modal/templates/basic.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modal/templates/basic.html",
    "<div class=\"modal-header\">\n" +
    "  <h3>{{modalOptions.headerText}}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div ng-bind-html=\"modalOptions.bodyText | trust\"></div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn\" \n" +
    "  data-ng-click=\"modalOptions.close()\">{{modalOptions.closeButtonText}}</button>\n" +
    "  <button class=\"btn btn-primary\" \n" +
    "  data-ng-click=\"modalOptions.ok();\">{{modalOptions.actionButtonText}}</button>\n" +
    "</div>");
}]);

angular.module("modal/templates/profile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modal/templates/profile.html",
    "<div class=\"modal-header\">\n" +
    "  <img src=\"http://placehold.it/350x150\" style=\"width: 100px; height: auto;\">\n" +
    "  <h3>{{modalOptions.headerText}}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div ng-bind-html=\"modalOptions.bodyText | trust\"></div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn\" \n" +
    "  data-ng-click=\"modalOptions.close()\">{{modalOptions.closeButtonText}}</button>\n" +
    "  <button class=\"btn btn-primary\" \n" +
    "  data-ng-click=\"modalOptions.ok();\">{{modalOptions.actionButtonText}}</button>\n" +
    "</div>");
}]);

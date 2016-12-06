angular.module('templates-modal', ['modal/templates/basic.html', 'modal/templates/email.html', 'modal/templates/profile.html']);

angular.module("modal/templates/basic.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modal/templates/basic.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-ng-click=\"modalOptions.close()\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "  <h3 class=\"modal-title\">{{modalOptions.headerText}}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div ng-bind-html=\"modalOptions.bodyText | trust\"></div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-primary\" data-ng-click=\"modalOptions.ok();\">{{modalOptions.actionButtonText}}</button>\n" +
    "</div>");
}]);

angular.module("modal/templates/email.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modal/templates/email.html",
    "<div class=\"modal-header\">\n" +
    "  <h3>{{modalOptions.headerText}}</h3>\n" +
    "</div>\n" +
    "    <input type=\"text\" ng-model=\"modalOptions.email.heading\">\n" +
    "    <textarea ng-model=\"modalOptions.email.body\"></textarea>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn\" \n" +
    "  data-ng-click=\"modalOptions.close()\">{{modalOptions.closeButtonText}}</button>\n" +
    "  <button class=\"btn btn-primary\" \n" +
    "  data-ng-click=\"modalOptions.ok(modalOptions.email);\">{{modalOptions.actionButtonText}}</button>\n" +
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

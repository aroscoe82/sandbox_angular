'use strict';

angular
  .module('testingApp', ['core.modal'])
  .controller('testingCtrl', function($scope, modalService){

    $scope.testProfile = function () {

        var custName = 'Sample Customer';

        var modalDefaults = {
          templateUrl: 'modal/templates/profile.html'
        };

        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Testing Customer',
            headerText: 'Testing ' + custName + '?',
            bodyText: 'Are you sure you want to test this customer?'
        };

        modalService.showModal(modalDefaults, modalOptions).then(function (result) {
            // dataService.deleteCustomer($scope.customer.id).then(function () {
            //     $location.path('/customers');
            // }, processError);
            console.log('testing');
        });
    };

    $scope.testBasic = function () {

        var header = 'Basic Modal';
        var body = '<ul><li>Test 1</li><li>Test 2</li></ul>';

        var modalDefaults = {
          templateUrl: 'modal/templates/basic.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'Ok',
            headerText: header,
            bodyText: body
        };

        modalService.showModal(modalDefaults, modalOptions).then(function (result) {
            // dataService.deleteCustomer($scope.customer.id).then(function () {
            //     $location.path('/customers');
            // }, processError);
            console.log('testing');
        });
    }

  });
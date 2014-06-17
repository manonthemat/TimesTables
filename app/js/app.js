'use strict';

angular.module('timesTables', [
  'timesTables.controllers',
]);

angular.module('timesTables.controllers', []).controller('mainCtrl', ['$scope', function($scope) {
  //$scope.factorlist = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  $scope.factorlist = [2, 3];

  function locationOf(element, array, start, end) {
    start = start || 0;
    end = end || array.length;
    var pivot = parseInt(start + (end - start) / 2, 10);
    if (end-start <= 1 || array[pivot] === element) return pivot;
    if (array[pivot] < element) {
      return locationOf(element, array, pivot, end);
    } else {
      return locationOf(element, array, start, pivot);
    }
  };

  $scope.addtolist = function(x) {
    x = parseInt(x);
    // check if x is not in $scope.factorlist
    if ($scope.factorlist.indexOf(x) == -1) {
      $scope.factorlist.splice(locationOf(x, $scope.factorlist) + 1, 0, x);
    }
  };

  $scope.removefromlist = function(x) {
    x = parseInt(x);
    // check if x is in $scope.factorlist
    if ($scope.factorlist.indexOf(x) != -1) {
      // if yes, remove it
      $scope.factorlist.splice($scope.factorlist.indexOf(x), 1);
    }
  };

  $scope.inlist = function(x) {
    x = parseInt(x);
    if ($scope.factorlist.indexOf(x) == -1) {
      return false;
    } else {
      return true;
    }
  };

  var selectRandomFactor = function() {
    return Math.floor(Math.random() * $scope.factorlist.length) + 1;
  };

  var selectFactorFromList = function() {
    var x = Math.floor(Math.random() * $scope.factorlist.length);
    return $scope.factorlist[x];
  };

  var newMultiplication = function() {
    $scope.factor1 = selectRandomFactor();
    $scope.factor2 = selectFactorFromList();
    $scope.result = $scope.factor1 * $scope.factor2;
  };

  $scope.checkUserProduct = function() {
    if ($scope.product == $scope.result) {
      $scope.msg = false;
      $scope.product = '';
      newMultiplication();
    } else {
      $scope.msg = true;
    }
  };

  newMultiplication();
}]);

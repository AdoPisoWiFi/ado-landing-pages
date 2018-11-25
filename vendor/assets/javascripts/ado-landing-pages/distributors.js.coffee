@App = angular.module 'AdoDistributors', []

@App.controller 'DistributorsCtrl', [
  '$scope'
  ($scope) ->
    $scope.distributors = window.DISTRIBUTORS
]

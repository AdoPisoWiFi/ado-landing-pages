
window.DISTRIBUTOR_PAGE_LOADED = false;

angular.module('AdoDistributors', []).controller('DistributorsCtrl', [
  '$scope',
  function ($scope) {
    $scope.distributors = window.DISTRIBUTORS;
  }
]);

$(document).ready(function () {

  var el = document.getElementById("distributors");

  if (!window.DISTRIBUTOR_PAGE_LOADED && el)
    angular.bootstrap(el, ["AdoDistributors"]);

  window.DISTRIBUTOR_PAGE_LOADED = true;

});

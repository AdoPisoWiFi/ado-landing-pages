
window.DISTRIBUTOR_PAGE_LOADED = false; 

angular.module('AdoDistributors', []).controller('DistributorsCtrl', [
  '$scope',
  function ($scope) {
    $scope.distributors = window.DISTRIBUTORS;
  }
]);

$(document).on('turbolinks:load', function () {

  console.log("PAGE_LOADED? ", window.DISTRIBUTOR_PAGE_LOADED);

  if (!window.DISTRIBUTOR_PAGE_LOADED)
    angular.bootstrap(window.document.body, ["AdoDistributors"]);

  window.DISTRIBUTOR_PAGE_LOADED = true;

});

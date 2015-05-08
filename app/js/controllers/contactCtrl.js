four51.app.controller('ContactCtrl', ['$rootScope', '$routeParams', '$sce', '$scope', '$451', 'Category', 'Product', 'Nav',
function ($rootScope, $routeParams, $sce, $scope, $451, Category, Product, Nav) {

	$scope.reveal = function(divid) {
      var elements = document.getElementsByClassName('answer');
      if(elements)
      {
      	elements.css('display', 'none');
      }
      var element = document.getElementById(divid);
      var elementanswer = element.getElementsByClassName("answer");
      if(elementanswer)
      {
      	elementanswer.css('display','block');
      }
    };
}]);
'use strict';

/* Controllers */
var controllers = angular.module('catalogo.controllers');

controllers.controller('ProdutosCtrl', function ProdutosCtrl($scope, $http, AlertService) {
	$scope.fase = $scope.$parent.ngModel;
	$scope.produtos = [];
	$scope.resultadoProdutos = [];
	$scope.produtoAdd = {};
	
	carregarProdutosRelacionados();
	
	$http.get('api/produto').success(function(data) {
		$scope.resultadoProdutos = data;
	});
	
	$scope.adicionarProduto = function(p){		
		$http({
			url : 'api/fase/produto',
			method : "POST",
			data : {fase: {id:$scope.fase.id}, produto: {id: p.id}},
			headers : {
				'Content-Type' : 'application/json;charset=utf8'
			}
		}).success(function(data) {
			AlertService.addWithTimeout('success','Produto relacionado ');
			carregarProdutosRelacionados();
		}).error( function(data, status) {
			console.log(data);
			AlertService.addWithTimeout('danger','Não foi possível relacionar o produto');
		});		
	};	
	
	function carregarProdutosRelacionados(){
		$http.get('api/fase/produto/' + $scope.fase.id).success(function(data) {
			$scope.produtos = data;
		});
	}
	
	$scope.removerProduto = function(id) {
		$http({
			url : 'api/fase/produto/' + id,
			method : "DELETE"
		}).success(function(data) {
			carregarProdutos();
		}).error(function(data, status) {
			AlertService.addWithTimeout('danger','Não foi possível remover o produto.');
		});
	};	

});

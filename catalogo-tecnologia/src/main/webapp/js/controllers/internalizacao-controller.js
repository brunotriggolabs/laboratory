'use strict';

/* Controllers */
var controllers = angular.module('catalogo.controllers');


controllers.controller('InternalizacaoCtrl', function InternalizacaoCtrl($scope, $rootScope, $http,$location, $routeParams, AlertService, OrigemDemandaService, ValidationService) {

	$(window).scrollTop(0);
	
	$scope.fase = {};
	$scope.fase.id = $routeParams.id;
	$scope.fase.fase = 3;
	$scope.origemDemanda = [];
	
	console.log(OrigemDemandaService.getItens());
	
	OrigemDemandaService.getItens().then(function(data) {
		$scope.origemDemanda = data;
	});

	if ($scope.fase.id) {
		$http.get('api/internalizacao/' + $scope.fase.id).success(function(data) {
			$scope.fase = data;
			$scope.fase.faseAnterior = {
					id: 				data.faseAnterior.id, 
					fase: 				data.faseAnterior.fase, 
					origemReferencia: 	data.faseAnterior.origemReferencia,
					codigoReferencia: 	data.faseAnterior.codigoReferencia
			};
		}).error( function(data, status) {
			AlertService.addWithTimeout('danger','Não foi possível encontrar o registro');
			history.back();
		});
	} else {
		AlertService.addWithTimeout('danger','Não foi possível encontrar a prospecção');
		history.back();
	}
		
	$scope.salvar = function(finalizar) {
		var url = 'api/internalizacao';
		if(finalizar) url = url+"/finalizar";
		ValidationService.clear();
		$http({
			url : url,
			method : $scope.fase.id ? "PUT" : "POST",
			data : $scope.fase,
			headers : {
				'Content-Type' : 'application/json;charset=utf8'
			}
		}).success(function(data) {
			if(finalizar){
				AlertService.addWithTimeout('success','Internalização finalizada com sucesso');
			}else{
				AlertService.addWithTimeout('success','Internalização salva com sucesso');
			}
			$location.path('/pesquisa/fases/3');
		}).error( function(data, status) {
			console.log(data);
			if (status = 412) {
				ValidationService.registrarViolacoes(data);
			}
		});

	};

	$scope.aprovar = function(aprovado) {
		$scope.fase.situacao = aprovado ? 'Aprovado' : 'Reprovado';
	};
	
	$scope.finalizar = function() {
		$scope.salvar(true);
	};
	

});
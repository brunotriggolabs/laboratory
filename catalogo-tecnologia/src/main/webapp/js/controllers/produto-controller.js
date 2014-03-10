'use strict';

/* Controllers */
var controllers = angular.module('catalogo.controllers');

controllers.controller('ProdutoList',
		function Produto($scope, $http, $location, AlertService) {
			
			function carregarProdutos() {
				$http.get('api/produto').success(function(data) {
					$scope.produtos = data;
				});
			}

			$scope.novoProduto = function() {
				$location.path('/produto/edit');
			};

			$scope.editarProduto = function(produto) {
				$location.path('/produto/edit/' + produto.id);
			};

			$scope.excluirProduto = function(id) {
				$http({
					url : 'api/produto/' + id,
					method : "DELETE"

				}).success(function(data) {
					carregarProdutos();

				}).error(function(data, status) {
					AlertService.addWithTimeout('danger','Não foi possível executar a operação');
					console.log('vai vltar...');
				});
			};

			carregarProdutos();
		});

controllers.controller('ProdutoEdit', function Produto($scope, $http,
		$location, $routeParams, $upload, $rootScope, AlertService) {
	
	$scope.produtoParaPesquisa = "";
	$scope.licenciamento = "";
	$scope.fabricante = "";
	$scope.fornecedor = "";
	$scope.plataforma = "";
	$scope.tecnologia = "";
	$scope.tema = "";
	$scope.subcategoria = "";
	
	$scope.modal = ({title: 'Title', content: 'Hello Modal<br />This is a multiline message!'});
	
	var id = $routeParams.id;
	
	// Necessário para compartilhar entre os controladores: Anexo, Colaboradores...
	$rootScope.demandaId = id;

	if (id) {
		$http.get('api/produto/' + id).success(function(data) {
			
			$rootScope.produto = data;
			$scope.plataformasSuportadas = data.plataformasSuportadas;
			$scope.subcategoriasSelecionadas = data.subcategorias;
		
			if(typeof($scope.subcategoriasSelecionadas) == "undefined"){
				$scope.subcategoriasSelecionadas = [];
			}
			
			if(typeof($scope.plataformasSuportadas) == "undefined"){
				$scope.plataformasSuportadas = [];
			}
			
			$http.get('api/licenciamento').success(function(data) {
				$scope.licenciamentos = [];
				$scope.licenciamentos = data;
				if(typeof($rootScope.produto.licenciamento) != "undefined"){
					var index = buscaElemento($rootScope.produto.licenciamento,$scope.licenciamentos);
					if(index!=-1){
						$scope.licenciamento = $scope.licenciamentos[index];
					}
				}
			});
			$http.get('api/fabricante').success(function(data) {
				$scope.fabricantes = [];
				$scope.fabricantes = data;
				if(typeof($rootScope.produto.fabricante) != "undefined"){
					var index = buscaElemento($rootScope.produto.fabricante,$scope.fabricantes);
					if(index!=-1){
						$scope.fabricante = $scope.fabricantes[index];
					}
				}
			});
			$http.get('api/fornecedor').success(function(data) {
				$scope.fornecedores = [];
				$scope.fornecedores = data;
				if(typeof($rootScope.produto.fornecedor) != "undefined"){
					var index = buscaElemento($rootScope.produto.fornecedor,$scope.fornecedores);
					if(index!=-1){
						$scope.fornecedor = $scope.fornecedores[index];
					}
				}
			});
			$http.get('api/plataformaTecnologica').success(function(data) {
				$scope.plataformasTecnologicas = data;
			});
			$http.get('api/tecnologia').success(function(data) {
				$scope.tecnologias = data;
			});
		});
	} else {
		
		$rootScope.produto = {};
		$scope.plataformasSuportadas = [];
		$scope.subcategoriasSelecionadas = [];
		
		$http.get('api/licenciamento').success(function(data) {
			$scope.licenciamentos = [];
			$scope.licenciamentos = data;
		});
		$http.get('api/fabricante').success(function(data) {
			$scope.fabricantes = [];
			$scope.fabricantes = data;
		});
		$http.get('api/fornecedor').success(function(data) {
			$scope.fornecedores = [];
			$scope.fornecedores = data;
		});
		$http.get('api/plataformaTecnologica').success(function(data) {
			$scope.plataformasTecnologicas = data;
		});
		$http.get('api/tecnologia').success(function(data) {
			$scope.tecnologias = data;
		});
	}

	$scope.salvarProduto = function() {
		if($rootScope.produto.atualizacao && (typeof($rootScope.produto.produtoAnterior) == "undefined" || $rootScope.produto.produtoAnterior=="")){
			AlertService.addWithTimeout('danger','É necessário preencher o produto ao qual essa atualização se refere!');
		}else{
			console.log("ProdutoController " + $rootScope.produto);
			
			$rootScope.produto.plataformasSuportadas = $scope.plataformasSuportadas;
			$rootScope.produto.subcategorias = $scope.subcategoriasSelecionadas;

			if(typeof($scope.licenciamento) != "undefined" && $scope.licenciamento != ""){
				$rootScope.produto.licenciamento = $scope.licenciamento;
			}
			if(typeof($scope.fabricante) != "undefined"&& $scope.fabricante != ""){
				$rootScope.produto.fabricante = $scope.fabricante;
			}
			if(typeof($scope.fornecedor) != "undefined"&& $scope.fornecedor != ""){
				$rootScope.produto.fornecedor = $scope.fornecedor;
			}
			
			$("[id$='-message']").text("");
			$http({
				url : 'api/produto',
				method : $rootScope.produto.id ? "PUT" : "POST",
				data : $rootScope.produto,
				headers : {
					'Content-Type' : 'application/json;charset=utf8'
				}
			
			}).success(function(data) {
				AlertService.addWithTimeout('success','Produto salvo com sucesso');
				$location.path('produto');
			}).error(
					function(data, status) {
						if (status = 412) {
							$.each(data, function(i, violation) {
								$("#" + violation.property + "-message").text(
										violation.message);
							});
						}
			});
		}
	};
	
	$scope.adicionaPlataforma = function() {
		if(typeof($scope.plataforma) == "undefined" || $scope.plataforma == ""){
			AlertService.addWithTimeout('danger','Selecione uma plataforma');
		}else{
			var index = buscaElemento($scope.plataforma,$scope.plataformasSuportadas);
			
			if (index !== -1) {
				AlertService.addWithTimeout('danger','Plataforma já foi adicionada!');
	        }else{
				$scope.plataformasSuportadas.push($scope.plataforma);
			}
		}
	};
	
	$scope.adicionaSubcategoria = function() {
		if(typeof($scope.subcategoria) == "undefined" || $scope.subcategoria == ""){
			AlertService.addWithTimeout('danger','Selecione uma subcategoria');
		}else{
			var index = buscaElemento($scope.subcategoria,$scope.subcategoriasSelecionadas);
			
			if (index !== -1) {
				AlertService.addWithTimeout('danger','Subcategoria já foi adicionada!');
	        }else{
				$scope.subcategoriasSelecionadas.push($scope.subcategoria);
			}
		}
	};
	
	$scope.removePlataforma = function(plataforma) {
		var index = buscaElemento(plataforma,$scope.plataformasSuportadas);
			
		if (index !== -1) {
            $scope.plataformasSuportadas.splice(index,1);
        }
	};
	
	$scope.removeSubcategoria = function(subcategoria) {
		var index = buscaElemento(subcategoria,$scope.subcategoriasSelecionadas);
			
		if (index !== -1) {
            $scope.subcategoriasSelecionadas.splice(index,1);
        }
	};
	
	$scope.clicaAtualizacao = function() {
		if(!$rootScope.produto.atualizacao){
			$rootScope.produto.produtoAnterior = "";
		}
	};
	
	function buscaElemento(elemento,lista){
		var index = -1;
		for ( var i = 0 ; i < lista.length ; i++ ) {
			if (lista[i].nome === elemento.nome) {
                index = i;
                break;
            }
		}
		return index;
	}
	
	$scope.carregarTemas = function() {
		$scope.tema = "";
		$http.get('api/tema/listar/'+$scope.tecnologia.id).success(function(data) {
			$scope.temas = [];
			$scope.temas = data;
		});
	};
	
	$scope.carregarSubcategorias = function() {
		$scope.subcategoria = "";
		$http.get('api/subcategoria/listar/'+$scope.tema.id).success(function(data) {
			$scope.subcategorias = [];
			$scope.subcategorias = data;
		});
	};
});
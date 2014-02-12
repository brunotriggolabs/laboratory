
var diretivas = angular.module('catalogo.directives', []);

diretivas.directive('ngAnaliseSituacao', function() {

	
	  return {	 		  
		//restrict: 'C',
	    //require: '^ngSituacao',
	    scope: {
	      situacao: '@'
	    },	
	    template: '<span class="label"><i class="fa"> </i> {{situacao}}</span>',
	    
	    link: function(scope, elem, $attrs) {
	    	
	    	$attrs.$observe('situacao', function(situacao) {
	    		var labelType = 'label-primary';
	    		var icon = 'fa-pencil-square-o';
		    	if (situacao == 'Aprovado'){
		    		var labelType = 'label-success';
		    		var icon = 'fa-thumbs-o-up';
		    	} else 
		    	if (situacao == 'Rejeitado') {
		    		var labelType = 'label-danger';
		    		var icon = 'fa-thumbs-o-down';
		    	}
	    		$(elem).children().first().addClass(labelType).children().first().addClass(icon);
    		});

	    }
	  };
	});

diretivas.directive('ngAnaliseSituacaoButton', function() {

	  return {
		//restrict: 'C',
	    //require: '^ngSituacao',
	    scope: {
	      situacao: '@'
	    },	
	    transclude: true,
	    template: '<a data-toggle="dropdown" class="btn btn-sm  dropdown-toggle">'+
				'<i class="fa"></i> {{situacao}} <span class="caret"></span>'+
			'</a>'+
			'<ul class="dropdown-menu dropdown" ng-transclude>'+
			'</ul>',
	    
	    link: function(scope, elem, $attrs) {
	    	
	    	$attrs.$observe('situacao', function(situacao) {
	    		var btnClasses = 'btn-primary btn-success btn-danger';
	    		var iconClasses = 'fa-pencil-square-o fa-thumbs-o-up fa-thumbs-o-down';
	    		var btnType = 'btn-primary';
	    		var icon = 'fa-pencil-square-o';
		    	if (situacao == 'Aprovado'){
		    		var btnType = 'btn-success';
		    		var icon = 'fa-thumbs-o-up';
		    	} else 
		    	if (situacao == 'Reprovado') {
		    		var btnType = 'btn-danger';
		    		var icon = 'fa-thumbs-o-down';
		    	}
	    		$(elem).children().first().removeClass(btnClasses).addClass(btnType).children().first().removeClass(iconClasses).addClass(icon);
  		});

	    }
	  };
	});

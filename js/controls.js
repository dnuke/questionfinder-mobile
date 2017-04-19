var app=angular.module('questionfinder', ['ngRoute']);

app.filter('searchforms', function(){
	return function(data, searchterm){
		if(!searchterm){
			return data;
		}
		var coincidences = [];
		searchterm=searchterm.toLowerCase();
		angular.forEach(data,function(form){
			if(form.title.toLowerCase().indexOf(searchterm) !== -1){
				coincidences.push(form);
			};
		});
		return coincidences;
	};	
});

app.controller('formsloadController', function ($scope,$http){
	$http.get("https://qfapi.herokuapp.com/v1/forms")
	.then(function(response){
		dat = response.data;
		angular.forEach(dat,function(i){
			i.created_at = i.created_at.substring(0,10);
		})
		$scope.forms = dat;
	},function(response){
		alert("Error al cargar datos");
	});
})

app.config(function($routeProvider){
  	$routeProvider.
  		when("/details/:id/",{
			templateUrl: "pages/details.html",
			controller: "detailsController"
  		}).
  		when("/formlist",{
  			templateUrl: "pages/formlist.html"
  		}).
  		otherwise({
  			redirectTo: "formlist"
  		});
  	});

app.controller('detailsController', function($scope,$routeParams,$http){
	id=$routeParams.id;
	$http.get("https://qfapi.herokuapp.com/v1/forms/"+id)
	.then(function(response){
		dat = response.data;
		dat.created_at = dat.created_at.substring(0,10);
		$scope.form = dat;
	},function(response){
		alert("No se pudo detallar el cuestionario con el id: "+id);
	})
})
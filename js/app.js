(function () {
  "use strict";

  angular
    .module("miApp", ["ui.router"])
    .config(configure)
    .controller("MainController", MainController);

  configure.$inject = [
    "$stateProvider",
    "$urlRouterProvider",
    "$locationProvider",
  ];

  function configure($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/inicio");

    $stateProvider
      .state("inicio", {
        url: "/inicio",
        templateUrl: "pages/inicio.html",
        controller: "InicioController as inicioCtrl",
        resolve: {
          contenidoInicio: [
            "InicioService",
            function (InicioService) {
              return InicioService.obtenerDatosInicio()
                .then(function (response) {
                  return response;
                })
                .catch(function (error) {
                  console.log("Error obteniendo datos de inicio");
                  throw error;
                });
            },
          ],
        },
      })
      .state("formulario", {
        url: "/formulario",
        templateUrl: "pages/partials/form.html",
        controller: "FormularioController as formCtrl",
      })
      .state("especialidad", {
        url: "/especialidad",
        templateUrl: "pages/partials/specialty.html",
        controller: "EspecialidadController as especialidadCtrl", // Use different controller
      });
  }

  MainController.$inject = ["$scope"];
  function MainController($scope) {
    console.log("compiled correctly");
  }
})();
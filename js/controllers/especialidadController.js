(function () {
  "use strict";

  angular
    .module("miApp")
    .controller("EspecialidadController", EspecialidadController);

 
  EspecialidadController.$inject = ["InicioService", "$scope"];

  function EspecialidadController(InicioService, $scope) {
    var vm = this;


    vm.especialidades = [];
    vm.profesionales = [];
    vm.horarios = [];
    vm.especialidadSeleccionada = null;
    vm.submitted = false; 
    vm.successMessage = ''; 



    // Fetching especialidades
    InicioService.obtenerEspecialidades().then(function (response) {
      vm.especialidades = response;
    });

    vm.seleccionarEspecialidad = function () {
      if (vm.especialidadSeleccionada) {
        InicioService.obtenerProfesionales(vm.especialidadSeleccionada.id).then(
          function (response) {
            vm.profesionales = response;
          }
        );
      }
    };

    // Fetching horarios based on selected profesional
    vm.seleccionarProfesional = function (profesionalId) {
      console.log("Profesional ID selected:", profesionalId);
      vm.loadingHorarios = true;
      vm.errorMessage = null;

      InicioService.obtenerHorarios(profesionalId)
        .then(function (horarios) {
          vm.horarios = horarios;
        })
        .catch(function (error) {
          vm.errorMessage = "Error al cargar los horarios";
        })
        .finally(function () {
          vm.loadingHorarios = false;
        });
    };

    vm.submitForm = function () {

      if (!vm.name || !vm.lastName || !vm.address || !vm.phone) {
        console.error("Please fill all required fields.");
        return; 
      }

  
      var formData = {
        name: vm.name,
        lastName: vm.lastName,
        address: vm.address,
        phone: vm.phone,
        comment: vm.comment,
      };


      vm.submitted = true; // Set form as submitted to show success message
      vm.successMessage = 'Turno programado con éxito!'; 

      // Hide selects after successful submission
      vm.formSubmitted = true;

      console.log("Form submitted successfully:", formData);
    };
  }
})();
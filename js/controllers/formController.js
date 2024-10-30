(function () {
    "use strict";
  
    angular
      .module("miApp")
      .controller("FormularioController", FormularioController);
  
    function FormularioController() {
      var vm = this;
  
      // Define your properties and methods for the form here
      vm.submitForm = function () {
        console.log("Form submitted!");
        // Handle form submission logic
      };
    }
  })();
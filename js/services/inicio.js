(function () {
  "use strict";

  angular.module("miApp").factory("InicioService", InicioService);

  InicioService.$inject = ["$http"];

  function InicioService($http) {
    var apiBaseUrl = `${window.location.origin}/data`;

    var service = {
      obtenerDatosInicio: obtenerDatosInicio,
      obtenerEspecialidades: obtenerEspecialidades,
      obtenerProfesionales: obtenerProfesionales,
      obtenerHorarios: obtenerHorarios,
      submitForm: submitForm 
    };

    function obtenerDatosInicio() {
      return $http
        .get(`${apiBaseUrl}/inicio.json`)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.error("Error al obtener datos de inicio:", error);
          throw error;
        });
    }

    function obtenerEspecialidades() {
      return $http
        .get(`${apiBaseUrl}/especialidades.json`)
        .then(function (response) {
          if (response.data && response.data.length) {
            console.log("Especialidades obtenidas:", response.data);
          } else {
            console.warn("No se obtuvieron especialidades.");
          }
          return response.data;
        })
        .catch(function (error) {
          console.error("Error al obtener especialidades:", error);
          throw error;
        });
    }

    function obtenerProfesionales(especialidadId) {
      return $http
        .get(`${apiBaseUrl}/profesionales.json`)
        .then(function (response) {
          var profesionales = response.data[especialidadId] || [];
          console.log("Profesionales obtenidos:", profesionales);
          return profesionales;
        })
        .catch(function (error) {
          console.error("Error al obtener profesionales:", error);
          throw error;
        });
    }

    function obtenerHorarios(profesionalId) {
      return $http
        .get(`${apiBaseUrl}/horarios.json`)
        .then(function (response) {
          console.log("Full response data:", response.data);
          const horarios = response.data[profesionalId] || [];
          console.log("Horarios obtenidos:", horarios);
          return horarios;
        })
        .catch(function (error) {
          console.error("Error al obtener horarios:", error);
          throw error;
        });
    }

    // Add the new submitForm function Doestn work because the challenge doesnt specify a url so -_-
    function submitForm(formData) {
      return $http
        .post(`${apiBaseUrl}/submitForm`, formData) 
        .then(function (response) {
          console.log("Form successfully submitted:", response.data);
          return response.data;
        })
        .catch(function (error) {
          console.error("Error submitting the form:", error);
          throw error;
        });
    }

    return service;
  }
})();
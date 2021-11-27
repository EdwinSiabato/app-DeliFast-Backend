// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }else{
          RegistrarPersona();
          event.preventDefault()

        }

        form.classList.add('was-validated')
      }, false)
    })
})()

function RegistrarPersona(){
  let nombre = document.querySelector("#txtNombre").value;
  let apellido = document.querySelector("#txtApellido").value;
  let correo = document.querySelector("#txtCorreo").value;
  let celular = document.querySelector("#txtCelular").value;
  let direccion = document.querySelector("#txtDireccion").value;

  let url = `http://localhost:3000/cliente`;
  let datos = {
    nombre: nombre,
    apellido: apellido,
    celular: celular,
    direccion: direccion,
    correo: correo
  };

  fetch(url, {
     method: 'POST',
     body: JSON.stringify(datos),
     headers:{
         'Content-Type':'application/json'
      }
  }).then(res => res.json())
  .then(mensaje => {
    console.log(mensaje)
  })
}

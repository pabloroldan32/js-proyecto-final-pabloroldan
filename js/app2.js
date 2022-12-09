//Registrar usuario

class User {
  constructor(nombre, apellido, email, password){
    this.nombre= nombre;
    this.apellido=apellido;
    this.email= email;
    this.password=password;
  }
}


const expresiones = {
  password: /^.{4,12}$/, 
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

}

let usuarioCreado = [];

Verify ()


let btnSubmit=document.getElementById('submit');
btnSubmit.onclick=()=>{
let nombreIngresado=document.getElementById('nombreUsuario').value;

let apellidoIngresado=document.getElementById('apellidoUsuario').value;

let emailIngresado=document.getElementById('emailUsuario').value;
const validarEmail= (expresiones.correo.test(emailIngresado))? true : false
validarEmail? document.getElementById('val-email').innerHTML=`Email Válido`: document.getElementById('val-email').innerHTML=`Email inválido`
;



let passwordIngresado= document.getElementById('passwordUsuario').value;
const validarPass= (expresiones.password.test(passwordIngresado))? true : false 
validarPass? document.getElementById('val-pass').innerHTML=`Password Válido`: document.getElementById('val-pass').innerHTML=`debe contener mínimo 4 caracteres y máximo 8` 


let validarCampos=((nombreIngresado!="")&&(apellidoIngresado!="")&&(emailIngresado!="")&&(passwordIngresado!=""))? true : false
validarCampos? document.getElementById('val-pass').innerHTML=`Bienvenido` : document.getElementById('bienvenidoUsuario').innerHTML=`Ingresar datos válidos`



let objetoUsuario ={nombre: nombreIngresado, apellido: apellidoIngresado, email: emailIngresado, password: passwordIngresado }
usuarioCreado.push( new User (objetoUsuario));

 
save()

}


function save() {
localStorage.setItem("listaUsuario",JSON.stringify (usuarioCreado));
  
}


function Verify () {
  let arrayAuxiliar=JSON.parse(localStorage.getItem("listaUsuario"));

  if(arrayAuxiliar){

   for(elemento of arrayAuxiliar )
        {
            usuarioCreado.push(new User(elemento));
            
        }
        
}else{
        document.getElementById('val-pass').innerHTML=`datos invalidos`
   
}
}



(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


Toastify({
  text: "Bienvenidos a Kia Ora grow shop",
  className: "info",
  style: {
    background: "linear-gradient(to right, #398170, #5e6681)",
  }
}).showToast();

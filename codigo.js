const contenedor = document.querySelector('tbody');

let resultados = '';

const modalPersona = new bootstrap.Modal(document.getElementById('modalPersona'));
const formPersona = document.querySelector('form');
var opcion = '';
const nombre = document.getElementById('nombre');
const apellidos = document.getElementById('apellidos');
const edad = document.getElementById('edad');


const mostrar = (datos) => {
    datos.forEach(persona => {
        resultados += `<tr>
                            <td>${persona.id}</td>
                            <td>${persona.nombre}</td>
                            <td>${persona.apellidos}</td>
                            <td>${persona.edad}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary" style="margin-right:5px">Editar</a><button class="btn btn-warning" onClick="EliminarCliente(${persona.id})">Eliminar</button></td>
                       </tr>
                    `    
    });

    contenedor.innerHTML = resultados;

    document.querySelector('#btodo').innerHTML = "<button types='button' class='btn btn-danger' onclick='EliminarClientes();'>Eliminar todos los clientes</button></td></tr>";
    
    var ddl = "";

    ddl+=`<select id ='ddl' onchange="CambiarVista(this.value);">
    <option selected>Elige una opción</option>
    <option value='1'>Ordenar nombres de forma ascendente</option>
    <option value='2'>Ordenar nombres de forma descendente</option>
    <option value='3'>Ordenar por edades de forma ascendente</option>
    <option value='4'>Ordenar por edades de forma descendente</option></select>`
                 
    document.querySelector('#dropdownlist').innerHTML = ddl;
    
}

fetch('http://localhost:3500/clientes/')
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))

  
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Abrir Modal y pasar los valores a los inputs para editar

let idForm = 0

on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[0].innerHTML;
    const nombreForm = fila.children[1].innerHTML;
    const apellidosForm = fila.children[2].innerHTML;
    const edadForm = fila.children[3].innerHTML;
    nombre.value =  nombreForm;
    apellidos.value =  apellidosForm;
    edad.value =  edadForm;
    opcion = 'editar';
    modalPersona.show();
     
});


formPersona.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(opcion=='editar'){    
        const clienteObj = { nombre: nombre.value, apellidos: apellidos.value, edad: edad.value };
        fetch('http://localhost:3500/clientes/'+idForm,{
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(clienteObj)
        })
        .then( res => res.json() )
        .then( res => location.reload() )
    }
    modalPersona.hide();
    
})



const EliminarClientes = () => {

    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3500/clientes/`, false);
    xhttp.send();

    location.reload();

}

const EliminarCliente = (id) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3500/eliminar/${id}`, false);
    xhttp.send();

    location.reload();
}


function CambiarVista(value)
{

if(value == 1)
{
  window.location.href = "tablas/nombreascendente.html";
}
if(value == 2)
{
  window.location.href = "tablas/nombredescendente.html";
}
if(value == 3)
{
  window.location.href = "tablas/mayoramenor.html";
}
if(value == 4)
{
  window.location.href = "tablas/menoramayor.html";
}

}

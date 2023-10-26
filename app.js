
//Objeto constructor (class js) para registrar proyecto
class Proyecto {
    constructor(nombre, precio, id){
        this.id = id
        this.nombre = nombre;
        this.horas = [];
        this.precio = precio;
    }

    //Pendiente de crear metodo para sumar horas de trabajo

    //Pendiente de crear metodo para generar una factura en relacion a hora total y precio
} 

//Variable para anidar los contenidos al board de proyectos
let boardProjects = document.getElementById('boardProjects');

//Variable para almacenar todos los proyectos (como objetos)
const proyectos = [];

//Variable de fecha general (Todavia no la aplique en esta entrega)
const date = new Date ();

//Variable para setear cantidad de proyectos disponibles en version FREE
let setFree = 3;

// Variables para mostrar cantidad de proyectos disponibles
let available = setFree;

let text_number_projects = document.getElementById('text_number_projects');

text_number_projects.innerText = available + ' proyectos';

//Funciones de la app

function moveIn(id) {
    let elementToMove = document.getElementById(id);

    setTimeout(()=>{
        elementToMove.classList.remove('hidden');
        elementToMove.classList.add('move-in');
    }, 500);
}

function moveOut(id) {
    let elementToMove = document.getElementById(id);
    elementToMove.classList.add('move-out');

    setTimeout(() => {
        elementToMove.style.display = 'none';
    }, 1000);
}

function updateBoardProjects() {
    //Se almacenan los datos del storage en una variable para luego ser usada (me sucedia que me daba error cuando estaba vacio entonces investigue y agregue "|| []") 
    let proyectosCargados = JSON.parse(localStorage.getItem('proyectos')) || [];

    //Se concatena los 2 arrays que guardan los proyectos nuevos y antiguos
    let proyectosTotales = [...proyectosCargados, ...proyectos];
    
    proyectosTotales.map(item => {
        //Por cada item debe crear una nueva variable con el nombre del proyecto almacenado en el array proyectos
        let newBoxArticle = document.createElement('div');
        newBoxArticle.innerHTML = `
        <article class="box-project_resume border-sm">
    
        <div>
            <p class="font-light h2">Project:</p>
            <p class="font-bold h1" id="box-project_name">${item.nombre}</p>
        </div>
    
        <div class="box-project_resume-information">
            <div class="box-project_resume-information_head">
                <p class="p-small">Dates</p>
                <p class="p-small">Total hours</p>
                <p class="p-small">Generate</p>
            </div>
        </div>
    
        <button class="button-outline border-sm">Show More</button>
    
        </article>`;;
        boardProjects.appendChild(newBoxArticle)
    } )

    //Se almacena en el storage el spread de arrays "proyectos y proyectos cargados"
    localStorage.setItem('proyectos', JSON.stringify(proyectosTotales));

}

function removeAllProjects() {

    //Se elimina todos los proyectos del storage y se recarga la pagina
    localStorage.clear()

    location.reload();

}

function addNewProject (){
    let project_name = document.getElementById('inputProject_name').value;
    let project_price = document.getElementById('inputProject_price').value;

    //Se crea nuevo proyecto utilizando la clase constructora y se agrega al array de proyectos
    proyectos.push(new Proyecto(project_name, project_price, project_name));
    return proyectos;
}

function addProjectsFree(setClassIn,setClassOut) {

    if (proyectos.length === setFree - 1 ){
        addNewProject()
        moveIn(setClassIn)
        moveOut(setClassOut)
        updateBoardProjects()
        console.log(proyectos.map(item => item.nombre));
    } else{
        addNewProject()
    }

    //Restar el numero de la variable "available" y cambio de estado en texto "available" 
    available--

    text_number_projects.innerText = available + ' proyectos';

    //Resetear el valor de los inputs
    document.getElementById('inputProject_name').value = '';

    document.getElementById('inputProject_price').value = '';
    
    return;

}
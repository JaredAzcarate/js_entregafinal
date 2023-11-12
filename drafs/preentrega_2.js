

class Proyecto {
    constructor(nombre, precio, id){
        this.id = id
        this.nombre = nombre;
        this.horas = [];
        this.precio = precio;
    }

    //Pendiente de crear metodo para sumar horas de trabajo

    //Pendiente de crear metodo para generar una factura en relacion a hora total y precio
} //Objeto para registrar proyecto

//Variable para almacenar todos los proyectos (como objetos)
const proyectos = [];

//Variable de fecha general
const date = new Date ();

//Variable para setear cantidad de proyectos disponibles en version FREE
let setFree = 3;

// Variable para mostrar cantidad de proyectos disponibles
let available = setFree;

//Iniciar interacción
alert(`Hola tienes ${available} proyectos para agregar en tu version Free`)

for(let i = 1 ; i <= setFree; i++){
    let id = i;
    let precioProyecto = '';
    let nombreProyecto = '';

    while(true){
        nombreProyecto = prompt(`Tienes disponible ${available} proyectos`);

        if (nombreProyecto === ''){
            alert('Lo siento, debes registrar un valor. Intenta nuevamente.')
        } else{
            break
        }
    } 

    while(true){
        precioProyecto = prompt(`¿Cuál es el precio hora para este proyecto? (Solo se permite valor numérico)`);
    
        if(!isNaN(precioProyecto)) {
            break
        }
        else{
            alert('Ingresa un valor numérico por favor.')
        }
    }

    proyectos.push(new Proyecto(nombreProyecto, precioProyecto, id));
    
    available--
}

// Almacenar y concatenar nombres de proyectos y id para luego poder seleccionarlo
let nombresProyectos = proyectos.map(proyecto => proyecto.id + ". " + proyecto.nombre + " ")

//Seleccionar proyecto por ID yt convertir valor a numero
let selecProyect = parseInt(prompt(`¿En que proyecto deseas registrar tus horas de trabajo?:\n${nombresProyectos}\n Seleccionar por número`), 10)

//Buscar proyecto seleccionado
let findProyect = proyectos.find((i) => selecProyect === i.id)

function TimeRegister (){
    const currentTime = new Date ();
    let hr = currentTime.getHours();
    let min = currentTime.getMinutes();
    let seg = currentTime.getSeconds();

    findProyect.horas.push(`${hr}:${min}:${seg}`);
}

//Registrar inicio de trabajo
while(true){
    let setAction = prompt(`Registremos tu hora de entrada del día:${date.toLocaleDateString()}\n\nProyecto: ${findProyect.nombre} \nPrecio por hora: $${findProyect.precio}\n\nPara iniciar el registro de horas escribe "iniciar"`);

    setAction = setAction.toLowerCase();

    if(setAction === 'iniciar'){
        TimeRegister()
        break
    }
    else{
        alert('Al parecer no escribiste bien "iniciar", por favor intenta nuevamente.')
    }
}


//Registrar salida de trabajo 
while(true){
    let setAction = prompt(`Registremos tu hora de salida del día:${date.toLocaleDateString()}\n\nProyecto: ${findProyect.nombre} \nPrecio por hora: ${findProyect.precio}\n\nPara finalizar el registro de horas escribe "finalizar"`);

    setAction = setAction.toLowerCase();

    if(setAction === 'finalizar'){
        TimeRegister()
        break
    }
    else{
        alert('Al parecer no escribiste bien "finalizar", por favor intenta nuevamente.')
    }
}

let showHours = findProyect.horas;

alert(`⌚ Tu horario de entrada fue: ${showHours[0]}\n\n⌚ Tu horario de salida fue: ${showHours[1]}\n\nEn la proxima entrega podras ver el total a cobrar por el tiempo trabajado 😉`);
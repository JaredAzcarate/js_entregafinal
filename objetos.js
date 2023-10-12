
//Objeto para registrar proyecto
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

//Variable para almacenar todos los proyectos (como objetos)
const proyectos = [];

//Variable para setear cantidad de proyectos disponibles en version FREE
let setFree = 3;

// Variable para mostrar cantidad de proyectos disponibles
let available = setFree;

alert(`Hola tienes ${available} proyectos para agregar en tu version Free`)

for(let i = 1 ; i <= setFree; i++){
    let id = i;
    let nombreProyecto = prompt(`Tienes disponible ${available} proyectos`);
    let precioProyecto = prompt(`¿Cuál es el precio hora para este proyecto?`);
    proyectos.push(new Proyecto(nombreProyecto, precioProyecto, id));
    available--
}

// Almacenar y concatenar nombres de proyectos y id para luego poder seleccionarlo
let nombresProyectos = proyectos.map(proyecto => proyecto.id + ". " + proyecto.nombre + " ")

//Seleccionar proyecto por ID yt convertir valor a numero
let selecProyect = parseInt(prompt(`¿En que proyecto deseas registrar tus horas de trabajo?:\n${nombresProyectos}\n Seleccionar por número`), 10)

//Buscar proyecto seleccionado
let findProyect = proyectos.find((i) => selecProyect === i.id)

//Mostrar proyecto seleccionado e iniciar 
alert(`Seleccionaste el proyecto: ${findProyect.nombre} \n El precio por hora es: ${findProyect.precio}`)
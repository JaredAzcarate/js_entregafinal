
//Objeto constructor para registrar proyecto
class Proyecto {

    constructor(nombre, precio, id, change){
        this.id = id
        this.nombre = nombre;
        this.time = [];
        this.generate = []; 
        this.precio = precio;
        this.total = '0.00';
        this.change = change;

        this.hr = 0;
        this.min = 0;
        this.sec = 0;
        this.record
        this.timeInterval
    
        this.hours
        this.minutes
        this.seconds
        this.pausedTime
        this.reset
        this.calculate
    }

    startTime(idBoxTimer) {

        startButton = document.getElementById(`startButton-${idBoxTimer}`);
        pauseButton = document.getElementById(`pauseButton-${idBoxTimer}`);
        stopButton = document.getElementById(`stopButton-${idBoxTimer}`);
    
        startButton.classList.add('hidden')
        pauseButton.classList.remove('hidden')
        stopButton.classList.remove('hidden')
    
        if (this.pausedTime) {
            this.hr = pausedTime.hr;
            this.min = pausedTime.min;
            this.sec = pausedTime.sec;
    
        } else {
            this.hr;
            this.min;
            this.sec;
        }
        
        this.hours = document.getElementById(`hours-${idBoxTimer}`);
        this.minutes = document.getElementById(`minutes-${idBoxTimer}`);
        this.seconds = document.getElementById(`seconds-${idBoxTimer}`);
    
        function formatTwoDigits(value) {
            return value < 10 ? `0${value}` : value;
        }
    
        this.timeInterval = setInterval(()=>{
            this.sec++
            if (this.sec === 60) {
                this.sec = 0;
                this.min++
    
                if(this.min === 60){
                    this.min = 0;
                    this.hr++
                }
            }
    
            let formattedHours = formatTwoDigits(this.hr);
            let formattedMinutes = formatTwoDigits(this.min);
            let formattedSeconds = formatTwoDigits(this.sec);
    
            this.hours.innerText = formattedHours;
            this.minutes.innerText = formattedMinutes;
            this.seconds.innerText = formattedSeconds;
    
            this.record = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    
        },1000)

        console.log('Start');
    }
    
    pauseTime(idBoxTimer) {
    
        startButton = document.getElementById(`startButton-${idBoxTimer}`);
        pauseButton = document.getElementById(`pauseButton-${idBoxTimer}`);
    
        startButton.classList.remove('hidden')
        pauseButton.classList.add('hidden');
    
        startButton.innerText = 'Continue';
    
        clearInterval(this.timeInterval);
        
        console.log('Pause');
    }
    
    stopTime(idBoxTimer) {

        startButton = document.getElementById(`startButton-${idBoxTimer}`);
        pauseButton = document.getElementById(`pauseButton-${idBoxTimer}`);
        stopButton = document.getElementById(`stopButton-${idBoxTimer}`);
    
        startButton.classList.add('hidden');
        pauseButton.classList.add('hidden');
        
        stopButton.innerText = "Recording...";
    
        updateBoardProjectFunction(idBoxTimer, this.record, this.hr, this.min, this.sec)
        
        clearInterval(this.timeInterval)

        this.hours.innerText, this.minutes.innerText, this.seconds.innerText = '00';

        //Se establece este timeout para almacenar los datos de tiempos
        this.reset = setTimeout (()=>{
            this.hr, this.min, this.sec = 0;
            
            startButton.classList.remove('hidden');
            stopButton.classList.add('hidden');

            stopButton.innerText = "Stop";
            startButton.innerText = "Let's start";

            localStorage.setItem('proyectos', JSON.stringify(proyectos))
        },1000)

        console.log('Stop');
        
    }

    calculate(idBoxTimer){
        let totalHours;
        let totalminutes;
        let totalseconds;
        let totalGenerate;
        let saveTotals;
        let generateBoard = document.getElementById(`generateBoard-${idBoxTimer}`);
        let boxTotalGenerate = document.getElementById(`boxTotalGenerate-value-${idBoxTimer}`);

        generateBoard.innerHTML = '';
        
        this.time.map((item) => {
            totalHours = item.hours * this.precio;
            totalminutes = item.minutes * (this.precio / 60);
            totalseconds = item.seconds * (this.precio / 3600);
            totalGenerate = parseFloat((totalHours + totalminutes + totalseconds).toFixed(2));
            console.log(totalGenerate);

            let generateItem = document.createElement('div');
            generateItem.textContent = this.change + totalGenerate;
            generateBoard.appendChild(generateItem);

        } )

        saveTotals = setTimeout(()=>{
            let proyecto = proyectos.find(item => item.id === idBoxTimer)

            proyecto.generate.push({ totalGenerate })
            this.total = proyecto.generate.reduce((acumulador, item) => acumulador + item.totalGenerate, 0);

            boxTotalGenerate.innerText = this.change + this.total.toFixed(2);

            Toastify({
                text: `Today you was generate ${this.change}${this.total}`,
                duration: 3000,
                gravity: "bottom", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "#FFE814",
                  color: "black",
                },
              }).showToast();
        })
    }

}

//Botones del timer
let startButton;
let pauseButton;
let stopButton;

//Variable para anidar los contenidos al board de proyectos
let boardProjects = document.getElementById('boardProjects');

//Variable para almacenar todos los proyectos (como objetos)
const proyectos = [];

//Variable de fecha general (Todavia no la aplique en esta entrega)
const date = new Date ();

//Variable para setear cantidad de proyectos disponibles en version FREE
let setFree = 1;

// Variables para mostrar cantidad de proyectos disponibles
let available = setFree;

let text_number_projects = document.getElementById('text_number_projects');

text_number_projects.innerText = available + ' proyectos';

//Funciones de animación 
function moveIn(id) {
    let elementToMove = document.getElementById(id);

    setTimeout(()=>{
        elementToMove.classList.remove('hidden');
        elementToMove.classList.add('move-in');
    }, 500);
}

function moveOut(id) {
    let elementToMove = document.getElementById(id);
    elementToMove.classList.remove('move-in');
    elementToMove.classList.add('move-out');

    setTimeout(() => {
        elementToMove.style.display = 'none';
    }, 1000);
}

//Funciones relacionadas a la box del proyecto
function openProject(projectId) {
    let openBox = document.getElementById(`boxProject-${projectId}`)
    let timerBox = document.getElementById(`boxTimer-${projectId}`)
    let openButton = document.getElementById(`buttonOpenProject-${projectId}`)
    let closeButton = document.getElementById(`buttonCloseProject-${projectId}`)
    let removeButton = document.getElementById(`removeProject-${projectId}`)

    openBox.classList.add('box-project_resume-active')
    timerBox.classList.remove('hidden')
    openButton.classList.add('hidden')
    closeButton.classList.remove('hidden')
    removeButton.classList.add('hidden')
}

function closeProject(projectId) {
    let openBox = document.getElementById(`boxProject-${projectId}`)
    let timerBox = document.getElementById(`boxTimer-${projectId}`)
    let openButton = document.getElementById(`buttonOpenProject-${projectId}`)
    let closeButton = document.getElementById(`buttonCloseProject-${projectId}`)
    let removeButton = document.getElementById(`removeProject-${projectId}`)

    openBox.classList.remove('box-project_resume-active')
    timerBox.classList.add('hidden')
    openButton.classList.remove('hidden')
    closeButton.classList.add('hidden')
    removeButton.classList.remove('hidden')
}

//Funciones relacionadas al board de los proyectos
function updateBoardProjects() {

    const proyectosGuardados = JSON.parse(localStorage.getItem('proyectos')) || [];

    proyectos.push(...proyectosGuardados);
    
    proyectos.map(item => {
        //Por cada item debe crear una nueva variable con el nombre del proyecto almacenado en el array proyectos
        let newBoxArticle = document.createElement('div');
        newBoxArticle.innerHTML = `
        <article class="box-project_resume border-sm" id="boxProject-${item.id}">
        <div class="remove-project" id="removeProject-${item.id}" onclick="removeElement('boxProject-${item.id}')">x</div>
        <!-- Head de caja de proyecto -->
        <div class="box-project_resume-content">
            <div class="box-project_resume-head">
                <div>
                    <p class="font-light h2">Project:</p>
                    <p class="font-bold h2 mb-sm" id="box-project_name">${item.nombre}</p>
                </div>
            </div>


            <div class="box-project_resume-information">

                <div class="box-project_resume-information_head">

                    <div>
                        <p class="p-small mb-sm font-bold">Dates</p>
                        <div class="p-small" id="dateBoard-${item.id}"></div>
                    </div>

                    <div>
                        <p class="p-small mb-sm font-bold">Total hours</p>
                        <div class="p-small" id="timeBoard-${item.id}"></div>
                    </div>

                    <div>
                        <p class="p-small mb-sm font-bold">Generate</p>
                        <div class="p-small" id="generateBoard-${item.id}"></div>
                    </div>
                </div>
                <div class="boxTotalGenerate">
                <div class="box-generate">
                    <p class="p-small mb-sm font-bold">Total Generate</p>
                    <p class="p-small" id="boxTotalGenerate-value-${item.id}">${item.change + item.total}</p>
                </div>
            </div>
            </div>
        </div>

        <!-- Temporizador -->
        <div class="box-project_resume-content hidden" id="boxTimer-${item.id}">
            <div class="box-project_resume-box_timer">
                <div class=" border-sm">
                    <p class="h1 font-light"><span id="hours-${item.id}">00</span>:<span id="minutes-${item.id}">00</span>:<span id="seconds-${item.id}">00</span></p>
                </div>
                <div class="box-project_resume-box_timer-controls">
                    <button class="button-outline button-outline_yellow border-sm" onclick="start('${item.id}')" id="startButton-${item.id}">Let's start</button>
                    <button class="button-outline button-outline_yellow border-sm hidden" onclick="pause('${item.id}')" id="pauseButton-${item.id}">Pause</button>
                    <button class="button-outline button-outline_yellow border-sm hidden" onclick="stop('${item.id}')" id="stopButton-${item.id}">Stop</button>
                </div>
            </div>

        </div>

        <!-- Button para cerrar proyecto -->
        <button class="box-project_resume-button_close hidden" id="buttonCloseProject-${item.id}" onclick="closeProject('${item.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
        </button>

        <!-- Button para abrir proyecto -->
        <button class="button-outline border-sm animate-box" id="buttonOpenProject-${item.id}" onclick="openProject('${item.id}')" >Show More</button>
        
    </article>`;;
        boardProjects.appendChild(newBoxArticle)
    } )

}

function removeAllProjects() {

    //Se elimina todos los proyectos del storage y se recarga la pagina
    localStorage.clear()

    location.reload();

}

function removeElement(id) {
    let selectElementToRemove = document.getElementById(`${id}`);

    selectElementToRemove.remove()

}

function addProject(id) {
    let boxModal = document.getElementById('boxInteraction')
    let textModal = document.getElementById('textModal')
    let removeModal = document.getElementById('removeModal')

    textModal.style.display = 'none'
    removeModal.classList.remove('hidden')
    
    setTimeout(() => {
        boxModal.style.display = 'inline'
    }, 500)
    
    moveIn('boxInteraction')
}

//Funciones relacionadas al modal para añadir nuevo proyecto
function addNewProject (){
    let project_name = document.getElementById('inputProject_name').value;
    let project_price = document.getElementById('inputProject_price').value;
    let project_change = document.getElementById('inputProject_change').value;

    //Se crea nuevo proyecto utilizando la clase constructora y se agrega al array de proyectos
    proyectos.push(new Proyecto(project_name, project_price, project_name, project_change));
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

//Funciones del timer
function start(id) {
    let selectProject = proyectos.find(project => project.id === id)

    selectProject.startTime(id)
}

function pause(id) {
    let selectProject = proyectos.find(project => project.id === id)

    selectProject.pauseTime(id)
}

function stop(id) {
    let selectProject = proyectos.find(project => project.id === id)
    selectProject.stopTime(id)
}

function updateBoardProjectFunction(idBoxTimer, record, hr, min, sec) {
    
    //Identificar proyecto
    const proyecto = proyectos.find(item => item.id === idBoxTimer);

    //Se ejecuta la función "calculate" con un delay para que el array muestre datos
    let updateGenerate = setTimeout(()=>{
        proyecto.calculate(idBoxTimer)
    }, 200)

    //Agregar fechas y horas a las listas
    let dateRecord = new Date();
    let newRecord = record
    let hrRecord = hr;
    let minRecord = min;
    let secRecord = sec;
    let newDate = `${dateRecord.getDate()}/${dateRecord.getMonth() + 1}/${dateRecord.getFullYear()}`;
    proyecto.time.push({ date: newDate, record: newRecord, hours: hrRecord, minutes: minRecord, seconds: secRecord });

    let timeBoard = document.getElementById(`timeBoard-${idBoxTimer}`);
    let dateBoard = document.getElementById(`dateBoard-${idBoxTimer}`);

    timeBoard.innerHTML = '';
    dateBoard.innerHTML = '';

    proyecto.time.forEach(show => {
        const itemTime = document.createElement('div');
        const itemDate = document.createElement('div');

        itemTime.textContent = show.record;
        itemDate.textContent = show.date;

        timeBoard.appendChild(itemTime);
        dateBoard.appendChild(itemDate);
    });
}
/* Variables necesarias */
let user = '';
let project1 = '';
let project2 = '';
let project3 = '';
let price = '';
let timeTotal = '';
let priceTotal = '';
let letContinue = '';

function addAnotherProject (){
    letContinue = '';

    while (true) {
        letContinue = prompt('¿Deseas agregar otro proyecto? \n *Responde con SI o NO').toLowerCase();

        if (letContinue === 'si') {
            break;
        } else if (letContinue === 'no') {
            break;
        } else {
            alert('Por favor, responda con "si" o "no".');
        }
    }
    return letContinue;
}

/* Promts, alerts and conditionals */
alert('Timerecords es una aplicación web que tiene como objetivo ayudar a freelacers a facturar según las horas trabajadas y el precio establecido para un cliente.')

alert('El algoritmo planteado para esta pre entrega tiene como objetivo final: \n 1.Identificarte \n 2. Añadir nuevo proyecto (hasta 3 proyectos) \n 3. Establecer precio por hora \n 4. Seleccionar proyecto que se desea registrar horario \n 5. Registrar horario y obtener valor (dinero) generado por horas de trabajo \n \n Preciona "Aceptar" para iniciar.')

user = prompt('Hola, ¿cuál es tu nombre?');

for(let i = 3; i >= 1; i--) {

    if (i <= 0 ){
        break
    }
    
    else{
        
        switch (i) {

            case 3:
                do {
                    project1 = prompt(`Igresa un proyecto nuevo (tienes disponible ${i} proyectos)`);
                } while (project1 === '');
                break;

            case 2:
                do {
                    project2 = prompt(`Igresa un proyecto nuevo (tienes disponible ${i} proyectos)`);
                } while (project2 === '');
                break;

            case 1:
                do {
                    project3 = prompt(`Igresa un proyecto nuevo (tienes disponible ${i} proyectos)`);
                } while (project3 === '');
                continue;
        }

        addAnotherProject();
    
        if (letContinue === 'no') {
            break;
        }
    }
};

while(true){
    price = prompt('¿Cuál es el valor de la hora de tu trabajo? (Solo se permite valor numérico)');

    if(!isNaN(price)) {
        break
    }
    else{
        alert('Ingresa un valor numérico por favor.')
    }
}

let selectProject = prompt(`${user} estos son tus proyectos:\n ${project1} \n ${project2} \n ${project3}\n \n ¿En cuál deseas registrar tus horas trabajadas? (Escribe el nombre del proyecto)`);

while(true){
    timeTotal = Number(prompt('¿Cuántas horas trabajaste en este proyecto? (Solo se permite valor numérico)'));

    if(!isNaN(timeTotal)) {
        break
    }
    else{
        alert('Ingresa un valor numérico por favor.')
    }
}

priceTotal = timeTotal * price;

alert(`${user} en el proyecto "${selectProject}" generaste un total de $${priceTotal} por ${timeTotal}hs trabajadas.`)


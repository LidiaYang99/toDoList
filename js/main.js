// pDom
let sectionTarea = document.querySelector('#tarea')
let id = 2
let flag = true;

// -----------------mostrar tareas----------------
function printOneTarea(pList, pDom) {
    const li = document.createElement('li')
    li.classList.add('mensaje', pList.nivel)


    li.innerHTML = `
            <div class="left">
                <input type="checkbox" style="zoom:130%" name="check-box">
                <p>${pList.contenido}</p>
            </div>

            <div class="right">
               <span data-id=${pList.id}>X</span>
            </div>`

    // tachar con checkbox
    let checkbox = li.querySelector('.left input')
    checkbox.addEventListener('click', (event) => {
        if (flag) {
            event.target.nextElementSibling.style.textDecoration = 'line-through';
            flag = false;
        } else {
            event.target.nextElementSibling.style.textDecoration = 'none';
            flag = true;
        }
    })


    // borrar tarea
    let deleteTarea = li.querySelector('.right span');
    deleteTarea.addEventListener('click', (event) => {

        // borrar elemento
        const padreLi = event.target.parentNode.parentNode;
        padreLi.parentNode.removeChild(padreLi);
        console.log(tareas);


        // borrar desde array
        let id = parseInt(event.target.dataset.id)
        let paraBorrar = tareas.findIndex(tarea => tarea.id === id)

        if (paraBorrar !== -1) {
            tareas.splice(paraBorrar, 1);
            pDom.innerHTML = ""
            printAllTarea(tareas, pDom)
        }

    })
    pDom.append(li)
}


function printAllTarea(pList, pDom) {

    if (pList.length !== 0) {
        pList.forEach(list => printOneTarea(list, pDom));
    } else {
        pDom.innerHTML = `<li>No hay tarea</li>`;
    }
}
printAllTarea(tareas, sectionTarea)


// --------------------añadir tarea-------------------
let btnAdd = document.querySelector('.info button');
let tareaAdd = document.querySelector('.info input');
let nivelAdd = document.querySelector('.info #nivel');


function comprobarDuplicado(pList, pNewTares) {
    let duplicado = pList.find(tarea => tarea.contenido === pNewTares.contenido)

    if (duplicado) {
        return 'tarea duplicada'
    } else {
        tareas.push(pNewTares);
        return 'success'
    }
}

function addTarea(event) {

    // comprobar si los campos son vacios
    if (tareaAdd.value === "") {
        alert('Tienes que decirme que vas a hacer');
        return
    } else if (nivelAdd.value === "") {
        alert('es urgente, diaria o mensual ?')
        return;
    }

    let newTarea = {
        id: id,
        contenido: tareaAdd.value,
        nivel: nivelAdd.value
    }

    // comprobar si la tarea es duplicada
    let guardado = comprobarDuplicado(tareas, newTarea)

    if (guardado === 'success') {
        sectionTarea.innerHTML = ""

        printAllTarea(tareas, sectionTarea);
        id++;

        tareaAdd.value = ""
        nivelAdd.value = ""
    } else {
        alert(guardado);
    }

}

btnAdd.addEventListener('click', addTarea);

// --------------------------añadir tarea con intro------------------------
tareaAdd.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTarea()
    }
})


// ------------------------filtrar tarea---------------------------
let filtarBtn = document.querySelector('.filter #btn-filtrar');
let tareaFilter = document.querySelector('.filter input');
let nivelFilter = document.querySelector('.filter #nivel-filter')


function filterTarea(event) {

    let tareaFiltrada = []

    if (nivelFilter.value === "" && tareaFilter.value === "") {
        alert("Por favor, selecciona el método de filtrado");
        return;
    } else if (nivelFilter.value === "") {
        tareaFiltrada = tareas.filter(tarea => tarea.contenido.toLowerCase().includes(tareaFilter.value.toLowerCase()))
    } else if (tareaFilter.value === "") {
        tareaFiltrada = tareas.filter(tarea => tarea.nivel === nivelFilter.value)
    } else {
        tareaFiltrada = tareas.filter(tarea => tarea.contenido.toLowerCase().includes(tareaFilter.value.toLowerCase()) && tarea.nivel === nivelFilter.value)
    }

    console.log(tareaFiltrada);

    sectionTarea.innerHTML = ""
    printAllTarea(tareaFiltrada, sectionTarea)

    // resetear los contenidos de input y nivel
    tareaFilter.value = ""
    nivelFilter.value = ""
}

filtarBtn.addEventListener('click', filterTarea)

// ---------------------filtrar tarea con intro-------------
tareaFilter.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        filterTarea()
    }
})


// -------------------------show All-------------------------------
let btnShowAll = document.querySelector('.filter #show-all')

btnShowAll.addEventListener('click', () => {
    sectionTarea.innerHTML = ""
    printAllTarea(tareas, sectionTarea)
})


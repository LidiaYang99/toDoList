// pDom
let sectionTarea = document.querySelector('#tarea')

// -----------------mostrar tareas----------------
function printOneTarea(pList, pDom) {
    const li = document.createElement('li')
    li.classList.add('mensaje', pList.nivel)


    li.innerHTML = `
            <div class="left">
                <input type="checkbox" style="zoom:130%">
                <p>${pList.contenido}</p>
            </div>

            <div class="right">
               <span>X</span>
            </div>`

    pDom.append(li)
}


function printAllTarea(pList, pDom) {
    pList.forEach(list => printOneTarea(list, pDom))
}
printAllTarea(tareas, sectionTarea)

// --------------------añadir tarea-------------------
let btnAdd = document.querySelector('.info button');
let tareaAdd = document.querySelector('.info input');
let nivelAdd = document.querySelector('.info #nivel');


function addTarea(event) {

    if (tareaAdd.value === "") {
        alert('Tienes que decirme que vas a hacer');
        return
    } else if (nivelAdd.value === "") {
        alert('es urgente, diaria o mensual ?')
        return;
    }

    const newTarea = {
        id: 2,
        contenido: tareaAdd.value,
        nivel: nivelAdd.value
    }

    // 给新加的事件添加id的问题
    // 不能添加相同的事件

    tareas.push(newTarea)
    console.log(newTarea);
    console.log(tareas);

    // resetear los contenidos de input y select
    sectionTarea.innerHTML = ""
    tareaAdd.value = ""
    nivelAdd.value = ""

    printAllTarea(tareas, sectionTarea)
}

btnAdd.addEventListener('click', addTarea)

// filtrar 
let filtarBtn = document.querySelector('.filter button');
let tareaFilter = document.querySelector('.filter input');
let nivelFilter = document.querySelector('.filter #nivel-filter')


function filterTarea(event) {

    let tareaFiltrada = []

    if (nivelFilter.value === "" && tareaFilter.value === "") {
        alert("Por favor, selecciona el método de filtrado");
        return;
    } else if (nivelFilter.value === "") {
        tareaFiltrada = tareas.filter(tarea => tarea.contenido.toLowerCase().includes(tareaFilter.value.toLowerCase()))
    } else {
        tareaFiltrada = tareas.filter(tarea => tarea.nivel === nivelFilter.value)
    }

    console.log(tareaFiltrada);

    sectionTarea.innerHTML = ""
    printAllTarea(tareaFiltrada, sectionTarea)

    // resetear los contenidos de input y select
    tareaFilter.value = ""
    nivelFilter.value = ""
}




filtarBtn.addEventListener('click', filterTarea)
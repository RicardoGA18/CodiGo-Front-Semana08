import { orderDates } from './orderDates.js'
import { translateDate } from './translateDate.js'

// Draw Done Tasks
function drawDoneTasks(box, app, title){
    let { doneTasks } =  app 
    let template = ``

    if( doneTasks.length ){
        title.style.display = "block"
        
        doneTasks.forEach(task => {
            template += `<li class="DoneList__Task">
                            <p class="DoneList__TaskName">${task.name}</p>
                            <div class="DoneList__Priority is-${app.getColorPriority(task.priority)}"></div>
                            <div class="DoneList__Info">
                                <img src="./img/info.svg" id="${task.id}" data-modal="info">
                            </div>
                        </li>`
        })
    }
    else{
        title.style.display = "none"
        template = ''
    }

    box.innerHTML = template
}

// Draw Undone Tasks
function drawUndoneTasks(box , app){
    let { todayTasks } = app
    let template = ``

    if( todayTasks.length ){
        todayTasks.forEach(task => {
            template += `<li class="List__Task">
                            <div class="List__Check">
                                <input type="checkbox" id="check_${task.id}">
                                <div class="noCheck"></div>
                                <div class="Check">
                                    <img src="./img/check-square-solid.svg">
                                </div>
                            </div>
                            <p class="List__TaskName">${task.name}</p>
                            <div class="List__Priority is-${app.getColorPriority(task.priority)}"></div>
                            <div class="List__Info">
                                <img src="./img/info.svg" id="${task.id}" data-modal="info">
                            </div>
                        </li>`
        })
    }
    else{
        template = `<div class="NoTask">
                        <img src="./img/noTask.png">
                        <h3>No hay tareas</h3>
                        <p>Cuando tengas tareas, las verás aqui.</p>
                    </div>`
    }
    
    box.innerHTML = template
}

function drawHistoryTasks( box , app ){
    let { historyTasks , pastTasks } = app
    let template = ``

    let orderPastTasks = orderDates(app, pastTasks)
    let orderHistoryTasks = orderDates(app, historyTasks)

    if( pastTasks.length ){
        orderPastTasks.forEach(tasks => {
            template += `<div class="History__Box">
                            <p class="Percent__Number is-pastTaskDate">${translateDate( tasks[0].date )}</p>
                            <ul class="List">`

            tasks.forEach(task=>{
                template += `<li class="List__Task">
                                <div class="List__Check">
                                    <input type="checkbox" id="check_${task.id}">
                                    <div class="noCheck"></div>
                                    <div class="Check">
                                        <img src="../img/check-square-solid.svg">
                                    </div>
                                </div>
                                <p class="List__TaskName is-pastTaskName">${task.name}</p>
                                <div class="List__Priority is-${app.getColorPriority(task.priority)}"></div>
                                <div class="List__Info">
                                    <img src="../img/info.svg" id="${task.id}" data-modal="info">
                                </div>
                            </li>`
            })

            template += `   </ul>
                        </div>`
        })
    }

    if( historyTasks.length ){
        orderHistoryTasks.forEach(tasks => {
            if( tasks[0].date == app.getActualDate()){
                template += `<div class="History__Box">
                                <p class="Percent__Number">Hoy</p>
                                <ul class="List">`
            }else{
                template += `<div class="History__Box">
                                <p class="Percent__Number">${translateDate( tasks[0].date )}</p>
                                <ul class="List">`
            }
            tasks.forEach(task=>{
                template += `<li class="List__Task">
                                <div class="List__Check">
                                    <input type="checkbox" id="check_${task.id}">
                                    <div class="noCheck"></div>
                                    <div class="Check">
                                        <img src="../img/check-square-solid.svg">
                                    </div>
                                </div>
                                <p class="List__TaskName">${task.name}</p>
                                <div class="List__Priority is-${app.getColorPriority(task.priority)}"></div>
                                <div class="List__Info">
                                    <img src="../img/info.svg" id="${task.id}" data-modal="info">
                                </div>
                            </li>`
            })

            template += `   </ul>
                        </div>`
        })
    }

    let totalTasks = pastTasks.length + historyTasks.length

    if(!totalTasks){
        template = `<p class="Percent__Number">Historial de Tareas</p>
                    <div class="NoTask">
                        <img src="../img/noTask.png">
                        <h3>No hay tareas</h3>
                        <p>Cuando tengas tareas, las verás aqui.</p>
                    </div>`
    }

    box.innerHTML = template
}

export { drawUndoneTasks, drawDoneTasks , drawHistoryTasks }
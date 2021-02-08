// Modulos
import List from '../util/List.js'
import  { drawUndoneTasks, drawDoneTasks } from '../util/drawTasks.js'
import { setInfoListener } from '../util/setInfoListener.js'

// DOM
const boxList = document.getElementById("boxList")
const btnDone = document.getElementById("btnDone")
const boxDoneList = document.getElementById("boxDoneList")
const titleUndone = document.getElementById("titleUndone")
const infoModal = document.getElementById("infoModal")
const btnCloseModal = document.getElementById("btnCloseModal")
const percentNumber = document.getElementById("percentNumber")
const percentBar = document.getElementById("percentBar")

// Modal
btnCloseModal.addEventListener('click', () => {
    infoModal.style.display = "none"
})

// Main Code
const HomeApp = new List()

async function initHomeApp(){
    try{
        HomeApp.openModalCharge()
        await HomeApp.initApp()
        await HomeApp.cleanTasks()
        drawUndoneTasks(boxList,HomeApp)
        drawDoneTasks(boxDoneList,HomeApp,titleUndone)
        setInfoListener(HomeApp)
        setProgressBar(HomeApp)
        HomeApp.closeModalCharge()
    }
    catch(error){
        console.error(error)
        HomeApp.closeModalCharge()
        swal({
            title: 'Algo salio mal :(',
            icon: "error",
            button: 'OK',
            text: 'Se actualizará la página para solucionarlo'
        })
        .then(() => {
            window.location.reload()
        })
    }
}

initHomeApp()

// btnDone
btnDone.addEventListener('click',async ()=>{
    try{
        let domTasks = Array.from(document.querySelectorAll('#boxList input[type="checkbox"]:checked'))
        let checkTasks = Array.from(document.querySelectorAll('#boxList input[type="checkbox"]'))
        if(domTasks.length){
            HomeApp.openModalCharge()
            let tasks = await HomeApp.getTasksFromDOM(domTasks)
            let newTasks = tasks.map(task => {
                task.done = true
                return task
            })
            await HomeApp.updateTasks(newTasks)
            await HomeApp.initApp()
            drawUndoneTasks(boxList,HomeApp)
            drawDoneTasks(boxDoneList,HomeApp,titleUndone)
            setInfoListener(HomeApp)
            setProgressBar(HomeApp)
            HomeApp.closeModalCharge()
            swal({
                title: 'Listo!',
                text: 'Cambios guardados correctamente',
                icon: "success",
                button: 'OK',
            })
        }
        else{
            if(checkTasks.length){
                swal({
                    title: 'No hay cambios',
                    text: 'Selecciona las tareas que hayas realizado',
                    icon: "warning",
                    button: 'OK',
                })
            }
            else{
                swal({
                    title: 'No hay tareas',
                    text: 'Agrega nuevas tareas',
                    icon: "info",
                    button: 'OK',
                })
            }
        }
    }
    catch(error){
        console.error(error)
        HomeApp.closeModalCharge()
        swal({
            title: 'Algo salio mal :(',
            icon: "error",
            button: 'OK',
            text: 'Vuelve a intentarlo mas tarde'
        })
    }
})

// Progress Bar
function setProgressBar(app){
    let numUndoneTasks = app.todayTasks.length
    let numDoneTasks = app.doneTasks.length
    let numTotalTasks = numDoneTasks + numUndoneTasks

    if(numTotalTasks){
        let percent = parseInt( ( numDoneTasks / numTotalTasks ) * 100 )
        percentNumber.innerHTML = `${percent}%`
        percentBar.style.width = `${percent}%`
    }
    else{
        percentNumber.innerHTML = `0%`
        percentBar.style.width = `0`
    }
}

// Solution Modal Background Bug
window.addEventListener('resize',()=>{
    let htmlHeight = document.querySelector("html").offsetHeight
    infoModal.style.height = `${htmlHeight}px`
})
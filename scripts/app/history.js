// Modulos
import List from '../util/List.js'
import  { drawHistoryTasks } from '../util/drawTasks.js'
import { setInfoListener } from '../util/setInfoListener.js'

// DOM
const historyBox = document.getElementById("historyBox")
const btnDone = document.getElementById("btnDone")
const infoModal = document.getElementById("infoModal")
const btnCloseModal = document.getElementById("btnCloseModal")

// Modal
btnCloseModal.addEventListener('click', () => {
    infoModal.style.display = "none"
})

// Main Code
const HistoryApp = new List()

async function initHistoryApp(){
    try{
        HistoryApp.openModalCharge()
        await HistoryApp.initApp()
        await HistoryApp.cleanTasks()
        drawHistoryTasks(historyBox,HistoryApp)
        setInfoListener(HistoryApp)
        HistoryApp.closeModalCharge()
    }
    catch(error){
        console.error(error)
        HistoryApp.closeModalCharge()
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

initHistoryApp()

// btnDone
btnDone.addEventListener('click', async ()=>{
    try{
        let domTasks = Array.from(document.querySelectorAll('#historyBox input[type="checkbox"]:checked'))
        let checkTasks = Array.from(document.querySelectorAll('#historyBox input[type="checkbox"]'))
        if(domTasks.length){
            HistoryApp.openModalCharge()
            let tasks = await HistoryApp.getTasksFromDOM(domTasks)
            let pastTasks = tasks.filter( task => HistoryApp.isPast(task.date) == true )
            let historyTasks = tasks.filter( task => HistoryApp.isPast(task.date) == false )

            let newHistoryTasks = historyTasks.map(task => {
                task.done = true
                return task
            })

            await HistoryApp.deleteTasks(pastTasks)
            await HistoryApp.updateTasks(newHistoryTasks)

            await HistoryApp.initApp()
            drawHistoryTasks(historyBox,HistoryApp)
            setInfoListener(HistoryApp)
            HistoryApp.closeModalCharge()
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
        HistoryApp.closeModalCharge()
        swal({
            title: 'Algo salio mal :(',
            icon: "error",
            button: 'OK',
            text: 'Vuelve a intentarlo mas tarde'
        })
    }
})

// Solution Modal Background Bug
window.addEventListener('resize',()=>{
    let htmlHeight = document.querySelector("html").offsetHeight
    infoModal.style.height = `${htmlHeight}px`
})

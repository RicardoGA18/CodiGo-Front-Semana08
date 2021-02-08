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
        await HistoryApp.initApp()
        drawHistoryTasks(historyBox,HistoryApp)
        setInfoListener(HistoryApp)
    }
    catch(error){
        console.error(new Error(error))
    }
}

console.log(HistoryApp)

initHistoryApp()

// btnDone
btnDone.addEventListener('click', async ()=>{
    try{
        let domTasks = Array.from(document.querySelectorAll('#historyBox input[type="checkbox"]:checked'))
        let tasks = await HistoryApp.getTasksFromDOM(domTasks)
        let historyTasks = tasks.filter( task => task.date != HistoryApp.getActualDate() )
        let todayTasks = tasks.filter( task => task.date == HistoryApp.getActualDate() )

        let newTodayTasks = todayTasks.map(task => {
            task.done = true
            return task
        })

        await HistoryApp.deleteTasks(historyTasks)
        await HistoryApp.updateTasks(newTodayTasks)

        await HistoryApp.initApp()
        drawHistoryTasks(historyBox,HistoryApp)
        setInfoListener(HistoryApp)
    }
    catch(error){
        console.log(error)
    }
})

// Solution Modal Background Bug
window.addEventListener('resize',()=>{
    let htmlHeight = document.querySelector("html").offsetHeight
    infoModal.style.height = `${htmlHeight}px`
})

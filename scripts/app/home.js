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
        await HomeApp.initApp()
        drawUndoneTasks(boxList,HomeApp)
        drawDoneTasks(boxDoneList,HomeApp,titleUndone)
        setInfoListener(HomeApp)
        setProgressBar(HomeApp)
    }
    catch(error){
        console.log(error)
    }
}

console.log(HomeApp)

initHomeApp()

// btnDone
btnDone.addEventListener('click',async ()=>{
    try{
        let domTasks = Array.from(document.querySelectorAll('#boxList input[type="checkbox"]:checked'))
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
    }
    catch(error){
        console.log(error)
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
        percentNumber.innerHTML = `0`
        percentBar.style.width = `0`
    }
}

// Solution Modal Background Bug
window.addEventListener('resize',()=>{
    let htmlHeight = document.querySelector("html").offsetHeight
    infoModal.style.height = `${htmlHeight}px`
})
// Modulos
import List from '../util/List.js'

// DOM
const form = document.getElementById('form')
const inputName = document.getElementById('inputName')
const inputComment = document.getElementById('inputComment')
const inputHour = document.getElementById('inputHour')
const inputMin = document.getElementById('inputMin')
const inputPriority = document.getElementById('inputPriority')
const inputDate = document.getElementById('inputDate')

// Main Code
const AddApp = new List()

// Form
form.addEventListener('submit',async (event)=>{
    try{
        event.preventDefault()
        AddApp.openModalCharge()
        const dataTask = {
            name: inputName.value,
            comment: inputComment.value,
            duration:{
                hours: parseInt(inputHour.value),
                minutes: parseInt(inputMin.value)
            },
            priority: inputPriority.value,
            date: inputDate.value,
            done: false
        }
        await AddApp.postTask(dataTask)
        AddApp.closeModalCharge()

        swal({
            title: 'Listo!',
            text: 'Tarea Añadida Correctamente :)',
            icon: "success",
            button: 'OK',
        })
        .then(()=>{
            const urlActual = window.location.href
            const urlHistory = urlActual.substr(0,urlActual.length - 8) + "history.html"
            window.location.href = urlHistory
        })
    }
    catch(error){
        console.error(error)
        AddApp.closeModalCharge()
        swal({
            title: 'Algo salio mal :(',
            icon: "error",
            button: 'OK',
            text: 'Vuelve a intentarlo mas tarde'
        })
    }
})

// Set Minimun Date
inputDate.min = AddApp.getActualDate()
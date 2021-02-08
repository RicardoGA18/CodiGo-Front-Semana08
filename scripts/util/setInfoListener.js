// UI Aux setCheckbox Function
function setCheckboxStyle(app){
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'))
    checkboxes.forEach(checkbox => {
        const taskName = checkbox.parentElement.nextElementSibling
        checkbox.addEventListener('change',event => {
            if(checkbox.checked){
                taskName.style.color = "#c5310c"
                taskName.style.textDecoration = "line-through"
            }
            else{
                taskName.style.color = ""
                taskName.style.textDecoration = ""
            }
        })
    })
}


function setInfoListener(app){
    const infoModal = document.getElementById("infoModal")
    const taskName = document.getElementById("taskName")
    const taskComment = document.getElementById("taskComment")
    const taskDuration = document.getElementById("taskDuration")
    const taskPriority = document.getElementById("taskPriority")
    const boxPriority = taskPriority.parentElement
    const taskDate = document.getElementById("taskDate")

    const infoButtons = Array.from(document.querySelectorAll('img[data-modal="info"]'))

    if(infoButtons.length){
        infoButtons.forEach(button=>{
            button.addEventListener('click', async event =>{
                app.openModalCharge()
                let id = event.target.id
                try{
                    const task = await app.getTask(id)

                    taskName.innerHTML = task.name
                    taskComment.innerHTML = task.comment
                    if(task.duration.hours){
                        taskDuration.innerHTML = `&#128338; ${task.duration.hours}h ${task.duration.minutes}min`
                    }
                    else{
                        taskDuration.innerHTML = `&#128338; ${task.duration.minutes}min`
                    }
                    taskPriority.innerHTML = app.translatePriority(task.priority)
                    boxPriority.className = `is-${app.getColorPriority(task.priority)} is-center`
                    taskDate.innerHTML = `&#128197; ${app.translateDate(task.date)}`

                    app.closeModalCharge()
                    infoModal.style.display = "block"
                }
                catch(error){
                    console.error(error)
                }
            })
        })
    }

    setCheckboxStyle(app)

}

export { setInfoListener }
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
                    boxPriority.className = `is-${app.getColorPriority(task.priority)}`
                    taskDate.innerHTML = `&#128197; ${task.date}`

                    infoModal.style.display = "block"
                }
                catch(error){
                    console.log(error)
                }
            })
        })
    }

}

export { setInfoListener }
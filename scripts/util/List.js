export default class{
    constructor(){
        this.todayTasks = []
        this.historyTasks = []
        this.doneTasks = []
        this.pastTasks = []
    }
    // Initialize app
    async initApp(){
        try{
            let allTasks = await this.getTasks()
            this.todayTasks = allTasks.filter( task => {
                if( ( this.getActualDate() == task.date ) && ( task.done == false ) ){
                    return true
                }else{
                    return false
                }
            })
            this.doneTasks = allTasks.filter( task => {
                if( ( this.getActualDate() == task.date ) && ( task.done == true ) ){
                    return true
                }else{
                    return false
                }
            })
            this.historyTasks = allTasks.filter( task => {
                if( ( this.isPast(task.date) == false ) && ( task.done == false ) ){
                    return true
                }else{
                    return false
                }
            })
            this.pastTasks = allTasks.filter( task => {
                if( ( this.isPast(task.date) == true ) && ( task.done == false ) ){
                    return true
                }else{
                    return false
                }
            })
        }
        catch(error){
            console.error(error)
        }
        
    }

    // API Request Methods
    async getTasks(){
        try{
            const data = await fetch('https://601caf281a9c220017060bec.mockapi.io/tasks')
            const tasks = await data.json()
            return tasks
        }
        catch(error){
            console.error(error)
        }
    }
    
    async getTask(id){
        try{
            const data = await fetch(`https://601caf281a9c220017060bec.mockapi.io/tasks/${id}`)
            const task = await data.json()
            return task
        }
        catch(error){
            console.error(error)
        }
    }

    async getTasksFromDOM(tasks){
        try{
            let arrTasks = []
            for(const task of tasks){
                let newId = task.id.substr(6)
                let newTask = await this.getTask(newId)
                arrTasks.push(newTask)
            }
            return arrTasks
        }
        catch(error){
            console.error(error)
        }
    }

    async deleteTask(id){
        try{
            await fetch(`https://601caf281a9c220017060bec.mockapi.io/tasks/${id}`,{
                method: 'DELETE',
            })
        }
        catch(error){
            console.error(error)
        }
    }

    async deleteTasks(tasks){
        try{
            for (const task of tasks){
                await this.deleteTask(task.id)
            }
        }catch(error){
            console.error(error)
        }
    }

    async updateTask(task){
        try{
            const config = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(task)
            }
            await fetch(`https://601caf281a9c220017060bec.mockapi.io/tasks/${task.id}`,config)
        }
        catch(error){
            console.error(error)
        }
    }

    async updateTasks(tasks){
        try{
            for(const task of tasks){
                await this.updateTask(task)
            }
        }
        catch(error){
            console.error(error)
        }
    }

    async postTask(task){
        try{
            const config = {
                method: 'POST',
                body: JSON.stringify(task),
                headers:{
                    'Content-Type': 'application/json'
                }
            }
            await fetch('https://601caf281a9c220017060bec.mockapi.io/tasks',config)
        }
        catch(error){
            console.error(error)
        }
    }

    async cleanTasks(){
        let tasks = await this.getTasks()
        let garbage = tasks.filter(task => {
            if( ( this.getActualDate() != task.date ) && ( task.done == true ) ){
                return true
            }else{
                return false
            }
        })
        await this.deleteTasks(garbage)
    }

    // Auxiliar functions
    translatePriority(priority){
        switch(priority){
            case 'minor':
                return 'Menor'
            case 'medium':
                return 'Intermedio'
            case 'major':
                return 'Mayor'
        }
    }
    getColorPriority(priority){
        switch(priority){
            case 'minor':
                return 'green'
            case 'medium':
                return 'yellow'
            case 'major':
                return 'red'
        }
    }
    compareDates(date01 , date02){
        var day01 = parseInt(date01.substring(8, 10)) 
        var month01 = parseInt(date01.substring(5, 7)) 
        var year01 = parseInt(date01.substring(0, 4))
        var day02 = parseInt(date02.substring(8, 10)) 
        var month02 = parseInt(date02.substring(5, 7))
        var year02 = parseInt(date02.substring(0, 4))

        if( year01 > year02 ){
            return true
        }else{
            if(year01 == year02){
                if(month01 > month02){
                    return true
                }else{
                    if(month01 == month02){
                        if(day01 >= day02){
                            return true
                        }else{
                            return false
                        }
                    }else{
                        return false
                    }
                }
            }else{
                return false
            }
        }
    }
    isPast(date){
        let actualDate = this.getActualDate()

        if( this.compareDates(actualDate, date) ){
            if(actualDate == date){
                return false
            }else{
                return true
            }
        }else{
            
            return false
        }
    }
    getActualDate(){
        let createDate = new Date()
        let year = createDate.getFullYear()
        let month = createDate.getMonth() + 1
        let day = createDate.getDate()
        if(month < 10){
            month = `0${month}`
        }
        if(day < 10){
            day = `0${day}`
        }
        let actualDate = `${year}-${month}-${day}`

        return actualDate
    }

    translateDate(date){
        let year = parseInt(date.substring(0, 4))
        let month = parseInt(date.substring(5, 7)) 
        let day = parseInt(date.substring(8, 10))
    
        let months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
    
        let translate = `${day} de ${months[month-1]} de ${year}`
    
        return translate
    }

    // Modal Charge
    openModalCharge(){
        let modalCharge = document.getElementById("modalCharge")
        modalCharge.style.display = "flex"
    }
    closeModalCharge(){
        let modalCharge = document.getElementById("modalCharge")
        modalCharge.style.display = "none"
    }
}
function orderDates(app, tasks){
    let dates = []
    let orderTasks = []

    tasks.forEach(task=>{
        if(!dates.some(date => date == task.date)){
            dates.push(task.date)
        }
    })
    
    for(let i = 0; i < dates.length; i++){
        let swap = 0
        for(let j = 0; j < dates.length - 1; j++){
            if(app.compareDates(dates[j] , dates[j+1])){
                let aux = dates[j]
                dates[j] = dates[j+1]
                dates[j+1] = aux
                swap++
            }
        }
        if(swap == 0){
            break
        }
    }
    
    dates.forEach(date => {
        let dateTasks = tasks.filter(task=>{
            if( date == task.date ){
                return true
            }
            else{
                return false
            }
        })

        orderTasks.push(dateTasks)
    })


    return orderTasks
}

export { orderDates }
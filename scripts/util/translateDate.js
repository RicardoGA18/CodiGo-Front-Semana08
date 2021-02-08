function translateDate(date){
    let year = parseInt(date.substring(0, 4))
    let month = parseInt(date.substring(5, 7)) 
    let day = parseInt(date.substring(8, 10))

    let months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

    let translate = `${day} de ${months[month-1]} de ${year}`

    return translate
}

export { translateDate }
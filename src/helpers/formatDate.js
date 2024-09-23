
export const handleDate = (project) => {
    if (project.index === '') {
        const today = new Date()
         
        const date = today.toISOString().slice(0,10)
        return date
    } else {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const day = project.date.slice(1, 3)
        const year = project.date.slice(8, 12)
        let datemonth = ''
        let i = 0
        for (let month of months) {
            if (project.date.slice(4, 7) === month) {
                datemonth = i + 1 > 9 ? `${i + 1}` : `0${i + 1}`
            }
            i++
        }
        return `${year}-${datemonth}-${day}`
    }

}


export const handleDateTime = (dateTime) => {
    
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const day = dateTime.slice(1, 3)
        const year = dateTime.slice(8, 12)
        let datemonth = ''
        let i = 0
        for (let month of months) {
            if (dateTime.slice(4, 7) === month) {
                datemonth = i + 1 > 9 ? `${i + 1}` : `0${i + 1}`
            }
            i++
        }
        return `${year}-${datemonth}-${day}`
    }




export default handleDate
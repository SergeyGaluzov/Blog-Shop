const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const dateHandler = date => {
    return {
    'day': date.getDate(),
    'month': months[date.getMonth()],
    'year': date.getFullYear(),
    'hours': date.getHours(),
    'minutes': date.getMinutes(),
    }
}

const capitalize = string => string[0].toUpperCase() + string.substr(1)

module.exports = {
    'dateHandler': dateHandler,
    'capitalize': capitalize,
}
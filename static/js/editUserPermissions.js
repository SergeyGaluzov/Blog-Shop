const inputs = document.getElementsByTagName("input")
const snapshot = [];

const changeButton = (event) => {
    const parent = event.currentTarget.parentElement.parentElement
    const inputs = parent.getElementsByTagName("input")
    const row = parent.id 
    const rowHasChanged = !(inputs[0].checked === snapshot[row][0] &&
                            inputs[1].checked === snapshot[row][1] &&
                            inputs[2].checked === snapshot[row][2])
    if(rowHasChanged){
        inputs[3].disabled = false
    }
    else{
        inputs[3].disabled = true
    }
}

const sendChanges = (event) => {
    const parent = event.currentTarget.parentElement.parentElement
    const username = parent.childNodes[0].innerHTML
    const inputs = parent.getElementsByTagName("input")
    const data = {
        permissions: {
            manageBlog: inputs[0].checked,
            manageShop: inputs[1].checked,
            manageUsers: inputs[2].checked,
        },
        username: username,
    }
    const request = new XMLHttpRequest()
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            if(request.responseText != "Error"){
                inputs[3].disabled = true
                window.alert("User updated succesfully!")
            }
        }
    }
    request.open('POST', window.location.href)
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(data))
}

let rowInputs = []

Array.prototype.forEach.call(inputs, (element, index) =>{
    if(element.type === 'checkbox'){
        element.addEventListener('change', changeButton)
        rowInputs.push(element.checked)
    }
    else if(element.type === 'button'){
        snapshot.push(rowInputs)
        rowInputs = []
        element.addEventListener('click', sendChanges)
    }
})

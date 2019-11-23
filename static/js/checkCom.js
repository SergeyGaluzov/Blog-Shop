let checkCom;
let warning = 'Введено больше 255 символов';
let counter = 'Введено символов: '

let check_comment = () => {
    checkCom = (String((document.getElementById('checkCom').value)));
    if(checkCom.length>255){
        document.getElementById('resultWar').innerHTML = warning;
        document.getElementById('resultCout').innerHTML = counter + checkCom.length;
    }
}
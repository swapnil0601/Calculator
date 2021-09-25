//Dark Mode
const mode = document.getElementById('mode');

mode.addEventListener('change', (event) => {
    document.body.classList.toggle('dark', event.target.checked);
})



let btns = document.querySelectorAll(".btn");
let input = document.querySelector(".input");
let container = document.querySelector(".container");

//Toast Notification
function toast(str) {
    const notif = document.createElement('div');
    notif.classList.add('toast');
    container.appendChild(notif);
    notif.innerText = str;

    setTimeout(() => { notif.remove(); }, 3000);
}

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        // console.log(btns[i].innerHTML);
        set(btns[i].innerHTML);
    })
}
document.addEventListener('keydown', function(element) {
    if (check(element.key)) {
        // console.log(element.key);
        set(element.key);
    }
})

function check(key) {
    if (key == '1' || key == '2' || key == '3' || key == '4' || key == '5' || key == '6' || key == '7' || key == '8' || key == '9' || key == '0' || key == 'C' || key == 'c' || key == 'Backspace' || key == '/' || key == '*' || key == '+' || key == '-' || key == '=' || key == '.' || key == 'Enter') {
        return true;
    } else {
        toast("Not a Number");
        return false;
    }
}

function operatorCheck(key) {
    if (key == '/' || key == '*' || key == '+' || key == '-' || key == '.')
        return true;
    else {
        return false;
    }
}

var enter = false;
var op = true;

function set(key) {

    if (key == 'C' || key == 'c') {
        input.value = "";
        op = true;
    } else if (key == 'Backspace' || key == '⌫') {
        let str = input.value;
        let lastkey = str[str.length - 1];
        if (lastkey == '.') {
            op = true;
        }
        if (lastkey == '/' || lastkey == '*' || lastkey == '+' || lastkey == '-') {
            input.value = str.substring(0, str.length - 1);
            if (eval(input.value) % 1 === 0) {
                op = true;
            } else {
                op = false;
            }
            return;
        }
        input.value = str.substring(0, str.length - 1);


    } else if (key == '=' || key == 'Enter') {
        input.value = eval(input.value);
        if (eval(input.value) % 1 === 0) {
            op = true;
        } else {
            op = false;
        }
        enter = true;
    } else if (key == '.') {
        let str = input.value;
        let lastKey = str[str.length - 1];
        if (op && lastKey != '.') {
            input.value += key;
            op = false;
        } else {
            toast("Invalid Input");
            return;
        }
        enter = false;
    } else if (operatorCheck(key)) {
        let str = input.value;
        let lastKey = str[str.length - 1];
        if (operatorCheck(lastKey)) {
            toast("Invalid Input")
            return;
        }
        input.value += key;
        op = true;
        enter = false;
    } else {
        if (enter) {
            op = true;
            input.value = key;
        } else {
            input.value += key;
        }
        enter = false;
    }
}
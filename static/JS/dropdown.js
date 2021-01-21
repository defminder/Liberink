function dropdown(event) {
    dropdown_target = event.target.parentNode.parentNode.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdown_target.length; i++) {
        if (dropdown_target[i].classList.contains('show')){
            dropdown_target[i].classList.remove('show');
        }
        else{
            dropdown_target[i].classList.add('show');
        }
    }
}

function hide_dropdown(event) {
    window.onclick = function(event) {
        if (!event.target.matches('.logo')) {
            if (dropdown_target.length == 1){
                if (dropdown_target[0].classList.contains('show')) {
                    dropdown_target[0].classList.remove('show');
                }
            }
        }
    }
}
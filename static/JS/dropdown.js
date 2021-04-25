function dropdown(event) {
    dropdown_target = event.target.parentNode.parentNode.getElementsByClassName("dropdown-content");
    header_content = document.getElementsByClassName('header-column');
    const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    for (let i = 0; i < dropdown_target.length; i++) {
        if (dropdown_target[i].classList.contains('show')){
            dropdown_target[i].classList.remove('show');
            console.log(width);
            if (width < 760)
            {
                header_content[0].style.display = '';
                header_content[2].style.display = '';
            }
        }
        else{
            dropdown_target[i].classList.add('show');
            if (width < 760)
            {
                header_content[0].style.display = 'none';
                header_content[2].style.display = 'none';
            }
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
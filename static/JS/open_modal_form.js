var modal = document.getElementById("board_add_modal");
var btn = document.getElementById("board_add");
var cancel = document.getElementById("cancel_create");
var text = document.getElementById('description_textarea');

btn.onclick = function() {
    modal.style.display = "block";
    document.body.style.overflow = 'hidden';
    document.body.style.background = 'rgba(0, 0, 0, 0.4);';
}

cancel.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = 'visible';
}

text.oninput = function OnInput(event) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
}
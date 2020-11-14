// Get the modal
var modal = document.getElementById("board_add_modal");

// Get the button that opens the modal
var btn = document.getElementById("board_add");

// Get the <span> element that closes the modal
var close = document.getElementsByClassName("close")[0];

var text = document.getElementById('description_textarea');
// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
    document.body.style.overflow = 'hidden';
    document.body.style.background = 'rgba(0, 0, 0, 0.4);';
}

// When the user clicks on <span> (x), close the modal
close.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = 'visible';
}

text.oninput = function OnInput(event) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
}
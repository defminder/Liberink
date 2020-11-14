
// When the user clicks on the sticker, open the modal
function edit_sticker(sticker) {
	
	var edit_modal = sticker.children[1];
	var edit_block = edit_modal.children[0];
	var edit_area = edit_block.children[0];
	var save_button = edit_block.children[1];

	sticker.parentNode.style.filter = 'none';
	edit_modal.style.display = 'block';
    edit_block.style.display = 'block';
    edit_block.style.position = 'fixed';
    edit_block.style.zIndex = 1000;
    edit_block.style.top = sticker.getBoundingClientRect().top;
    edit_block.style.left = sticker.getBoundingClientRect().left;
    edit_area.style.zIndex = 1001;
    edit_area.style.cursor = 'text';
    edit_area.select();
    save_button.onmousedown = function(event){
    	sticker.parentNode.style.filter = 'drop-shadow(1px 1px 2px #000);';
    	sticker.children[0].value = edit_area.value;
    	edit_modal.style.display = "none";
		console.log(edit_area.value);
		save_button.onmousedown = null;
		document.onmousedown = null;
	};
	document.onmousedown = function(event){
		if (event.target != edit_area && event.target != save_button){
			sticker.parentNode.style.filter = 'drop-shadow(1px 1px 2px #000);';
			sticker.children[0].value = edit_area.value;
			edit_modal.style.display = "none";
			console.log(edit_area.value);
			save_button.onmousedown = null;
			document.onmousedown = null;
		};
	};

}



// When the user clicks on <span> (x), close the modal
/*function() {
    modal.style.display = "none";
    document.body.style.overflow = 'visible';

}*/
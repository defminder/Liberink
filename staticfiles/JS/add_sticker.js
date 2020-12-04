function add_sticker_to_list(event) {
	if (event.target.classList.contains('add_sticker')){
		var list = event.target.parentNode;
	}
	else{
		var list = event.target.parentNode.parentNode;
	}

    container = list.parentNode.parentNode.children;
    for (let i = 0; i < container.length; i++){
    	if (container[i] == list.parentNode){
    		add_sticker_api(i);
    	}
    }

    list_button = list.getElementsByClassName('add_sticker');
    var new_stiker = create_stiker_edit_area();
    list.insertBefore(new_stiker, list_button[0]);
    edit_sticker(new_stiker);

    async function add_sticker_api(index) {
        var url =  '/api/board/create_sticker';
        await axios({
            method: 'POST',
            url: url,
            data: {
                'key' : api_key,
                'board_id': board_id,
                'list_id': index
            }

        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error)
        });
    }
}

function create_stiker_edit_area() {
	var visible_textarea = document.createElement('textarea');
	visible_textarea.classList.add('sticker');
	visible_textarea.spellcheck = false;
	visible_textarea.readOnly = true;
	visible_textarea.setAttribute('onmousedown', 'on_stiker_click(event)');

	var edit_area_wrapper = document.createElement('div');
	edit_area_wrapper.classList.add('sticker_wrapper');

	var edit_sticker_modal = document.createElement('div');
	edit_sticker_modal.classList.add('edit_modal');

	var edit_area_on_edit = document.createElement('div');

	var edit_textarea = document.createElement('textarea');
	edit_textarea.classList.add('sticker');
	edit_textarea.setAttribute('oninput', 'OnInput(event)');
	edit_textarea.spellcheck = false;

	var delete_sticker_button = document.createElement('img');
	delete_sticker_button.src = '/static/images/icons/close.png';
	delete_sticker_button.classList.add('del_sticker');
	delete_sticker_button.setAttribute('onmousedown', 'delete_sticker(event)');
	
	edit_area_on_edit.append(edit_textarea);

	edit_sticker_modal.append(edit_area_on_edit);

	edit_area_wrapper.append(visible_textarea);
	edit_area_wrapper.append(edit_sticker_modal);
	edit_area_wrapper.append(delete_sticker_button);

	return edit_area_wrapper;

}

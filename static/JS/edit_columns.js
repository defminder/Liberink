function edit_columns(event){
	if (!(event.target.classList.contains('show') || event.target.parentNode.classList.contains('show'))){
		dropdown(event);
		event.target.style.display = 'none';
		var page_header = document.getElementsByClassName('page-header')[0]
		page_header.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
		page_header.style.zIndex = 1001;
		event.target.parentNode.style.zIndex = 100;
		edit_modal = document.getElementById('edit_columns');
		edit_modal.style.display = 'block';
		lists = document.getElementsByClassName('list');
		for (let i = 0; i < lists.length; i++) {
			lists[i].style.zIndex = 1000;
		}
	}
	else{
		dropdown(event);
		var page_header = document.getElementsByClassName('page-header')[0]
		page_header.style.backgroundColor = '#fff';
		page_header.style.zIndex = 100;
		var settings_button = document.getElementsByClassName('header-column')[1].children[0].children[3];
		settings_button.style.display = 'block';
		edit_modal = document.getElementById('edit_columns');
		edit_modal.style.display = 'none';
		lists = document.getElementsByClassName('list');
		for (let i = 0; i < lists.length; i++) {
			lists[i].style.zIndex = null;
			lists[i].getElementsByClassName('del_list')[0].style.display = 'none';
		}
	}
}

function toggle_delete_lists_buttons(event){
	lists = document.getElementsByClassName('list');
	for (let i = 0; i < lists.length; i++) {
		if (lists[i].getElementsByClassName('del_list')[0].style.display == 'none'){
			lists[i].getElementsByClassName('del_list')[0].style.display = 'block';
		}
		else{
			lists[i].getElementsByClassName('del_list')[0].style.display = 'none';
		}
	}
}

function add_list_to_container(event) {
	
    var container = document.getElementsByClassName('lists_container')[0];
    var show_close_button = false;
    if (container.children.length > 0) {
    	var exist_container_list = container.children[0].children[0].children;
	    if (container.children.length > 0 && exist_container_list[exist_container_list.length - 1].style.display == 'block'){
	    	show_close_button = true;
	    }
	    else{
	    	show_close_button = false;
	    }
    }
    else{
    	show_close_button = false;
    }
    
    var new_list = create_new_list_element();
    container.append(new_list);

    new_list.getElementsByClassName('list_title')[0].click();
    create_list();
 
    function create_new_list_element() {
		var wrapper = document.createElement('div');
		wrapper.classList.add('wrapper');

		var list = document.createElement('div');
		list.classList.add('list');
		list.style.zIndex = 1000;

		var title_textarea = document.createElement('textarea');
		title_textarea.id = 'list_label';
		title_textarea.classList.add('list_title');
		title_textarea.maxlength = '30';
		title_textarea.spellcheck = false;
		title_textarea.readOnly = true;
		title_textarea.setAttribute('onclick', 'edit_list_title(event)');
		

		var add_sticker_button = document.createElement('button');
		add_sticker_button.setAttribute('onclick', 'add_sticker_to_list(event)');
		add_sticker_button.classList.add('add_sticker');
		add_sticker_button.classList.add('btn');

		var add_sticker_img = document.createElement('img');
		add_sticker_img.src = '/static/images/icons/plus.png';
		add_sticker_img.style.width = '25px';
		add_sticker_img.style.height = '25px';

		var del_list_img = document.createElement('img');
		del_list_img.src = '/static/images/icons/delete.png';
		del_list_img.setAttribute('onclick', 'delete_list(event)');
		if (show_close_button){
			del_list_img.style.display = 'block';
		}
		else{
			del_list_img.style.display = 'none';
		}
		del_list_img.classList.add('del_list');

		add_sticker_button.append(add_sticker_img);

		list.append(title_textarea);
		list.append(add_sticker_button);
		list.append(del_list_img);
		
		wrapper.append(list);


		return wrapper;
	}
	async function create_list() {
        var url =  '/api/board/create_list';
        var board_id = document.URL.split('/')[4];
        await axios({
            method: 'POST',
            url: url,
            data: {
                'key' : api_key,
                'board_id': board_id
            }

        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error)
        });
    }
}






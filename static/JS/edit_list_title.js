 function edit_list_title(event) {
    event.target.style.cursor = 'text';
    var lists = document.getElementsByClassName("list_title");
    for (var i = 0; i < lists.length; i++) {
        var openlist = lists[i];
        if (openlist == event.target) {
            var edit_list_title = event.target;
            event.target.removeAttribute('readonly');
            var list_index = i;
            var submit_listener = function(e) {
                if (edit_list_title.value.length == 0) { return; } else if (e.keyCode == 13) {
                    edit_list_title.removeEventListener('keypress', submit_listener, false);
                    e.preventDefault();
                    edit_list_title.classList.remove('show_edit');
                    edit_list_title.setAttribute('readonly', '');
                    edit_list_title.style.cursor = 'pointer';

                    list_titile_update(event.target.value, list_index);    
                }
            }
            var hide_edit_listener = function(e){
                if (e.target != edit_list_title){
                    edit_list_title.removeEventListener('keypress', submit_listener, false);
                    document.removeEventListener('click', submit_listener, false);
                    edit_list_title.classList.remove('show_edit');
                    edit_list_title.setAttribute('readonly', '');
                    edit_list_title.style.cursor = 'pointer';
                    list_titile_update(event.target.value, list_index);  
                    document.removeEventListener('mousedown', hide_edit_listener, false);
                }
            }
            event.target.addEventListener('keypress', submit_listener, false);
            document.addEventListener('mousedown', hide_edit_listener, false)
            if (!openlist.classList.contains('show_edit')) {
                event.target.select();
                openlist.classList.add('show_edit');
            }
        } else {
            openlist.classList.remove('show_edit');
        }
    }
    

    async function list_titile_update(title, list_id) {
        var url =  '/api/board/update_list_title';
        var board_id = document.URL.split('/')[4];
        await axios({
            method: 'PUT',
            url: url,
            data: {
                'key' : api_key,
                'board_id': board_id,
                'list_id': list_id,
                'title': title,
            }

        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error)
        });
    }
}
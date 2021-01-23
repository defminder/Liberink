function delete_board(event){
    event.preventDefault();
	var target_board = event.target.parentNode;
    var wrappers = document.getElementsByClassName('container_board');
    var board_to_del = document.getElementById('board_to_del');
    var target_html = target_board.children;
    for (var i = 0; i < target_html.length; i++){
        if (target_html[i].tagName == 'DIV'){
            board_to_del.innerHTML += target_html[i].outerHTML;
        }
    }
    var delete_container = document.getElementById('board_delete_confirm_modal');
    delete_container.style.display = 'block';
    document.body.style.overflow = 'hidden';
    var close_delete = document.getElementById('close_delete');
    var cancel_delete = document.getElementById('cancel_delete');
    var confirm_delete = document.getElementById('confirm_delete');

    close_delete.onclick = function close_modal(){
        delete_container.style.display = 'none';
        document.body.style.overflow = 'visible';
        board_to_del.innerHTML = '';
    }

    cancel_delete.onclick = function close_modal(){
        delete_container.style.display = 'none';
        document.body.style.overflow = 'visible';
        board_to_del.innerHTML = '';
    }

    confirm_delete.onclick = function(){
        document.onkeypress = null; 
        delete_container.style.display = 'none';
        document.body.style.overflow = 'visible';
        board_to_del.innerHTML = '';
        index_find: 
        for (let i = 0; i <= wrappers.length; i++){
            if (wrappers[i] == target_board){
                delete_board_api(i - 1);
                target_board.remove();
                break index_find;
            }
        }
    }

    document.onkeypress = function(e) {
        e.preventDefault();
        if (!e.shiftKey && e.keyCode == 13) {
            confirm_delete.onclick();
        }
    }

	async function delete_board_api(board_id) {
        var url =  '/api/board/delete';
        await axios({
            method: 'DELETE',
            url: url,
            data: {
                'key' : api_key,
                'board_id': boards_id.split(',')[board_id]
            }

        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error)
        });
    }
}